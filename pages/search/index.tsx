import axios, { AxiosResponse } from "axios";
import { FaSearchengin, FaSortAmountDownAlt } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { AiOutlineDown } from "react-icons/ai";
import { RiFilterFill, RiFilterOffLine } from "react-icons/ri";
import {
  MdSkipNext,
  MdSkipPrevious,
  MdAttachMoney,
  MdOutlineCardMembership,
} from "react-icons/md";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useSWR, { SWRConfiguration } from "swr";
import {
  GetProductsArray,
  MinifyProduct,
  ProductInterface,
  ProductsSearch,
  Sort,
} from "../../src/types/types";
import Router, { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import mongoose, { NumberExpression } from "mongoose";
import { GetServerSideProps } from "next";
import ProProduct from "../../src/models/ProProduct";
import ProductCardOne from "../../components/product/ProductCardOne";
//==============================================================================================//
export default function SearchPage({
  products,
  total,
}: {
  products: MinifyProduct[] | null;
  total: number;
}) {
  const slideRef = useRef<HTMLInputElement>(null);

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(total);
  const router = useRouter();

  function fadeAnimation() {
    slideRef?.current?.classList?.add("fade-anim");
    setTimeout(() => {
      slideRef?.current?.classList?.remove("fade-anim");
    }, 300);
  }
  useEffect(() => {
    fadeAnimation();
    setTotalProducts(total);
    if (router?.query?.page !== undefined) {
      setPageNumber(Number(router.query.page));
    }
  }, [products, total]);

  return (
    <>
      {" "}
      <div className="flex w-full justify-center md:w-[100%]">
        <div className="hidden md:flex h-full bg-white md:w-[15%] min-w-[300px] mx-2">
          <FilterComponent />
        </div>
        <div className="search-page h-fit w-full md:w-[75%] ">
          <div className="flex items-center justify-start bg-white w-full mx-10 border-b">
            <div className="flex items-center justify-start bg-white w-full">
              <SortComponent />
              <span className="w-auto text-center font-Vazir-Medium text-[12px]">
                {total} محصول
              </span>
            </div>
          </div>
          <div className="flex h-fit flex-wrap justify-center bg-white w-9/12">
            <Pagination
              page={pageNumber}
              total={totalProducts}
              setPage={setPageNumber}
            />
          </div>
          <SearchContainer refs={slideRef}>
            {products?.map((product) => (
              <>
                <ProductCardOne minifyProduct={product} />
              </>
            ))}
          </SearchContainer>
        </div>
      </div>
    </>
  );
}
//==============================================================================================//
export function SearchContainer({
  children,
  refs,
}: {
  children: any;
  refs: any;
}) {
  return (
    <>
      <div ref={refs} className="flex justify-center w-full">
        <div className="flex flex-wrap justify-start w-full">{children}</div>
      </div>
    </>
  );
}
//==============================================================================================//
async function convertObjectToParam(query: object) {
  var keys: string[] = Object.keys(query);
  var values: string[] = Object.values(query);
  var uri: string = "?";
  keys.map((key, index) => {
    uri += key + "=" + values[index];
    if (keys.length > index + 1) {
      uri += "&";
    }
  });
  return uri;
}

export function Pagination({
  total,
  page,
  setPage,
}: {
  total: number;
  page: number;
  setPage: any;
}) {
  const slideRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [lastPage, setLastPage] = useState<number>();
  // const [mounted, setMounted] = useState<boolean>(false);
  const [prevState, setPrevState] = useState<"idle" | "off" | "loading">(
    "loading"
  );
  const [nextState, setNextState] = useState<"idle" | "off" | "loading">(
    "loading"
  );

  function fadeAnimation() {
    slideRef?.current?.classList?.add("fade-anim");
    setTimeout(() => {
      slideRef?.current?.classList?.remove("fade-anim");
    }, 300);
  }
  function changeState() {
    if (page === 1) {
      setPrevState("off");
    } else {
      setPrevState("idle");
    }
    if (1 > total - page * 20) {
      setNextState("off");
    } else {
      setNextState("idle");
    }
    setLastPage((total % 20 > 0 ? 1 : 0) + Math.trunc(total / 20));
    // console.log("lastpage", lastPage, total - page * 20);
  }

  useEffect(() => {
    changeState();
  }, [total, page]);

  async function changeRouteAndPage(newPage: number) {
    // setPage(newPage);
    if (
      newPage < 1 ||
      newPage > (total % 20 > 0 ? 1 : 0) + Math.trunc(total / 20)
    )
      return;
    router.query["page"] = newPage.toString();
    // console.log(router.query);

    const queryString: string = await convertObjectToParam(router.query);
    // console.log(router);

    router.push(`${router.pathname}${queryString}`);
    fadeAnimation();

    // setTimeout(() => setMounted(true), 500);

    // router.push(router.asPath + encodeURI(router.query));
  }

  const paginationNumberStyle =
    "h-fit rounded-full p-2 px-3 text-black bg-white border mx-2 ";

  return (
    <div className="flex h-fit items-center my-1 font-Vazir-Medium text-xs">
      <button
        onClick={(e) => {
          changeRouteAndPage(page - 1);
        }}
        disabled={!(prevState === "idle")}
        className={`rounded-xl m-1 h-fit p-2 px-3 hover:bg-cyan-400  ${
          prevState === "idle" ? "text-gray-600" : "text-gray-300"
        }`}
      >
        <MdSkipNext size={20} />
      </button>
      <div
        ref={slideRef}
        className={
          "flex justify-center w-[200px] overflow-hidden transition-all duration-500 ease-out"
        }
      >
        {page === lastPage && page > 2 ? (
          <>
            <div
              onClick={(e) => {
                changeRouteAndPage(1);
              }}
              className={paginationNumberStyle + " cursor-pointer"}
            >
              1
            </div>
            <div className="h-fit rounded-full p-2 px-3 text-black bg-white  mx-2 ">
              ...
            </div>
          </>
        ) : (
          <></>
        )}
        {prevState === "idle" ? (
          <div
            onClick={(e) => {
              changeRouteAndPage(page - 1);
            }}
            className={paginationNumberStyle + " cursor-pointer"}
          >
            {page - 1}
          </div>
        ) : (
          <></>
        )}
        <div
          className={
            "h-fit rounded-full p-2 px-3 text-white bg-slate-600 border mx-2 cursor-pointer fade-anim"
          }
        >
          {page}
        </div>
        {nextState === "idle" && lastPage !== page + 1 ? (
          <div
            onClick={(e) => {
              changeRouteAndPage(page + 1);
            }}
            className={paginationNumberStyle + " cursor-pointer"}
          >
            {page + 1}
          </div>
        ) : (
          <></>
        )}
        {nextState === "idle" ? (
          <>
            <div className={paginationNumberStyle}>...</div>
            <div
              onClick={(e) => {
                if (lastPage !== undefined) {
                  changeRouteAndPage(lastPage);
                }
              }}
              className={paginationNumberStyle + " cursor-pointer"}
            >
              {lastPage === undefined ? "" : lastPage}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <button
        onClick={(e) => {
          changeRouteAndPage(page + 1);
        }}
        disabled={!(nextState === "idle")}
        className={`rounded-xl m-1 h-fit p-2 px-3 hover:bg-cyan-400 ${
          nextState === "idle" ? "text-gray-600" : "text-gray-300"
        }`}
      >
        <MdSkipPrevious size={20} />
      </button>
    </div>
  );
}
//==============================================================================================//
import { FaSortAmountUpAlt } from "react-icons/fa";
import { GoRepoForcePush } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  searchConfig,
  SearchType,
  setSearchConfig,
  SortTranslate,
} from "../../src/store/slices/settingsSlice";
import { privateDecrypt } from "crypto";
import { BiFilter } from "react-icons/bi";
import Filter from "../../src/class/filter";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type TypeFilterEnableItem = {
  name: string;
  value?: number;
  value2?: number;
  range1?: number;
  range2?: number;
};
type TypeFilterObject = {
  priceRange?: TypeFilterEnableItem;
  brand?: TypeFilterEnableItem;
  attribute?: TypeFilterEnableItem;
  marketable?: TypeFilterEnableItem;
  unblievable?: TypeFilterEnableItem;
};

let filter = new Filter({
  sortType: "asce",
  sortBy: "interest",
  filter: {
    justAvailable: false,
    unbleivable: false,
    isSale: false,
  },
});

export function FilterComponent() {
  const searchConf = useAppSelector(searchConfig);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [search, setSearch] = useState<SearchType>(searchConf);
  const [changed, setChanged] = useState<boolean>(true);
  const [dropdown1, setDropdown1] = useState<boolean>(true);
  const [dropdown2, setDropdown2] = useState<boolean>(true);
  const [animationParent] = useAutoAnimate<HTMLDivElement>({ duration: 200 });

  const [filterEnableItems, setFilterEnableItems] = useState<TypeFilterObject>(
    {}
  );
  // queryAdder()
  // queryRemover()
  async function changeFilter() {
    filter.changeFilter(searchConf, router);
  }
  async function handleSetPriceFilter() {
    if (
      (document?.getElementById("pricelte") as HTMLInputElement) !== null &&
      (document?.getElementById("pricegte") as HTMLInputElement) !== null
    ) {
      var SearchT: SearchType = {
        ...searchConf,
        filter: {
          ...searchConf.filter,
          priceRange: {
            ...searchConf.filter?.priceRange,
            pricelte:
              Number(
                (
                  document?.getElementById("pricelte") as HTMLInputElement
                )?.value.replaceAll(",", "")
              ) * 10 ?? 0,
            pricegte:
              Number(
                (
                  document?.getElementById("pricegte") as HTMLInputElement
                )?.value.replaceAll(",", "")
              ) * 10 ?? 0,
          },
        },
      };
      dispatch(setSearchConfig(SearchT));
    }
  }
  function handleFilterPriceLte(e: ChangeEvent<HTMLInputElement>) {
    if (Number(e?.target?.value?.replaceAll(",", "")) >= 0) {
      setSearch({
        ...search,
        filter: {
          ...search.filter,
          priceRange: {
            ...search.filter?.priceRange,
            pricelte: Number(e?.target?.value?.replaceAll(",", "")),
          },
        },
      });
    }
  }
  function handleFilterPriceGte(e: ChangeEvent<HTMLInputElement>) {
    if (Number(e?.target?.value?.replaceAll(",", "")) >= 0) {
      setSearch({
        ...search,
        filter: {
          ...search.filter,
          priceRange: {
            ...search.filter?.priceRange,
            pricegte: Number(e?.target?.value?.replaceAll(",", "")),
          },
        },
      });
    }
  }
  function handleToggleUnbleivable() {
    dispatch(setSearchConfig(filter.ToggleUnbleivable(searchConf)));
  }
  function handleToggleIsSale() {
    dispatch(setSearchConfig(filter.ToggleIsSale(searchConf)));
  }
  function handleAvailable() {
    dispatch(setSearchConfig(filter.ToggleAvailable(searchConf)));
  }

  useEffect(() => {
    filter.SearchSetter(searchConf);

    changeFilter();
  }, [searchConf.filter]);

  useEffect(() => {
    filter.SearchSetter(searchConf);

    setChanged(true);
  }, [search.filter]);

  const listStyle =
    "flex w-full mt-4 items-center font-Vazir-Medium text-[12px]";
  return (
    <>
      <div className="flex shadow-lg StickyContainer overflow-hidden border rounded-lg flex-wrap justify-start w-[270px] min-h-[400px] h-fit items-start my-6 lg:text-[14px] text-[12px] p-[16px]">
        <div className="flex flex-wrap items-start justify-center w-full">
          <ul className="flex flex-wrap w-full">
            {/* <li
              onClick={() => {
                if (searchConf.filter?.state === true) {
                  const SearchT: SearchType = {
                    ...searchConf,
                    filter: { state: false },
                  };
                  dispatch(setSearchConfig(SearchT));
                } else {
                  const SearchT: SearchType = {
                    ...searchConf,
                    filter: { state: true },
                  };
                  dispatch(setSearchConfig(SearchT));
                }
              }}
              className={
                "flex w-full border p-2 rounded-md cursor-pointer " +
                `${searchConf.filter?.state === true ? "bg-sky-600" : ""}`
              }
            >
              <div
                className={`text ${
                  searchConf.filter?.state === true
                    ? "text-white "
                    : "text-gray-500"
                }`}
              >
                {searchConf.filter?.state === true ? (
                  <RiFilterLine size={20} />
                ) : (
                  <RiFilterOffLine size={20} />
                )}
              </div>
              <span
                className={
                  "flex text-ellipsis justify-center items-center h-fit rounded-xl px-2 font-Vazir-Bold w-[100px] " +
                  `${
                    searchConf.filter?.state === true
                      ? "text-white"
                      : "text-gray-500"
                  }`
                }
              >
                اعمال فیلترها
              </span>
            </li> */}
            <li className="flex items-center">
              <span className="flex -mt-3 text-gray-500">
                <RiFilterFill size={25} />
              </span>
              <span className="flex text-gray-500 mx-2 font-Vazir-Bold">
                فیلتر ها
              </span>
            </li>
            <li className={listStyle + " text-[12px]"}>
              {"قیمت"}
              <input
                className="flex w-[60px] border-l mx-1 m-2 p-1 border rounded-md text-[12px] bg-green-100"
                type={"string"}
                onChange={(e) => {
                  handleFilterPriceGte(e);
                }}
                value={
                  search?.filter?.priceRange?.pricegte?.toLocaleString() ?? 0
                }
                id="pricegte"
              />
              الی
              <input
                className="flex w-[60px] border-l mx-1 m-2 p-1 border rounded-md text-[12px] bg-red-100"
                type={"string"}
                onChange={(e) => {
                  // search
                  handleFilterPriceLte(e);
                }}
                value={
                  search?.filter?.priceRange?.pricelte?.toLocaleString() ?? "0"
                }
                id="pricelte"
              />
              تومان
            </li>
            <li className={listStyle}>
              <div
                onClick={() => {
                  handleToggleIsSale();
                }}
                className={
                  "flex items-center p-2 rounded-md bg-gray-100 hover:bg-gray-400 hover:text-white cursor-pointer " +
                  ` ${searchConf.filter.isSale ? "bg-green-200" : ""}`
                }
              >
                <span className="mx-2">تخفییف دار</span>
                <div
                  className={`${
                    searchConf.filter.isSale
                      ? "animate-pulse text-blue-600"
                      : ""
                  }`}
                >
                  <MdAttachMoney size={15} />
                </div>
              </div>
              <div
                onClick={() => {
                  handleToggleUnbleivable();
                }}
                className={
                  "flex items-center p-2 rounded-md bg-gray-100 hover:bg-gray-400 hover:text-white cursor-pointer mx-2" +
                  ` ${searchConf.filter.unbleivable ? "bg-green-200" : ""}`
                }
              >
                <span className="mx-2">شگفت انگیز</span>
                <div
                  className={`${
                    searchConf.filter.unbleivable
                      ? "animate-pulse text-blue-600"
                      : ""
                  }`}
                >
                  <MdOutlineCardMembership size={15} />
                </div>
              </div>
            </li>
            <li className={listStyle}>
              <div
                onClick={() => {
                  handleAvailable();
                }}
                className={
                  "flex items-center p-2 rounded-md bg-gray-100 hover:bg-gray-400 hover:text-white cursor-pointer "
                }
              >
                <span className="mx-2">فقط کالاهای موجود</span>
                <div
                  className={`flex justify-start p-[1px] items-center rounded-xl w-[24px] h-[12px]  ${
                    searchConf.filter.justAvailable
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                >
                  <div
                    className={`transition-transform duration-700  flex w-[10px] h-[10px] bg-white rounded-full ${
                      searchConf.filter.justAvailable
                        ? "-translate-x-[12px]"
                        : ""
                    }`}
                  ></div>
                </div>
              </div>
            </li>
            <li className={listStyle}>
              <div
                className={`flex flex-wrap items-center bg-gray-100 cursor-pointer rounded-md w-fit transition-all duration-300 ${
                  dropdown2
                    ? "overflow-y-scroll h-[120px]"
                    : "overflow-hidden h-[34px]"
                }`}
                // ref={animationParent}
              >
                <div
                  onClick={() => {
                    setDropdown2((prevVal) => !prevVal);
                  }}
                  className="flex StickyContainer2 bg-gray-100 w-full p-2 -mt-2"
                >
                  انتخاب برند های مرتبط با سرچ شما
                  <div
                    className={
                      "flex mx-2 " +
                      `${
                        dropdown2
                          ? "-translate-x-4 -translate-y-1 rotate-90"
                          : ""
                      }`
                    }
                  >
                    {" "}
                    <AiOutlineDown />
                  </div>
                </div>
                {
                  <>
                    <div className="flex w-full p-2">dropdown</div>
                    <div className="flex w-full p-2">dropdown</div>
                    <div className="flex w-full p-2">dropdown</div>
                    <div className="flex w-full p-2">dropdown</div>
                    <div className="flex w-full p-2">dropdown</div>
                  </>
                }
              </div>
            </li>
            <li className={listStyle}>
              <div
                className={`flex flex-wrap items-center  bg-gray-100 cursor-pointer rounded-md w-fit transition-all duration-300 ${
                  dropdown1
                    ? "overflow-y-scroll h-[120px]"
                    : "overflow-hidden h-[34px]"
                }`}
                // ref={animationParent}
              >
                <div
                  onClick={() => {
                    setDropdown1((prevVal) => !prevVal);
                  }}
                  className="flex StickyContainer2 bg-gray-100 w-full p-2 -mt-2"
                >
                  انتخاب دسته بندی ها
                  <div
                    className={
                      "flex mx-2 " +
                      `${
                        dropdown1
                          ? "-translate-x-4 -translate-y-1 rotate-90"
                          : ""
                      }`
                    }
                  >
                    <AiOutlineDown />
                  </div>
                </div>

                <>
                  <div className="flex w-full p-2">dropdown</div>
                  <div className="flex w-full p-2">dropdown</div>
                  <div className="flex w-full p-2">dropdown</div>
                  <div className="flex w-full p-2">dropdown</div>
                  <div className="flex w-full p-2">dropdown</div>
                </>
              </div>
            </li>
            <li className={listStyle}>مشخصات فنی</li>
            {changed ? (
              <button
                onClick={() => {
                  handleSetPriceFilter();
                  setChanged(false);
                }}
                className="flex border rounded-md h-fit p-1 hover:bg-gray-500"
              >
                اعمال
              </button>
            ) : (
              <>
                <div className="flex m-2 text-green-400">
                  <TiTick size={30} />
                </div>
              </>
            )}
          </ul>
          <div className="flex flex-wrap">
            {Object?.keys(filterEnableItems)?.map((item, index) => (
              <>
                {Object?.values(filterEnableItems)?.[index]?.name !==
                undefined ? (
                  <>
                    <div key={index} className="p-1 rounded-lg border text-xs">
                      {Object?.values(filterEnableItems)[index]?.name}
                      <div
                        className="flex p-1"
                        onClick={() => {
                          var obj = filterEnableItems;
                          obj = { ...filterEnableItems, priceRange: undefined };

                          setFilterEnableItems(obj);
                        }}
                      >
                        remove
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// <div className="w-fit border-l p-2"></div>
//           {searchConf.filter?.state === true ? (
//             <ul className="flex flex-wrap font-Vazir-Medium items-center justify-center">
//               <li className={`flex items-center`}>
//                 از
//                 {/* <input
//                 className="border-l mx-2 m-2 p-2 border rounded-md"
//                 type={"string"}
//                 onChange={(e) => {
//                   if (Number(e?.target?.value?.replaceAll(",", "")) >= 0) {
//                     var SearchT: SearchType = {
//                       ...searchConf,
//                       filter: {
//                         ...searchConf.filter,
//                         priceRange: {
//                           ...searchConf.filter?.priceRange,
//                           pricelte:
//                             Number(e?.target?.value?.replaceAll(",", "")) ?? 0,
//                         },
//                       },
//                     };
//                     dispatch(setSearchConfig(SearchT));
//                   }
//                   setPricelte(
//                     Number(
//                       e?.target?.value?.replaceAll(",", "")
//                     ).toLocaleString()
//                   );
//                 }}
//                 value={searchConf.filter.priceRange?.pricelte?.toLocaleString()}
//                 id="pricelte"
//               /> */}

//               </li>
//               {/* {Object?.values(SortTranslate)?.map((trans, index) => (
//               <>
//                 <li
//                   onClick={() => {
//                     var SearchT: SearchType = {
//                       ...searchConf,
//                     };
//                     const sortby = Object?.keys(SortTranslate)[index];
//                     SearchT = {
//                       ...searchConf,
//                       sortBy: sortby,
//                     };
//                     dispatch(setSearchConfig(SearchT));
//                   }}
//                   className={`flex m-2 p-2 border rounded-md cursor-pointer ${
//                     searchConf.sortBy === Object?.keys(SortTranslate)[index]
//                       ? "font-Vazir-Bold text-blackout-black bg-slate-100"
//                       : "text-gray-500"
//                   }`}
//                   key={index}
//                 >
//                   {trans}
//                 </li>
//               </>
//             ))} */}
//             </ul>
//           ) : (
//             <></>
//           )}

export function SortComponent() {
  const searchConf = useAppSelector(searchConfig);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [sortModal, setSortModal] = useState<boolean>(false);

  const sort: Sort = {
    SortBy: "date",
    SortType: "desc",
  };

  async function changeSort() {
    router.query["sorttype"] = searchConf.sortType;
    router.query["sort"] = searchConf.sortBy;
    const queryString: string = await convertObjectToParam(router.query);
    router.push(`${router.pathname}${queryString}`);
  }

  useEffect(() => {
    changeSort();
  }, [searchConf.sortType, searchConf.sortBy]);

  // const sorts:{
  //   Sort[],
  //   string
  // }=[
  //   {
  //   SortBy: "date",
  //   SortType: "desc",
  //   },

  // ]

  return (
    <div className="flex flex-wrap justify-start w-full items-center my-6 lg:text-[14px] text-[12px]">
      {sortModal ? (
        <div className="md:hidden flex fixed items-end left-0 bottom-0 border w-full h-[100%] bg-black/30 font-Vazir-Medium text-lg">
          <div className="flex flex-wrap overflow-y-scroll h-[50%] bg-white w-full">
            <span className="flex m-2">مرتب سازی بر اساس</span>
            {Object?.values(SortTranslate)?.map((trans, index) => (
              <>
                <li
                  onClick={() => {
                    var SearchT: SearchType = {
                      ...searchConf,
                    };
                    const sortby = Object?.keys(SortTranslate)[index];
                    SearchT = {
                      ...searchConf,
                      sortBy: sortby,
                    };
                    dispatch(setSearchConfig(SearchT));
                    setSortModal(false);
                  }}
                  className={`flex w-full mx-[40px] m-2 p-2 md:p-[6px] md:m-[2px] rounded-md cursor-pointer ${
                    searchConf.sortBy === Object?.keys(SortTranslate)[index]
                      ? "font-Vazir-Bold text-blackout-black bg-slate-100 "
                      : "text-gray-500 "
                  }`}
                  key={index}
                >
                  {trans}
                </li>
              </>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      <div
        onClick={() => {
          if (searchConf.sortType === "asce") {
            const SearchT: SearchType = { ...searchConf, sortType: "desc" };
            dispatch(setSearchConfig(SearchT));
          } else {
            const SearchT: SearchType = { ...searchConf, sortType: "asce" };
            dispatch(setSearchConfig(SearchT));
          }
        }}
        className="flex rounded-md cursor-pointer "
      >
        <div
          className={` ${
            searchConf.sortType === "asce" ? "text-gray-500" : "text-gray-900"
          }`}
        >
          {searchConf.sortType === "asce" ? (
            <FaSortAmountUpAlt size={15} />
          ) : (
            <FaSortAmountDownAlt size={15} />
          )}
        </div>
        <span
          className={
            "flex text-ellipsis justify-center items-center h-fit rounded-xl font-Vazir-Bold w-auto xl:w-[80px] " +
            `${
              searchConf.sortType === "asce" ? "text-gray-500" : "text-gray-900"
            }`
          }
        >
          ترتیب {searchConf.sortType === "asce" ? "صعودی" : "نزولی"}
        </span>
      </div>
      <div className="w-fit border-l mx-[2px] px-[2px] py-2"></div>
      <ul className="hidden md:flex flex-wrap font-Vazir-Medium items-center justify-center">
        {Object?.values(SortTranslate)?.map((trans, index) => (
          <>
            <li
              onClick={() => {
                var SearchT: SearchType = {
                  ...searchConf,
                };
                const sortby = Object?.keys(SortTranslate)[index];
                SearchT = {
                  ...searchConf,
                  sortBy: sortby,
                };
                dispatch(setSearchConfig(SearchT));
              }}
              className={`flex 2xl:m-2 2xl:p-2 md:p-[6px] md:m-[2px] rounded-md cursor-pointer ${
                searchConf.sortBy === Object?.keys(SortTranslate)[index]
                  ? "font-Vazir-Bold text-blackout-black bg-slate-100 "
                  : "text-gray-500 "
              }`}
              key={index}
            >
              {trans}
            </li>
          </>
        ))}
      </ul>
      <ul className="md:hidden flex flex-wrap font-Vazir-Medium items-center justify-center">
        <li
          onClick={() => {
            setSortModal(true);
          }}
          className={`flex 2xl:m-2 2xl:p-2 md:p-[6px] md:m-[2px] rounded-md cursor-pointer ${"font-Vazir-Bold text-blackout-black bg-slate-100"}`}
        >
          {
            Object?.values(SortTranslate)?.[
              Object?.keys(SortTranslate)?.findIndex(
                (item) => searchConf.sortBy === item
              )
            ]
          }
        </li>
        {/*         
        {Object?.values(SortTranslate)?.map((trans, index) => (
          <>
            <li
              onClick={() => {
                var SearchT: SearchType = {
                  ...searchConf,
                };
                const sortby = Object?.keys(SortTranslate)[index];
                SearchT = {
                  ...searchConf,
                  sortBy: sortby,
                };
                dispatch(setSearchConfig(SearchT));
              }}
              className={`flex 2xl:m-2 2xl:p-2 md:p-[6px] md:m-[2px] rounded-md cursor-pointer ${
                searchConf.sortBy === Object?.keys(SortTranslate)[index]
                  ? "font-Vazir-Bold text-blackout-black bg-slate-100 "
                  : "text-gray-500 "
              }`}
              key={index}
            >
              {trans}
            </li>
          </>
        ))} */}
      </ul>
    </div>
  );
}
//==============================================================================================//
export function SearchFilters() {
  const classDiv = "flex w-1/4";
  return (
    <div className="flex w-full items-center justify-center">
      <div className={classDiv}>class1</div>
      <div className={classDiv}>class2</div>
      <div className={classDiv}>class3</div>
      <div className={classDiv}>class4</div>
    </div>
  );
}
//==============================================================================================//
const config: SWRConfiguration = {
  fallbackData: "fallback",
  revalidateOnMount: false,
  // ...
};
//==============================================================================================//
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    if (process.env.MONGO_URI) await mongoose.connect(process.env.MONGO_URI);
    else {
      return {
        props: {
          product: null,
        },
      };
    }
    const id: string = context?.query?.id?.toString() ?? "nothing";
    const productData: ProductsSearch | null = await GetProducts(context.query);
    console.log(productData?.Total);
    type MinifyProducts = MinifyProduct[];
    const minifyProducts: MinifyProducts = [];

    productData?.Products?.map((product) => {
      // console.log(product.attributes[3]);
      const minifyProduct: MinifyProduct = {
        primaryAttribute: product.attributes[3],
        Price: product.variants[product.primary_variant].price,
        _id: product._id,
        image: product.main.images[0],
        imid: product.imid,
        title_en: product.main.title_en,
        title_fa: product.main.title_fa,
        sku: product.main.sku,
      };
      minifyProduct["color"] = [];
      product?.variants?.map((item) => {
        if (minifyProduct?.color) {
          minifyProduct?.color?.push(item?.color ?? "");
        }
      });
      minifyProducts.push(minifyProduct);
    });

    return {
      props: {
        products: minifyProducts,
        total: productData?.Total,
      },
    };
  } catch (err) {
    return {
      props: {
        products: null,
      },
    };
  }
};
//==================================================================
async function GetProducts(
  query: ParsedUrlQuery
): Promise<ProductsSearch | null> {
  const textObject: any = query?.q
    ? {
        $text: {
          $search: query?.q,
          $diacriticSensitive: false,
          $caseSensitive: false,
        },
      }
    : {};
  const AttrtextObject = {
    $attributex: {
      $search: { "attributext.سری پردازنده": "Ryzen" },
      $diacriticSensitive: false,
      $caseSensitive: false,
    },
  };

  // const sortType = query?.sorttype == "desc" ? 1 : -1;
  const sortType = query?.sorttype == "desc" ? 1 : -1;
  const sortby:
    | "price"
    | "interest"
    | "brand"
    | "name"
    | "date"
    | "sale"
    | "sell"
    | "view"
    | string
    | undefined
    | string[] = query?.sort;
  var sort: string = "";
  switch (sortby) {
    case "brand":
      sort = "main.brand";
      break;
    case "date":
      sort = "updatedAt";
      break;
    case "price":
      sort = "variants.price.rrp_price";
      break;
    case "interest":
      sort = "seo.markup_schema.review.reviewRating.ratingValue";
      break;
    case "sell":
      sort = "variants.order_limit";
      break;
    case "sale":
      sort = "variants.price.discount_percent";
      break;
    case "view":
      sort = "variants.rate";
      break;
    case undefined:
      sort = "variants.rate";
      break;
    default:
      sort = "variants.price.rrp_price";
      break;
  }

  const sortArray: any[] = [[sort, sortType]];
  // const sda = eval(sort)
  // console.log(eval(sort))

  // var arrayone = [sort, sortType];
  // var sortArray: any[] = [];
  // sortArray.push(arrayone);
  // console.log(sortArray);
  var filterObject: object = {};
  if (query?.pricegte !== undefined && query?.pricelte !== undefined)
    filterObject = {
      ...filterObject,
      "variants.price.selling_price": {
        $gte: Number(query?.pricegte ?? 0),
        $lt: Number(query?.pricelte ?? 0),
      },
    };

  const specQuery = query.query != undefined ? query.query : {};
  console.log("specQuery", query.query);
  const categoryObject: object = query.cat ? { newCategory: query.cat } : {};
  const categoryL1Object: any = query.category
    ? { category: query.category }
    : {};
  const attributextObject: any = query.attributext
    ? { attributext: query.attributext }
    : {};
  console.log("categoryL1Object", categoryL1Object);

  const subCategoryObject = query.subCat ? { subCategory: query.subCat } : {};
  const perPageLimit = query.perPage != undefined ? Number(query.perPage) : 20;
  const PageNumber =
    query.page != undefined ? (Number(query?.page) - 1) * perPageLimit : 0;
  const count = query.count ? 1 : 0;
  console.log("perPageLimit", perPageLimit);
  console.log("PageNumber", PageNumber);

  try {
    var products: ProductsSearch = {
      Total: 0,
      filterItems: [],
      Products: [],
    };

    products.Products = await JSON.parse(
      JSON.stringify(
        await ProProduct.find(specQuery)
          .find(attributextObject?.attributext)
          .find(textObject)
          .find(filterObject)
          .find(categoryObject)
          .find(categoryL1Object.category)
          .find(subCategoryObject)
          .limit(perPageLimit)
          .skip(PageNumber)
          .sort(sortArray)
          .populate("status")
      )
    );

    // if (Number(query?.page ?? 0) < 1) {
    products.Total = await ProProduct.countDocuments(textObject)
      .countDocuments(filterObject)
      .countDocuments(categoryObject)
      .countDocuments(attributextObject.attributext)
      .countDocuments(categoryL1Object.category);
    // }
    return products;
  } catch (err) {
    console.log("err ============>", err);
    return null;
  }
}
