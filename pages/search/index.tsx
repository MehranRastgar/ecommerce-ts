import axios, { AxiosResponse } from "axios";
import { FaSearchengin, FaSortAmountDownAlt } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
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
      <div className="flex flex-wrap justify-center w-full select-none">
        <div className="flex  min-h-[200px] bg-white w-9/12">
          <SearchFilters />
        </div>

        <div className="flex flex-wrap justify-center bg-white w-9/12">
          <SortComponent />
        </div>
        <span className="w-full text-center font-Vazir-Medium text-[16px]">
          {total} محصول
        </span>
        <div className="flex flex-wrap justify-center bg-white w-9/12">
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
        <div className="flex flex-wrap justify-center w-10/12">{children}</div>
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
    <div className="flex items-center my-4 font-Vazir-Medium">
      <button
        onClick={(e) => {
          changeRouteAndPage(page - 1);
        }}
        disabled={!(prevState === "idle")}
        className={`rounded-xl m-1 h-fit p-2 px-3 hover:bg-cyan-400  ${
          prevState === "idle" ? "text-gray-600" : "text-gray-300"
        }`}
      >
        <MdSkipNext size={30} />
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
        <MdSkipPrevious size={30} />
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

export function SortComponent() {
  const searchConf = useAppSelector(searchConfig);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const sort: Sort = {
    SortBy: "date",
    SortType: "desc",
  };

  async function changeSort() {
    router.query["sorttype"] = searchConf.sortType;
    router.query["sort"] = searchConf.sortBy;
    const queryString: string = await convertObjectToParam(router.query);
    // console.log(router);

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
        className="flex border p-2 rounded-md cursor-pointer "
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
            "flex text-ellipsis justify-center items-center h-fit  rounded-xl  px-2 font-Vazir-Bold w-[100px] " +
            `${
              searchConf.sortType === "asce" ? "text-gray-500" : "text-gray-900"
            }`
          }
        >
          ترتیب {searchConf.sortType === "asce" ? "صعودی" : "نزولی"}
        </span>
      </div>
      <div className="w-fit border-l p-2"></div>
      <ul className="flex flex-wrap font-Vazir-Medium items-center justify-center">
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
              className={`flex m-2 p-2 border rounded-md cursor-pointer ${
                searchConf.sortBy === Object?.keys(SortTranslate)[index]
                  ? "font-Vazir-Bold text-blackout-black bg-slate-100"
                  : "text-gray-500"
              }`}
              key={index}
            >
              {trans}
            </li>
          </>
        ))}
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
  const filterObject = {};
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
