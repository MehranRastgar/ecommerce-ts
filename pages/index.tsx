import type { GetStaticProps } from "next";
import Head from "next/head";
import axios from "axios";
import type { AxiosResponse } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
// import styles from '../styles/Home.module.css'
import { GetProductsArray, MinifyProduct } from "../src/types/types";
import imageLoader from "../src/imageLoader";
import Link from "next/link";
import Layout from "../src/components/Layout";
import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import ProductCardOne from "../src/components/product/ProductCardOne";
import { SwiperItemType } from "../src/components/swiper/SwiperItem";
import Swiper from "../src/components/swiper/Swiper";
import ProductCategoriesContainer from "../src/components/products/ProductCategoriesContainer";
import ProductSliderOne from "../src/components/products/ProductSliderOne";
import CardPromotionOne from "../src/components/Cards/CardPromotionOne";
import { ToastContainer, toast } from "react-toastify";
import dynamic from "next/dynamic";

import Carousel from "src/components/carousel";
import Benefits from "src/components/Benefits";
const Offers = dynamic(() => import("src/components/Offers/Offers"));
const Category = dynamic(() => import("src/components/category/Category"));
const Newest = dynamic(() => import("src/components/newest/Newest"));

// import { use } from 'react';
const getLaptop: Search = {
  perPage: "12",
  page: "1",
  category: { "category.L1": "laptop" },
  sort: "price",
  sortType: "desc",
};
const getLaptop2: Search = {
  perPage: "12",
  page: "2",
  category: { "category.L1": "laptop", "category.L2": "Gaming" },
  sort: "price",
  sortType: undefined,
};
const getMobile: Search = {
  perPage: "12",
  page: "2",
  category: { "category.L1": "mobile" },
  sort: "price",
  sortType: undefined,
};
// async function getData() {
//   // const res = await fetch('...');
//   // const name: string = await res.json();
//   // return name;

//   const getBody: Search = {
//     perPage: "20",
//     page: "1",
//     category: { "category.L1": "laptop", "category.L2": "Gaming" },
//     sort: "price",
//   };

//   try {
//     const response: AxiosResponse = await axios.post(
//       `${process.env.BASE_API_URL}/pro/psearch`,
//       getBody
//     );

//     const dataProduct: GetProductsArray = {
//       info: null,
//       results: response.data,
//     };

//     type MinifyProducts = MinifyProduct[];

//     const minifyProducts: MinifyProducts = [];

//     dataProduct.results?.map((product) => {
//       const minifyProduct: MinifyProduct = {
//         Price: product.variants[product.primary_variant].price,
//         _id: product._id,
//         image: product.main.images[0],
//         imid: product.imid,
//         title_en: product.main.title_en,
//         title_fa: product.main.title_fa,
//         sku: product.main.sku,
//       };
//       minifyProducts.push(minifyProduct);
//     });
//     //  console.log(minifyProducts)
//     return {
//        minifyProducts,
//     };
//   } catch (err) {
//     return {
//         minifyProducts: undefined,
//     };
//   }

// }
const items = [
  {
    imageSrc: "slider-a/1.jpg",
    imageAlt: "گوشی موبایل",
    url: "/search?category=mobile",
  },
  {
    imageSrc: "slider-a/2.jpg",
    imageAlt: "ساعت هوشمند",
    url: "/search?category=watch-wearable",
  },
  {
    imageSrc: "slider-a/3.jpg",
    imageAlt: "Some flowers",
    url: "/search?brands=lenovo",
  },
  {
    imageSrc: "slider-a/4.jpg",
    imageAlt: "An egyptian wall painting",
    url: "/search?brands=samsung",
  },
  {
    imageSrc: "slider-a/5.jpg",
    imageAlt: "laptop",
    url: "/search?category=laptop",
  },
];

// const config: SWRConfiguration = {
//   fallbackData: "fallback",
//   revalidateOnMount: false,
//   // ...
// };
export function imageAddress(
  src: string | undefined | null,
  w: number | undefined,
  h: number | undefined,
  quality: 50 | 80 | 90 | 100,
  format: "webp" | "jpeg" | "jpg" | "png" | "svg",
  prefix: "public" | undefined
): string {
  if (src)
    // return `${process.env.NEXT_PUBLIC_IMAGE_BASE}?x=${w}&y=${h}&q=${quality}&t=${format}&path=${src}`;
    return (
      `/api/image?x=${w}&y=${h}&q=${quality}&t=${format}&path=${src}` +
      `${prefix === "public" ? "&prefix=public" : ""}`
    );
  else return `/Asset13.png`;
}

const fetcher = (URL: string) => axios.get(URL).then((res) => res.data);

