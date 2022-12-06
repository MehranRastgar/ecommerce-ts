import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { FaSearchengin, FaSortAmountDownAlt } from "react-icons/fa";
import { TiDeleteOutline, TiTick } from "react-icons/ti";
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
  PropertyProperty,
  Settings,
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
      <SearchPageComponent
        total={total}
        pageNumber={pageNumber}
        totalProducts={totalProducts}
        setPageNumber={setPageNumber}
        slideRef={slideRef}
        products={products}
      />
      {/* 
      <div className="flex w-full justify-center md:w-[100%]">
        <div className="hidden md:flex h-full bg-ino-white md:w-[15%] min-w-[300px] mx-2">
          <FilterComponent />
        </div>
        <div className="search-page h-fit w-full md:w-[75%] ">
          <div className="flex items-center justify-start bg-ino-white w-full mx-10 border-b">
            <div className="flex items-center justify-start bg-ino-white w-full">
              <SortComponent />
              <span className="w-auto text-center font-Vazir-Medium text-[12px]">
                {total} محصول
              </span>
            </div>
          </div>
          <div className="flex h-fit flex-wrap justify-center bg-ino-white w-9/12">
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
      </div> */}
    </>
  );
}
//==============================================================================================//
export function SearchPageComponent({
  total,
  pageNumber,
  totalProducts,
  setPageNumber,
  slideRef,
  products,
}: {
  total: number;
  pageNumber: number;
  totalProducts: number;
  setPageNumber: any;
  slideRef: any;
  products: MinifyProduct[] | null;
}) {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap w-full justify-center md:w-[100%]">
        <div className="w-full h-fit md:flex md:h-full bg-ino-white md:w-[15%] min-w-[300px] mx-2">
          <FilterComponent />
        </div>
        <div className="search-page h-fit w-full md:w-[75%] ">
          <div className="flex items-center justify-start bg-ino-white w-full mx-10 border-b">
            <div className="flex items-center justify-start bg-ino-white w-full">
              <SortComponent />
              <span className="w-auto text-center font-Vazir-Medium text-[12px]">
                {total} محصول
              </span>
            </div>
          </div>
          <div className="flex h-fit flex-wrap justify-center bg-ino-white w-9/12">
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
    "h-fit rounded-full p-2 px-3 text-black bg-ino-white border mx-2 ";

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
            <div className="h-fit rounded-full p-2 px-3 text-black bg-ino-white  mx-2 ">
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
  selectCategories,
  selectSearchState,
  selectSettings,
  setSearchConfig,
  setSearchState,
  SortTranslate,
} from "../../src/store/slices/settingsSlice";
import { privateDecrypt } from "crypto";
import { BiFilter } from "react-icons/bi";
import Filter from "../../src/class/filter";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Search } from "..";
import { BsCheckCircle, BsCircle } from "react-icons/bs";
import { useSelector } from "react-redux";

const translateQuery: object = {
  sorttype: null,
  page: null,
  pricegte: "کمینه قیمت",
  pricelte: "بیشینه قیمت",
  available: "فقط موجودها",
  unbleivable: "شگفت انگیز",
  issale: "تخفیف دار",
  brands: "برندها",
  category: "دسته بندی ها",
};

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
    brands: [],
    category: [],
    availableBrands: [],
  },
});

