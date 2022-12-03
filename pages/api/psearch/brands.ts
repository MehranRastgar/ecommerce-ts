import axios from "axios";
import type { NextApiHandler } from "next";
import { ParsedUrlQuery } from "querystring";
import { MinifyProduct, ProductsSearch } from "../../../src/types/types";
import mongoose, { NumberExpression } from "mongoose";
import ProProduct from "../../../src/models/ProProduct";

const brandsApiHandler: NextApiHandler = async (request, response) => {
  try {
    if (process.env.MONGO_URI) await mongoose.connect(process.env.MONGO_URI);
    else {
      return {
        props: {
          product: null,
        },
      };
    }
    const productData: ProductsSearch | null = await GetProducts(request.query);
    // console.log(productData?.Total);
    // type MinifyProducts = MinifyProduct[];
    // const minifyProducts: MinifyProducts = [];

    // productData?.Products?.map((product) => {
    //   // console.log(product.attributes[3]);
    //   const minifyProduct: MinifyProduct = {
    //     primaryAttribute: product.attributes[3],
    //     Price: product.variants[product.primary_variant].price,
    //     _id: product._id,
    //     image: product.main.images[0],
    //     imid: product.imid,
    //     title_en: product.main.title_en,
    //     title_fa: product.main.title_fa,
    //     sku: product.main.sku,
    //   };
    //   minifyProduct["color"] = [];
    //   product?.variants?.map((item) => {
    //     if (minifyProduct?.color) {
    //       minifyProduct?.color?.push(item?.color ?? "");
    //     }
    //   });
    //   minifyProducts.push(minifyProduct);
    // });

    return response.status(200).json({ ProductsBrands: productData?.Products });
  } catch (err: any) {
    console.log("eeerrrr===>>", err);

    return response.status(502).end(err);
  }
};

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

  let catString: string =
    typeof query.category === "string" ? query.category : "";
  // const specQuery = query.query != undefined ? query.query : {};
  const categoryL1Object: any = query?.category
    ? { "category.L1": { $in: catString.split(",") } }
    : {};

  const attributextObject: any = query.attributext
    ? { attributext: query.attributext }
    : {};

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
        await ProProduct.aggregate([
          {
            $match: {
              ...textObject,
              ...filterObject,
              ...categoryL1Object,
              ...subCategoryObject,
              ...available,
              ...issale,
              ...unbleivable,
            },
          },
          {
            $group: {
              _id: null,
              brands: { $addToSet: "$main.brand" },
              cats: { $addToSet: "$category.L1" },
            },
          },
        ])
      )
    );

    // if (Number(query?.page ?? 0) < 1) {
    // products.Total = await ProProduct.countDocuments(textObject)
    //   .countDocuments(filterObject)
    //   .countDocuments(available)
    //   .countDocuments(unbleivable)
    //   .countDocuments(issale)
    //   .countDocuments(categoryObject)
    //   .countDocuments(attributextObject.attributext)
    //   .countDocuments(categoryL1Object.category);
    // }
    return products;
  } catch (err) {
    console.log("err ============>", err);
    return null;
  }
}

export default brandsApiHandler;
