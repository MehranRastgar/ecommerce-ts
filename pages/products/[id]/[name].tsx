import Layout from "../../../components/Layout";
import { Product } from "../../../src/types/types";
import imageLoader from "../../../src/imageLoader";
import Image from "next/image";
import { imageAddress } from "../..";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

function ProductPage({ product }: { product: Product | null }) {
  const [pro, setPro] = useState<Product | null>(null);

  useEffect(() => {
    if (pro === null) {
      setPro(product);
      console.log("one time");
    }
    console.log("pro product in use effect", pro);
  }, [pro, product]);

  return product !== null ? (
    <>
      <ProductHeadComponent product={product} />
      <div className="flex flex-wrap w-full min-w-screen h-fit justify-start">
        {/* is ok{product?._id} */}
        <div
          className="flex w-full md:w-2/6  items-start justify-center p-2"
          key={product?._id ?? "idone"}
        >
          <ClickBar product={product} />
          <ProductImageComponent product={product} />
        </div>
        <div
          className="flex flex-wrap items-start justify-center w-full md:w-4/6  p-2"
          key={product?._id ?? "idone"}
        >
          <Title name={product.main.title_fa} />
          <ProductInfoSection product={product} />
        </div>
      </div>
    </>
  ) : (
    <div>product not exist</div>
  );
}

export function ProductHeadComponent({ product }: { product: Product }) {
  return (
    <Head>
      <title>{`${product.seo.title}`}</title>
      <meta name="keywords" content={product.seo.description}></meta>
      <title>{`${product?.main?.title_fa}`}</title>
      <meta
        name="keywords"
        content={`خرید,اینترنتی,${product?.main?.brand[0]}`}
      ></meta>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      {/* {/* <meta charSet="utf-8" /> */}
      <meta name="description" content={`${product?.seo?.description}`}></meta>
      <meta
        name="image"
        content={`https://api.bugtech.ir/api/image?x=350&y=350&q=80&t=jpeg&path=${product.main.images[0]}`}
      ></meta>
      <meta
        property="og:title"
        content={`${product?.main?.title_fa}`}
        key="ogtitle"
      />
      {/* <meta httpEquiv="refresh" content="200"/> */}
      <meta
        property="og:description"
        content={`${product?.seo?.description}`}
      />
      <meta property="og:locale" content="fa_IR" />
      <meta property="og:site_name" content="shopsoo"></meta>
      <meta
        property="og:url"
        content={`https://shopsoo.ir/products/${product?._id}/${(
          product?.main.title_fa ?? product?.main?.sku
        )?.replaceAll(" ", "-")}`}
      ></meta>
      <meta property="og:availability" content="in stock"></meta>
      <meta property="og:type" content="product"></meta>
      <meta
        property="og:image"
        // itemProp="image"
        content={`https://api.bugtech.ir/api/image?x=350&y=350&q=80&t=jpeg&path=${product.main.images[0]}`}
      />
      {/* <meta property="og:image:secure_url" content={`https://api.bugtech.ir/api/image?x=350&y=350&q=60&t=jpg&path=${product.main.images[0]}`} />
  <meta property="og:image:type" content="image/jpg" />
  <meta property="og:image:width" content="350" />
  <meta property="og:image:height" content="350" />
  <meta property="og:image:alt" content={product.main.title_en}/> */}
      <meta
        property="twitter:image"
        content={`https://api.bugtech.ir/api/image?x=350&y=350&q=100&t=jpeg&path=${product.main.images[0]}`}
      ></meta>
      <meta property="twitter:card" content="summary_large_image"></meta>
      <meta name="twitter:site" content="@inomal"></meta>
      <meta name="twitter:app:id:googleplay" content="shopsoo"></meta>
      <meta name="twitter:creator" content="shopsoo"></meta>
      <meta name="twitter:title" content={product?.main?.title_fa}></meta>
      <meta
        name="twitter:description"
        content={product?.seo?.description}
      ></meta>
      <link
        rel="canonical"
        href={`https://shopsoo.ir/products/${product?._id}/${(
          product?.main.title_fa ?? product?.main?.sku
        )?.replaceAll(" ", "-")}`}
      ></link>
    </Head>
  );
}
function Title({ name }: { name: string }) {
  return (
    <div className="flex w-full h-[100px] text-start items-end p-2 mx-4">
      <div className="flex text-[20px] font-Vazir-Bold ">{name}</div>
    </div>
  );
}
function ProductInfoSection({ product }: { product: Product }) {
  const [variantNumber, setVariantNumber] = useState<number>(
    product.primary_variant
  );

  return (
    <div className="flex justify-start w-full h-full mt-4">
      <VariantSection
        variantNumber={variantNumber}
        setVariantNumber={setVariantNumber}
        product={product}
      />
      <div className="flex w-28"></div>

      <CartSection variantNumber={variantNumber} product={product} />
    </div>
  );
}