export function FilterComponent() {
  const searchConf = useAppSelector<SearchType>(searchConfig);
  const seartchState = useSelector(selectSearchState);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [search, setSearch] = useState<SearchType>(searchConf);
  const [changed, setChanged] = useState<boolean>(true);
  const [dropdown1, setDropdown1] = useState<boolean>(false);
  const [dropdown2, setDropdown2] = useState<boolean>(false);
  const [dropdownFilter, setDropdownFilter] = useState<boolean>(false);
  const [animationParent] = useAutoAnimate<HTMLDivElement>({ duration: 200 });

  const [filterEnableItems, setFilterEnableItems] = useState<TypeFilterObject>(
    {}
  );
  function initFilter() {
    dispatch(setSearchConfig(filter.initFilter(searchConf, router)));
    var SearchT: SearchType = {
      ...searchConf,
      filter: {
        ...searchConf.filter,
        priceRange: {
          ...searchConf.filter?.priceRange,
          pricelte:
            searchConf?.filter?.priceRange?.pricelte !== undefined
              ? searchConf?.filter?.priceRange?.pricelte / 10
              : 0,
          pricegte:
            searchConf?.filter?.priceRange?.pricegte !== undefined
              ? searchConf?.filter?.priceRange?.pricegte / 10
              : 0,
        },
      },
    };
    setSearch(SearchT);
  }
  async function changeFilter() {
    await filter.changeFilter(searchConf, router);
    dispatch(setSearchState("idle"));
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
      dispatch(setSearchState("shouldhandle"));
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
  async function handleToggleUnbleivable() {
    dispatch(setSearchConfig(filter.ToggleUnbleivable(searchConf)));
    dispatch(setSearchState("shouldhandle"));
  }
  async function handleToggleIsSale() {
    dispatch(setSearchConfig(filter.ToggleIsSale(searchConf)));
    dispatch(setSearchState("shouldhandle"));
  }
  async function handleAvailable() {
    dispatch(setSearchConfig(filter.ToggleAvailable(searchConf)));
    dispatch(setSearchState("shouldhandle"));
  }

  useEffect(() => {
    // filter.SearchSetter(searchConf);
    if (seartchState === "shouldhandle") changeFilter();
  }, [seartchState]);

  useEffect(() => {
    // filter.SearchSetter(searchConf);
    setChanged(true);
  }, [search.filter]);

  useEffect(() => {
    initFilter();
  }, [router]);

  const listStyle =
    "flex w-full mt-4 items-center font-Vazir-Medium text-[12px]";
  return (
    <>
      <div
        className={`flex transition-all w-full shadow-lg StickyContainer overflow-hidden border rounded-lg flex-wrap justify-start md:w-[270px] ${
          dropdownFilter ? "" : "h-[70px]"
        } md:min-h-[400px] md:h-fit h-fit items-start my-6 lg:text-[14px] text-[12px] p-[16px] select-none`}
      >
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
            <li
              onClick={() => {
                setDropdownFilter((value) => !value);
              }}
              className="flex w-full items-center"
            >
              <span className="flex -mt-3 text-gray-500">
                <RiFilterFill size={25} />
              </span>
              <span className="flex w-full text-gray-500 mx-2 font-Vazir-Bold">
                فیلترها
              </span>
              <div className="md:hidden flex justify-end w-full">
                <div className="flex text-xl font-Vazir-Bold items-center justify-center w-10 h-10 rounded-md border-2">
                  {" "}
                  {dropdownFilter ? (
                    <div>-</div>
                  ) : (
                    <>
                      <div>+</div>
                    </>
                  )}
                </div>
              </div>
            </li>
            <li className={listStyle + " text-[12px]"}>
              <form
                className="flex items-center"
                onSubmit={() => {
                  handleSetPriceFilter();
                  setChanged(false);
                }}
              >
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
                    search?.filter?.priceRange?.pricelte?.toLocaleString() ??
                    "0"
                  }
                  id="pricelte"
                />
                تومان
                {changed ? (
                  <button
                    disabled={
                      search?.filter?.priceRange?.pricelte !== undefined &&
                      search?.filter?.priceRange?.pricegte !== undefined &&
                      search?.filter?.priceRange?.pricelte <=
                        search?.filter?.priceRange?.pricegte
                        ? true
                        : false
                    }
                    onClick={() => {
                      handleSetPriceFilter();
                      setChanged(false);
                    }}
                    className={`flex border rounded-md h-fit p-1  mx-1  ${
                      search?.filter?.priceRange?.pricelte !== undefined &&
                      search?.filter?.priceRange?.pricegte !== undefined &&
                      search?.filter?.priceRange?.pricelte >
                        search?.filter?.priceRange?.pricegte
                        ? "bg-green-400 hover:bg-green-600"
                        : ""
                    }`}
                  >
                    {search?.filter?.priceRange?.pricelte !== undefined &&
                    search?.filter?.priceRange?.pricegte !== undefined &&
                    search?.filter?.priceRange?.pricelte <=
                      search?.filter?.priceRange?.pricegte ? (
                      <TiDeleteOutline fill="red" size={15} />
                    ) : (
                      "تایید"
                    )}
                  </button>
                ) : (
                  <>
                    <div className="flex m-2 text-green-400">
                      <TiTick size={30} />
                    </div>
                  </>
                )}
              </form>
            </li>
            <li className={listStyle}>
              <div
                onClick={() => {
                  handleToggleIsSale();
                }}
                className={
                  "flex items-center p-2 rounded-md bg-gray-100 font-Vazir-Medium border hover:font-Vazir-Bold cursor-pointer " +
                  ` ${searchConf.filter.isSale ? "bg-green-200" : ""}`
                }
              >
                <span className="mx-2">تخفیف دار</span>
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
                  "flex items-center p-2 rounded-md bg-gray-100 font-Vazir-Medium border hover:font-Vazir-Bold cursor-pointer mx-2" +
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
                  "flex items-center p-2 rounded-md bg-gray-100 font-Vazir-Medium border hover:font-Vazir-Bold cursor-pointer "
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
                    className={`transition-transform duration-700  flex w-[10px] h-[10px] bg-ino-white rounded-full ${
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
                className={`flex flex-wrap items-center  bg-gray-100 cursor-pointer rounded-md w-fit transition-all duration-300 ${
                  dropdown1
                    ? " overflow-y-scroll h-[180px]"
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
                  <div className="flex  h-auto w-full mx-2">
                    {router.query !== undefined ? (
                      <FetchCategoriesComponent
                        query={filter.convertObjectToParamSync(router.query)}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              </div>
            </li>
            <li className={listStyle}>
              <div
                className={`flex flex-wrap items-start bg-gray-100 cursor-pointer rounded-md w-fit transition-all duration-300 ${
                  dropdown2
                    ? "overflow-y-scroll h-[180px]"
                    : "overflow-hidden h-[34px]"
                }`}
                // ref={animationParent}
              >
                <div
                  onClick={() => {
                    setDropdown2((prevVal) => !prevVal);
                  }}
                  className="flex  StickyContainer2 bg-gray-100 w-full p-2 h-fit -mt-2"
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
                    <div className="flex h-auto min-h-full w-full mx-2">
                      {router.query !== undefined ? (
                        <FetchBrandsComponent
                          query={filter.convertObjectToParamSync(router.query)}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                }
              </div>
            </li>
            <li className={listStyle}>
              <div
                className={`flex flex-wrap items-center text-gray-300 p-2 bg-gray-100 cursor-pointer rounded-md w-fit transition-all duration-300 ${
                  false
                    ? "overflow-y-scroll h-[120px]"
                    : "overflow-hidden h-[34px]"
                }`}
                // ref={animationParent}
              >
                مشخصات فنی - به زودی
              </div>
            </li>
          </ul>
          <div className="flex w-full p-3 border-b my-2">
            <div className="flex w-full  "> فیلترهای اعمال شده</div>
          </div>
          <div className="flex flex-wrap">
            {Object?.keys(router.query)?.map((item, index) => (
              <>
                {eval(`translateQuery?.${item} !== null`) &&
                eval(`translateQuery?.${item} !== undefined`) ? (
                  <>
                    {typeof router?.query?.[item] === "string" &&
                    (router?.query?.[item] as string)?.split(",")?.length ===
                      1 ? (
                      <div
                        key={index}
                        className=" h-fit m-1 bg-opacity-90 text-white bg-ino-dark  p-[5px] font-Vazir-Medium rounded-lg border shadow-lg text-xs"
                      >
                        {eval(`translateQuery?.${item}`)
                          ? eval(`translateQuery?.${item}`)
                          : ""}
                        <div className="flex font-Vazir-Medium">
                          {item === "pricelte" || item === "pricegte"
                            ? `${(
                                Number(
                                  typeof router?.query?.[item] === "string"
                                    ? router?.query?.[item]
                                    : 0
                                ) / 10
                              )?.toLocaleString()} تومان`
                            : ""}

                          {item === "brands"
                            ? router.query?.[item]?.toLocaleString()
                            : ""}
                          {item === "category"
                            ? router.query?.[item]?.toLocaleString()
                            : ""}
                        </div>{" "}
                      </div>
                    ) : (
                      <>
                        {typeof router?.query?.[item] === "string" &&
                          (router?.query?.[item] as string)
                            ?.split(",")
                            ?.map((itemak: string) => (
                              <div
                                key={index}
                                className=" h-fit p-1 m-1 bg-opacity-90 text-black font-Vazir-Medium rounded-lg border text-xs"
                              >
                                {eval(`translateQuery?.${item}`)
                                  ? eval(`translateQuery?.${item}`)
                                  : ""}
                                <div className="flex font-Vazir-Medium">
                                  {itemak}
                                </div>{" "}
                              </div>
                            ))}
                      </>
                    )}
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
const fetcher = (URL: string, searchBody: Search, config: AxiosRequestConfig) =>
  axios.get(`${URL}`, config).then((res: AxiosResponse) => {
    return res;
  });
const configAxios: AxiosRequestConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "*/*",
  },
};

function FetchBrandsComponent({ query }: { query: any }) {
  const searchConf = useAppSelector(searchConfig);
  const dispatch = useAppDispatch();
  const { data } = useSWR<any>([`/api/psearch/brands${query}`, query], (url) =>
    fetcher(url, query, configAxios)
  );

  function handleAddBrand(brand: string) {
    if (
      searchConf?.filter?.brands?.findIndex((item: string) => item === brand) <=
      -1
    ) {
      console.log("add");
      const search: SearchType = filter.addToBrands(searchConf, brand);
      dispatch(setSearchConfig(search));
      dispatch(setSearchState("shouldhandle"));
    } else {
      console.log("remove");

      const search: SearchType = filter.removeFromBrands(searchConf, brand);
      dispatch(setSearchConfig(search));
      dispatch(setSearchState("shouldhandle"));
    }
  }

  useEffect(() => {
    // console.log(searchConf.filter);
    if (data?.data?.ProductsBrands?.[0]?.brands?.length !== undefined) {
      const sorted = [...data?.data?.ProductsBrands?.[0]?.brands].sort();
      var searchT: SearchType = {
        ...searchConf,
        filter: {
          ...searchConf.filter,
          availableBrands: sorted,
        },
      };
      dispatch(setSearchConfig(searchT));
      // searchConf.availableBrands
    }
  }, [data]);

  return (
    <>
      <div className="flex h-fit flex-wrap my-2">
        {searchConf.filter?.availableBrands?.length > 0 ? (
          searchConf.filter.availableBrands?.map(
            (brand: string, index: number) => (
              <>
                {" "}
                <div
                  key={index}
                  onClick={() => handleAddBrand(brand)}
                  className="flex justify-end w-full p-2 border rounded-md h-fit my-1 shadow-sm bg-gray-300 hover:animate-pulse font-Vazir-Bold text-gray-600"
                >
                  <div className="mx-4 items-center text-green-400">
                    {searchConf?.filter?.brands?.findIndex(
                      (item) => item === brand
                    ) < 0 ? (
                      <TiDeleteOutline fill="red" size={15} />
                    ) : (
                      <BsCheckCircle fill="green" size={15} />
                    )}
                  </div>
                  {brand?.[0].toUpperCase() + brand?.substring(1)}
                </div>
              </>
            )
          )
        ) : (
          <>با این مشخضه یافت نشد</>
        )}{" "}
      </div>
    </>
  );
}
function FetchCategoriesComponent({ query }: { query: any }) {
  const categories = useAppSelector<Settings>(selectCategories);
  const searchConf = useAppSelector(searchConfig);
  const dispatch = useAppDispatch();

  function handleAddCategories(catL1: string | undefined) {
    if (catL1 === undefined) {
      return;
    }
    if (
      searchConf?.filter?.category?.findIndex(
        (item: string) => item === catL1
      ) <= -1
    ) {
      console.log("add");
      const search: SearchType = filter.addToCatL1(searchConf, catL1);
      dispatch(setSearchConfig(search));
      dispatch(setSearchState("shouldhandle"));
    } else {
      console.log("remove");

      const search: SearchType = filter.removeFromCatL1(searchConf, catL1);
      dispatch(setSearchConfig(search));
      dispatch(setSearchState("shouldhandle"));
    }
  }
  useEffect(() => {
    console.log("cats", categories);
  });

  return (
    <>
      <div className="flex h-fit flex-wrap my-2 ">
        {categories.name === "categories" ? (
          categories?.properties?.[0]?.properties?.map((cat, index: number) => (
            <>
              {" "}
              <div
                key={index}
                onClick={() => {
                  handleAddCategories(cat?.L1?.[0]?.title);
                }}
                className="flex justify-start w-full p-2 border rounded-md h-fit my-1 shadow-sm bg-gray-300 hover:animate-pulse font-Vazir-Bold text-gray-600"
              >
                {cat?.L1?.[0]?.title_fa}
                <div className="mx-4 items-center text-green-400">
                  {searchConf?.filter?.category?.findIndex(
                    (item) => item === cat?.L1?.[0]?.title
                  ) < 0 ? (
                    <TiDeleteOutline fill="red" size={15} />
                  ) : (
                    <BsCheckCircle fill="green" size={15} />
                  )}
                </div>
              </div>
            </>
          ))
        ) : (
          <></>
        )}{" "}
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

  async function changeSort() {
    router.query["sorttype"] = searchConf.sortType;
    router.query["sort"] = searchConf.sortBy;
    const queryString: string = await convertObjectToParam(router.query);
    router.push(`${router.pathname}${queryString}`);
  }

  useEffect(() => {
    changeSort();
  }, [searchConf.sortType, searchConf.sortBy]);

  return (
    <div className="flex flex-wrap justify-start w-full items-center my-6 lg:text-[14px] text-[12px] select-none">
      <div className="flex w-full font-Vazir-Medium">
        نتایج جستجو برای:
        <div className="mx-2 font-Vazir-Medium">{router.query.q}</div>
        {typeof router?.query?.category === "string" &&
        router?.query?.category.length > 1 ? (
          <div className=" flex mx-2 font-Vazir-Medium">
            {(router?.query?.category as string)?.split(",")?.[0] !==
            undefined ? (
              (router?.query?.category as string)
                ?.split(",")
                ?.map((item: string) => (
                  <>
                    <div className="flex mx-2">
                      {item?.[0]?.toUpperCase() !== undefined
                        ? item?.[0]?.toUpperCase() + item?.substring(1)
                        : null}
                    </div>
                  </>
                ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {typeof router?.query?.subcat === "string" &&
        router?.query?.subcat.length > 1 ? (
          <div className=" flex mx-2 font-Vazir-Medium">
            {(router?.query?.subcat as string)?.split(",")?.[0] !==
            undefined ? (
              (router?.query?.subcat as string)
                ?.split(",")
                ?.map((item: string) => (
                  <>
                    <div className="flex mx-2">
                      {item?.[0]?.toUpperCase() !== undefined
                        ? item?.[0]?.toUpperCase() + item?.substring(1)
                        : null}
                    </div>
                  </>
                ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
        {/* <div className="mx-2 font-Vazir-Medium">
          {router.query.subcat?.[0].toUpperCase() +
            router.query?.subcat?.substring(1)}
        </div> */}
      </div>
      {sortModal ? (
        <div className="md:hidden flex fixed items-end left-0 bottom-0 border w-full h-[100%] bg-black/30 font-Vazir-Medium text-lg">
          <div className="flex flex-wrap overflow-y-scroll h-[50%] bg-ino-white w-full">
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
      <ul className="hidden md:flex flex-wrap font-Vazir-Medium items-center justify-center select-none">
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
          className={`flex 2xl:m-2 2xl:p-2 md:p-[6px] md:m-[2px] p-2 rounded-md cursor-pointer text-brand-red ${"font-Vazir-Bold text-blackout-black bg-slate-100"}`}
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
  // const AttrtextObject = {
  //   $attributex: {
  //     $search: { "attributext.سری پردازنده": "Ryzen" },
  //     $diacriticSensitive: false,
  //     $caseSensitive: false,
  //   },
  // };

  // const sortType = query?.sorttype == "desc" ? 1 : -1;
  const available =
    query?.available === "true"
      ? { "variants.price.rrp_price": { $gte: 1 } }
      : {};
  const unbleivable =
    query?.unbleivable === "true"
      ? { "variants.price.is_incredible": true }
      : {};
  const issale =
    query?.issale === "true"
      ? { "variants.price.discount_percent": { $gte: 1 } }
      : {};

  console.log(query.brands);
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

  let brString: string = typeof query.brands === "string" ? query.brands : "";

  const brands: object =
    brString === "" ? {} : { "main.brand": brString.split(",") };

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

  let catString: string =
    typeof query.category === "string" ? query.category : "";

  const specQuery = query.query != undefined ? query.query : {};
  console.log("specQuery", query.query);
  const categoryL1Object: any = query?.category
    ? { "category.L1": catString.split(",") }
    : {};
  const attributextObject: any = query.attributext
    ? { attributext: query.attributext }
    : {};
  // console.log("categoryL1Object", categoryL1Object);

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
          .find(brands)
          .find(categoryL1Object)
          .find(subCategoryObject)
          .find(available)
          .find(issale)
          .find(unbleivable)
          .limit(perPageLimit)
          .skip(PageNumber)
          .sort(sortArray)
      )
    );

    // if (Number(query?.page ?? 0) < 1) {
    products.Total = await ProProduct.countDocuments(textObject)
      .countDocuments(filterObject)
      .countDocuments(available)
      .countDocuments(unbleivable)
      .countDocuments(brands)
      .countDocuments(issale)
      .countDocuments(attributextObject.attributext)
      .countDocuments(categoryL1Object);
    // }
    return products;
  } catch (err) {
    console.log("err ============>", err);
    return null;
  }
}
