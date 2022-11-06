import axios, { AxiosResponse } from "axios";
import { FaSearchengin } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useEffect, useState } from "react";
import useSWR, { SWRConfiguration } from "swr";
import {
  GetProductsArray,
  MinifyProduct,
  ProductInterface,
  ProductsSearch,
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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(total);

  const router = useRouter();

  useEffect(() => {
    setTotalProducts(total);
    if (router?.query?.page !== undefined)
      setPageNumber(Number(router.query.page));
  }, [products, total]);

  return (
    <>
      <div className="flex flex-wrap justify-center w-full select-none">
        <div className="flex  min-h-[200px] bg-white w-9/12">
          <SearchFilters />
        </div>
        <span className="w-full text-center font-Vazir-Medium text-[16px]">
          {total} محصول
        </span>
        <div className="flex justify-center bg-white w-9/12">
          <Pagination
            page={pageNumber}
            total={totalProducts}
            setPage={setPageNumber}
          />
        </div>
        <div className="flex justify-center w-full">
          <div className="flex flex-wrap justify-center w-9/12">
            {products?.map((product) => (
              <>
                <ProductCardOne minifyProduct={product} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
//==============================================================================================//
export function Pagination({
  total,
  page,
  setPage,
}: {
  total: number;
  page: number;
  setPage: any;
}) {
  const router = useRouter();
  const [lastPage, setLastPage] = useState<number>();
  const [prevState, setPrevState] = useState<"idle" | "off" | "loading">(
    "loading"
  );
  const [nextState, setNextState] = useState<"idle" | "off" | "loading">(
    "loading"
  );
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
    console.log("lastpage", lastPage, total - page * 20);
  }

  useEffect(() => {
    changeState();
  }, [total, page]);

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
  async function changeRouteAndPage(newPage: number) {
    // setPage(newPage);
    if (
      newPage < 1 ||
      newPage > (total % 20 > 0 ? 1 : 0) + Math.trunc(total / 20)
    )
      return;

    router.query["page"] = newPage.toString();
    console.log(router.query);
    const queryString: string = await convertObjectToParam(router.query);
    console.log(router);

    router.push(`${router.pathname}${queryString}`);
    // router.push(router.asPath + encodeURI(router.query));
  }

  const paginationNumberStyle =
    "h-fit rounded-full p-2 px-3 text-black bg-white border mx-2";

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
      <div className="flex justify-center w-[200px] overflow-hidden">
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
            "h-fit rounded-full p-2 px-3 text-white bg-slate-600 border mx-2 cursor-pointer"
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
                if (lastPage !== undefined) changeRouteAndPage(lastPage);
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
const GetProducts = async (
  query: ParsedUrlQuery
): Promise<ProductsSearch | null> => {
  console.log("req.body======> ", query);
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

  const sortType = query?.sortType == "desc" ? 1 : -1;
  const sort = query?.sort ? query?.sort : false;

  // const sda = eval(sort)
  // console.log(eval(sort))

  var arrayone = [sort, sortType];
  var sortArray: any[] = [];
  sortArray.push(arrayone);
  console.log(sortArray);
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
};
