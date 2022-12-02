import axios, { AxiosResponse } from "axios";
import { FaSearchengin } from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import useSWR, { SWRConfiguration } from "swr";
import {
  GetProductsArray,
  MinifyProduct,
  ProductInterface,
  ProductsSearch,
} from "../../../src/types/types";
import Router, { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import mongoose, { NumberExpression } from "mongoose";
import { GetServerSideProps } from "next";
import ProProduct from "../../../src/models/ProProduct";
import ProductCardOne from "../../../components/product/ProductCardOne";
import {
  Pagination,
  SearchContainer,
  SearchFilters,
  SearchPageComponent,
} from "..";
//==============================================================================================//
export default function SearchPage({
  products,
  total,
  BrandName,
}: {
  products: MinifyProduct[] | null;
  total: number;
  BrandName: string;
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
    </>
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
    const brand: string = context?.query?.brand?.toString() ?? "nothing";
    const productData: ProductsSearch | null = await GetProducts({
      ...context.query,
      brand: brand,
    });
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
    const branddd: string | undefined =
      brand?.[0].toUpperCase() + brand?.substring(1);

    return {
      props: {
        BrandName: branddd,
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
// const GetProducts = async (
//   query: ParsedUrlQuery
// ): Promise<ProductsSearch | null> => {
//   console.log("req.body======> ", query);
//   const textObject: any = query?.q
//     ? {
//         $text: {
//           $search: query?.q,
//           $diacriticSensitive: false,
//           $caseSensitive: false,
//         },
//       }
//     : {};
//   const AttrtextObject = {
//     $attributex: {
//       $search: { "attributext.سری پردازنده": "Ryzen" },
//       $diacriticSensitive: false,
//       $caseSensitive: false,
//     },
//   };

//   const sortType = query?.sortType == "desc" ? 1 : -1;
//   const sort = query?.sort ? query?.sort : false;

//   // const sda = eval(sort)
//   // console.log(eval(sort))

//   var arrayone = [sort, sortType];
//   var sortArray: any[] = [];
//   sortArray.push(arrayone);
//   console.log(sortArray);
//   const filterObject = {};
//   const specQuery = query.query != undefined ? query.query : {};
//   console.log("specQuery", query.query);
//   //   const categoryObject: object = query.cat ? { newCategory: query.cat } : {};
//   var branddd: string | undefined = "";
//   if (typeof query?.brand === "string") {
//     branddd = query?.brand?.[0].toUpperCase() + query?.brand?.substring(1);
//   }

//   const categoryL1Object: any = { category: { "category.L2": branddd } };
//   //   { "category.L1": "laptop" }

//   const attributextObject: any = query.attributext
//     ? { attributext: query.attributext }
//     : {};
//   console.log("categoryL1Object", categoryL1Object);

//   const subCategoryObject = query.subCat ? { subCategory: query.subCat } : {};
//   const perPageLimit = query.perPage != undefined ? Number(query.perPage) : 20;
//   const PageNumber =
//     query.page != undefined ? (Number(query?.page) - 1) * perPageLimit : 0;
//   const count = query.count ? 1 : 0;
//   console.log("perPageLimit", perPageLimit);
//   console.log("PageNumber", PageNumber);

//   try {
//     var products: ProductsSearch = {
//       Total: 0,
//       filterItems: [],
//       Products: [],
//     };

//     products.Products = await JSON.parse(
//       JSON.stringify(
//         await ProProduct.find(specQuery)
//           .find(attributextObject?.attributext)
//           .find(textObject)
//           .find(filterObject)
//           //   .find(categoryObject)
//           .find(categoryL1Object.category)
//           .find(subCategoryObject)
//           .limit(perPageLimit)
//           .skip(PageNumber)
//           .sort(sortArray)
//           .populate("status")
//       )
//     );

//     // if (Number(query?.page ?? 0) < 1) {
//     products.Total = await ProProduct.countDocuments(textObject)
//       .countDocuments(filterObject)
//       //   .countDocuments(categoryObject)
//       .countDocuments(attributextObject.attributext)
//       .countDocuments(categoryL1Object.category);
//     // }
//     return products;
//   } catch (err) {
//     console.log("err ============>", err);
//     return null;
//   }
// };

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

  var branddd: string | undefined = "";
  if (typeof query?.brand === "string") {
    branddd = query?.brand?.[0].toUpperCase() + query?.brand?.substring(1);
  }

  const categoryL1Object: any = { category: { "category.L2": branddd } };

  const specQuery = query.query != undefined ? query.query : {};
  console.log("specQuery", query.query);
  const categoryObject: object = query.cat ? { newCategory: query.cat } : {};

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
          .find(available)
          .find(issale)
          .find(unbleivable)
          .find(available)
          .limit(perPageLimit)
          .skip(PageNumber)
          .sort(sortArray)
          .populate("status")
      )
    );

    // if (Number(query?.page ?? 0) < 1) {
    products.Total = await ProProduct.countDocuments(textObject)
      .countDocuments(filterObject)
      .countDocuments(available)
      .countDocuments(unbleivable)
      .countDocuments(issale)
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