function CartSection({
  product,
  variantNumber,
}: {
  product: Product;
  variantNumber: any;
}) {
  return (
    <div className="flex flex-wrap h-full justify-center p-2 max-h-[400px] w-1/4 border rounded-xl m-2 font-Vazir-Medium text-wipro-darkred justify-self-end">
      <div className="flex w-full ">
        {product?.variants?.[variantNumber].warranty}
      </div>
      <div className="flex w-full h-fit min-w-[300px] flex-center text-center font-Vazir-Bold">
        {(
          product?.variants?.[variantNumber ?? 0].price.rrp_price / 10
        ).toLocaleString()}
      </div>
    </div>
  );
}

function VariantSection({
  product,
  variantNumber,
  setVariantNumber,
}: {
  product: Product;
  variantNumber: any;
  setVariantNumber: any;
}) {
  return (
    <div className="w-fit">
      <div className="flex flex-wrap max-w-[600px] w-fit m-4 select-none max-h-[400px] overflow-y-auto border rounded-xl p-2">
        {product?.variants?.map((variant, index) => (
          <>
            <div className="flex flex-wrap w-full p-2">
              <div
                onClick={() => {
                  setVariantNumber(index);
                }}
                className={
                  "cursor-pointer font-Vazir-Medium border rounded-xl w-full p-2 " +
                  `${
                    index === variantNumber
                      ? "border-red-600 text-gray-800 "
                      : "text-gray-400 "
                  }`
                }
              >
                <div className="p-2">{variant.warranty}</div>

                <div className="flex mx-2 items-center justify-end p-2">
                  {variant.color.title}
                  <div className="w-fit h-fit border-black p-1 border rounded-full mx-2">
                    {index === variantNumber ? (
                      <FaCheckCircle
                        size={25}
                        color={`${variant.color.hex_code}`}
                      />
                    ) : (
                      <FaCircle size={25} color={`${variant.color.hex_code}`} />
                    )}
                  </div>
                  <div className="font-Vazir-Bold w-3/4 text-end">
                    {(variant.price.rrp_price / 10).toLocaleString()} تومان
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
function ClickBar({ product }: { product: Product }) {
  return <div className="w-[40px] h-full bg-transparent "></div>;
}
export function ProductImageComponent({ product }: { product: Product }) {
  return (
    <div>
      <ProductImages productData={product} />
    </div>
  );
}
export function ProductPriceComponent({ product }: { product: Product }) {}
export function ProductAttributeComponent({ product }: { product: Product }) {}
export function ProductDescriptionComponent({
  product,
}: {
  product: Product;
}) {}
export function ProductRelativeComponent({ product }: { product: Product }) {}

ProductPage.getLayout = function getLayout(page: typeof ProductPage) {
  return <Layout>{page}</Layout>;
};

// type Search = {
//     perPage: string,
//     page: string,
//     category: object,
//     sort: string
// }

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
    const productData: Product | null = await getProductAndRealtive(id);
    // const response: AxiosResponse = await axios.post(
    //     `http://localhost:5000/api/pro/${context.query.id}`,
    // );

    // const dataProduct: GetProductsArray = {
    //     info: null,
    //     results: [response.data]
    // }

    return {
      props: {
        product: productData,
      },
    };
  } catch (err) {
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductPage;

import ProductModel from "../../../src/models/ProProduct";

async function getProductAndRealtive(id: string): Promise<Product | null> {
  if (id) {
    try {
      const ProductData: object | null = await ProductModel.findById(id);

      const proData: Product | null = await JSON.parse(
        JSON.stringify(ProductData)
      );
      return proData;
    } catch (err) {
      return null;
    }
  } else {
    return null;
  }
}
// var category = "";
// if (!isEmpty(proData.subCategory)) {
//   category = `&subCat=${proData.subCategory}`;
// } else {
//   category = `&cat=${proData.newCategory}`;
// }
// // var { data: Laptop } = await axios.get(
// //   `/api/pro?s=${product?.main?.sku}&sort=2&${category}`
// // );
// var req = {
//   body: {
//     perPage: "10",
//     page: "1",
//     category: {
//       "category.L1": proData.category.L1,
//       "category.L2": proData.category.L2,
//     },
//     sort: "price",
//   },
// };

// const textObject = req.body.text
//   ? {
//       $text: {
//         $search: req.body.text,
//         $diacriticSensitive: false,
//         $caseSensitive: false,
//       },
//     }
//   : {};

// const sortType = req.body?.sortType == "desc" ? 1 : -1;
// const sort = req.body?.sort ? req.body?.sort : false;

// // const sda = eval(sort)
// // console.log(eval(sort))
// var arrayone = [sort, sortType];
// var sortArray = [];
// sortArray.push(arrayone);
// console.log(sortArray);
// const filterObject = {};
// const specQuery = req.body.query != undefined ? req.body.query : {};
// console.log("specQuery", req.body.query);
// const categoryObject = req.body.cat ? { newCategory: req.body.cat } : {};
// const categoryL1Object = req.body.category
//   ? { category: req.body.category }
//   : {};
// const attributextObject = req.body.attributext
//   ? { attributext: req.body.attributext }
//   : {};
// console.log("categoryL1Object", categoryL1Object);

// const subCategoryObject = req.body.subCat
//   ? { subCategory: req.body.subCat }
//   : {};
// const perPageLimit =
//   req.body.perPage != undefined ? Number(req.body.perPage) : 20;
// const PageNumber =
//   req.body.page != undefined ? Number(req.body.page - 1) * perPageLimit : 0;
// const count = req.body.count ? 1 : 0;
// console.log("perPageLimit", perPageLimit);
// console.log("PageNumber", PageNumber);
// //   var SORTs = { updatedAt: sortType };
// // } else if (qSort == "price") {
// //   var SORTs = { "main.prices.price": sortType };
// // } else if (qSort == "cat") {
// //   var SORTs = { category: sortType };
// // } else {
// //   var SORTs = { score: { $meta: "textScore" } };
// var prod=[]

// if (count == 0) {
//   prod = await Product.find(specQuery)
//     .find(attributextObject.attributext)
//     .find(textObject)
//     .find(filterObject)
//     .find(categoryObject)
//     .find(categoryL1Object.category)
//     .find(subCategoryObject)
//     .limit(perPageLimit)
//     .skip(PageNumber)
//     .sort(sortArray)
//     .populate("status");
// }

// const prodRelative = JSON.parse(JSON.stringify(prod));
const ProductImages = ({ productData }: { productData: Product }) => {
  const slideRef = useRef<HTMLInputElement>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [tab, setTab] = useState<number>(0);

  function fadeAnimation() {
    slideRef?.current?.classList?.add("fade-anim-image");
    setTimeout(() => {
      slideRef?.current?.classList?.remove("fade-anim-image");
    }, 500);
  }

  function Submit(command: "next" | "prev") {
    if (command == "next") {
      fadeAnimation();
      if (tab < productData?.main?.images.length - 1) {
        setTab(tab + 1);
      } else setTab(0);

      return;
    } else if (command == "prev") {
      fadeAnimation();
      if (tab > 0) setTab(tab - 1);
      return;
    }
  }

  return (
    <div
      ref={slideRef}
      className="w-full bg-white justify-items-stretch select-none"
    >
      {productData?.main?.images.length > 0 ? (
        <>
          {!fullScreen ? (
            <Image
              loader={imageLoader}
              unoptimized
              src={imageAddress(
                productData?.main?.images?.[tab],
                500,
                500,
                100,
                "webp",
                undefined
              )}
              alt={productData?.main?.title_en ?? "noname"}
              width={800}
              height={800}
            />
          ) : (
            <></>
            // <FullScreenImage
            //   Submit={Submit}
            //   setTab={setTab}
            //   productData={productData}
            //   img={img}
            //   tab={tab}
            //   setFullScreen={setFullScreen}
            // ></FullScreenImage>
          )}
        </>
      ) : (
        <br></br>
      )}

      <div className=" flex justify-center  items-center">
        <button
          className="btn-primary p-2 m-2 disabled:bg-white text-white bg-cyan-400 rounded-md hover:bg-cyan-500"
          onClick={() => Submit("prev")}
        >
          <AiOutlineVerticalLeft size={15} />
        </button>

        <div className="overflow-hidden   border-black rounded-xl p-1  ">
          <div
            className=" flex flex-wrap-row mx-auto justify-center  overflow-x-scrol scrolbar-hidden h-12 w-64  m-2 "
            style={{ cursor: "pointer" }}
          >
            {productData?.main?.images?.map((img, index) => {
              return index - tab < 15 && tab - index < 15 ? (
                <>
                  <div
                    onClick={() => {
                      setTab(index), fadeAnimation();
                    }}
                    key={index}
                    className={`flex p-1 rounded-full h-4 w-4 border  m-1 ${
                      index == tab ? "bg-cyan-500" : "bg-gray-100"
                    }`}
                  ></div>
                </>
              ) : (
                <></>
              );
            })}
          </div>
        </div>
        <button
          className="btn-primary p-2 m-2 disabled:bg-white text-white bg-cyan-400 rounded-md hover:bg-cyan-500"
          onClick={() => Submit("next")}
        >
          <AiOutlineVerticalRight size={15} />
        </button>
      </div>
    </div>
  );
};

// const FullScreenImage = ({
//   img,
//   Submit,
//   setTab,
//   productData,
//   tab,
//   setFullScreen,
// }) => {
//   const [clickInside, setclickInside] = useState(0);
//   const [clickOutInside, setClickOutInside] = useState(0);

//   function countClicks() {
//     if (clickInside && clickOutInside) {
//       setclickInside(0);
//       setClickOutInside(0);
//     } else if (clickOutInside) {
//       setFullScreen(false);
//     }
//   }
//   useEffect(() => {
//     console.log(clickInside);
//     countClicks();
//   }, [clickOutInside]);

//   return (
//     <>
//       <div
//         onClick={(event) => setClickOutInside(clickOutInside + 1)}
//         className="  flex flex-wrap justify-center z-50   h-screen max-h-screen w-full object-scale-down  left-0 top-0  items-center fixed backdrop-blur-sm  bg-white/90   outline-none focus:outline"
//       >
//         <div className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap max-h-screen w-full h-6/8 justify-center items-center">
//           <button
//             onClick={() => {
//               Submit("prev"), setclickInside(clickInside + 1);
//             }}
//             className="lg:w-auto xl:w-auto 2xl:w-auto w-full  -mx-2  p-8 lg:py-20 xl:py-20 2xl:py-20 hover:bg-cyan-500 bg-cyan-300 rounded-xl active:bg-red-300 active:transition-none transition-colors duration-800 ease-in"
//           >
//             <AiOutlineVerticalLeft
//               size={30}
//               className="flex text-white w-full "
//             />
//           </button>
//           <div
//             onClick={(event) => {
//               setFullScreen(false);
//             }}
//             className="flex h-6/8 w-full  justify-center  p-1 m-1 z-50 "
//           >
//             <Image
//               loading="lazy"
//               objectFit="fill"
//               src={`https://api.bugtech.ir/api/image?x=800&y=800&q=50&t=jpeg&path=${productData.main.images[tab]}`}
//               placeholder="blur"
//               blurDataURL={`https://api.bugtech.ir/api/image?x=${80}&y=${80}&q=50&t=jpeg&path=${
//                 productData.main.images[tab]
//               }`}
//               alt={productData?.main?.title_fa ?? ""}
//               title={productData?.main?.title_fa ?? ""}
//               width="800"
//               height="800"
//             />
//           </div>

//           <button
//             onClick={() => {
//               Submit("next"), setclickInside(clickInside + 1);
//             }}
//             className="lg:w-auto xl:w-auto2xl:w-auto w-full  -mx-2  p-8  lg:py-20 xl:py-20 2xl:py-20 hover:bg-cyan-500 bg-cyan-300 rounded-xl active:bg-red-300 active:transition-none transition-colors duration-800 ease-in"
//           >
//             <AiOutlineVerticalRight
//               size={30}
//               className="flex text-white w-full "
//             />
//           </button>
//         </div>
//         <div className="flex w-auto z-50 justify-center h-24 bg-white/30 p-6 items-center rounded-full">
//           {img?.map((arr, index) => {
//             return index - tab < 15 && tab - index < 15 ? (
//               <>
//                 <div
//                   onClick={() => setTab(index)}
//                   key={index}
//                   className={`flex p-1 rounded-xl h-4 w-4 border  m-1 ${
//                     index == tab ? "bg-cyan-500" : "bg-gray-100"
//                   }`}
//                 ></div>
//               </>
//             ) : (
//               <></>
//             );
//           })}
//         </div>
//         <button
//           onClick={(event) => setClickOutInside(clickOutInside + 1)}
//           className="active:bg-red-300 active:transition-none transition-colors duration-800 ease-in p-2 px-5 bg-red-500/30"
//         >
//           EXIT
//         </button>
//       </div>
//     </>
//   );
// };