function Home({
  minifyProducts,
}: {
  minifyProducts: MinifyProduct[] | undefined;
}) {
  const [images, setimages] = useState<any>([]);

  // const name = use(getData());
  // const { data, err } = useSWR<string[]>("/api/hello", fetcher, config);

  // useEffect(() => {
  // if (minifyProducts?.length !== undefined) {
  //   var array: any = [];
  //   minifyProducts?.map((product) => {
  //     array.push({
  //       imageSrc: product.image,
  //       imageAlt: product.title_en,
  //     });
  //   });
  //   setimages(array);
  // }
  // console.log(data);
  // }, []);
  const notify = () => toast("Wow so easy!");

  return (
    <>
      {" "}
      <Head>
        <title>Inomal</title>
        <meta name="description" content="سایت فروش لوازم دیجیتال" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel />
      <Benefits />
      <Offers />
      <Category />
      <Newest />
    </>
  );
}

export type Search = {
  perPage: string;
  page: string;
  category: object;
  sort: string;
  sortType: string | undefined;
};

export const getStaticProps: GetStaticProps = async () => {
  const getBody: Search = {
    perPage: "25",
    page: "1",
    category: { "category.L1": "laptop" },
    sort: "price",
    sortType: undefined,
  };

  try {
    const response: AxiosResponse = await axios.post(
      `${process.env.BASE_API_URL}/pro/psearch`,
      getBody
    );

    const dataProduct: GetProductsArray = {
      info: null,
      results: response.data,
    };

    type MinifyProducts = MinifyProduct[];

    const minifyProducts: MinifyProducts = [];

    dataProduct.results?.map((product) => {
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
      product.variants.map((item) => {
        if (minifyProduct.color) minifyProduct.color.push(item.color);
      });
      minifyProducts.push(minifyProduct);
    });
    //  console.log(minifyProducts)
    return {
      props: {
        // products: dataProduct.results,
        minifyProducts: minifyProducts,
      },
    };
  } catch (err) {
    return {
      props: {
        minifyProducts: undefined,
      },
    };
  }
};

// Home.getLayout = function getLayout(page: typeof Home) {
//   return <Layout>{page}</Layout>;
// };

export default Home;

function Noway() {
  return (
    <div className="flex flex-wrap justify-center  w-full">
      {/* <button onClick={notify}>Notify!</button> */}

      <div className="flex md:w-[100%] w-[90%] rounded-xl md:rounded-none z-[1] overflow-hidden justify-center md:my-0 my-14">
        <Swiper items={items} />
      </div>
      <div className="MainCategoryCard overflow-hidden mx-auto flex flex-wrap py-6 md:py-8 w-full justify-center">
        <h2 className="2xl lg:text-2xl md:text-xl font-Vazir-Medium">
          خرید بر اساس دسته‌ بندی
        </h2>
        <ProductCategoriesContainer />
      </div>
      <div className="flex flex-wrap w-full mx-2 my-6 bg-ino-white overflow-hidden justify-center">
        {/* {minifyProducts?.map((minifyProduct: MinifyProduct) => (
           <>
             <ProductCardOne minifyProduct={minifyProduct} />
           </>
         ))} */}
        <ProductSliderOne
          setting={{
            url: "/search?category=laptop",
            name: "فروش ویژه لپتاپ",
            span: "مشاهده این دسته",
            getOption: getLaptop,
            color: 1,
          }}
        />
        <div className="h-10 w-full p-2"></div>
        {/* <CardPromotionOne
           ImageSrc="/cardOne/logitech"
           cardName="Logitech promotion"
           Url="/search?brand=logitech"
         />
         <CardPromotionOne
           ImageSrc="/cardOne/logitech2"
           Url="/search?brand=logitech"
           cardName="Logitech promotion"
         />
         <CardPromotionOne
           ImageSrc="/cardOne/logitech2"
           cardName="Logitech promotion"
           Url="/search?brand=logitech"
         />
         <CardPromotionOne
           ImageSrc="/cardOne/logitech"
           cardName="Logitech promotion"
           Url="/search?brand=logitech"
         /> */}
        <div className="h-10 w-full p-2"></div>
        <ProductSliderOne
          setting={{
            url: "/search?category=laptop",
            name: " ویژه موبایل",
            span: "مشاهده این دسته",
            getOption: getMobile,
            color: 2,
          }}
        />
        <div className="h-10 w-full p-2"></div>
        <ProductSliderOne
          setting={{
            url: "/search?category=laptop",
            name: "لپتاپ گیمینگ",
            span: "مشاهده این دسته",
            getOption: getLaptop2,
            color: 3,
          }}
        />
      </div>
    </div>
  );
}
