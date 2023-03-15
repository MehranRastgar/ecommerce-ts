import Layout from "../../../src/components/Layout";
import { Product } from "../../../src/types/types";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import React, { useState, useEffect, useRef } from "react";
import ProductModel from "../../../src/models/ProProduct";
import ProductHeadComponent from "../../../src/components/ProductPage/ProductHeadComponent";
import ProductInfoSection, {
  CartSection,
} from "../../../src/components/ProductPage/ProductInfoSection";
import ProductImageComponent from "../../../src/components/ProductPage/ProductImageComponent";
import Link from "next/link";
import ProductAttributeComponent from "../../../src/components/ProductPage/ProductAttributeComponent";
import ProductSliderOne from "../../../src/components/products/ProductSliderOne";
import { imageAddress, Search } from "../..";
import Image from "next/image";
import imageLoader from "../../../src/imageLoader";

export default function ProductPage({ product }: { product: Product | null }) {
  const [pro, setPro] = useState<Product | null>(null);

  useEffect(() => {
    if (pro === null) {
      setPro(product);
      // console.log("one time");
    }
    // console.log("pro product in use effect", pro);
  }, [pro, product]);

  return product !== null ? (
    <>
      <Layout>
        <ProductHeadComponent product={product} />
        <div className="flex flex-wrap w-full min-w-screen h-auto justify-start overflow-hidden">
          <div className="flex w-full lg:w-1/3 md:w-1/2  items-start justify-center p-2 ">
            <ProductImageComponent productData={product} />
          </div>
          <div className="flex flex-wrap h-auto items-start justify-center w-full md:w-1/2 lg:w-2/3  p-2">
            <Title name={product.main.title_fa} />
            <ProductInfoSection product={product} />
          </div>
          <div className="flex w-full min-w-screen justify-center">
            <ProductDescriptionComponent product={product} />
          </div>

          <div className="flex w-full min-w-screen justify-center">
            <ProductAttributeComponent product={product} />
          </div>
          <div className="flex w-full justify-start mt-[150px]">
            <ProductRelativeComponent product={product} />
          </div>
        </div>
        <div className="flex fixed top-0 md:top-[60px] left-0 w-full z-[50]">
          <MobileTopViewComponent product={product} />
        </div>
      </Layout>
    </>
  ) : (
    <Layout>
      <div>product not exist</div>{" "}
    </Layout>
  );
}
var scrollBefore = 0;

function MobileTopViewComponent({ product }: { product: Product }) {
  const [hidden, setHidden] = useState<number>(0);

  //================================================
  function scrollFunction() {
    const numberOfImages: number = product.main.images.length;
    var offsetY: number = window.pageYOffset;
    if (offsetY > 500) {
      const y: number = offsetY - 499;
      const x = y / 300;
      var role = Number(x.toFixed(0)) + 1;
      if (role > numberOfImages) {
        role = role % numberOfImages;
      }

      setHidden(role);
    } else {
      setHidden(0);
    }

    if (scrollBefore - offsetY < 0) {
      // setHidden(1);
    } else {
      setHidden(0);
    }
    scrollBefore = window.pageYOffset;
  }
  //================================================

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };

    // configPage();
  }, []);

  return (
    <>
      {" "}
      <div
        className={`w-full md:h-[30px] md:justify-center h-24 backdrop-filter backdrop-blur-sm  bg-white/80  ${
          hidden === 0 ? "hidden" : "flex"
        }`}
      >
        <div className="flex w-3/4 text-center p-2 text-black font-Vazir-Bold">
          {product.main.title_fa}
        </div>

        <div className="md:hidden flex w-1/4">
          <Image
            className="flex justify-center w-[500px] h-auto  p-1"
            loader={imageLoader}
            src={imageAddress(
              product?.main?.images?.[hidden - 1],
              150,
              150,
              90,
              "webp",
              undefined
            )}
            placeholder="blur"
            blurDataURL="/Asset13.png"
            loading="lazy"
            alt={product?.main?.title_en ?? "noname"}
            width={500}
            height={500}
          />
        </div>
      </div>
    </>
  );
}

function Title({ name }: { name: string }) {
  return (
    <div className="flex w-full h-[100px] text-start items-end py-2 ">
      <div className="flex text-[20px] font-Vazir-Bold ">{name}</div>
    </div>
  );
}

function ClickBar({ product }: { product: Product }) {
  return <div className="w-[40px] h-full bg-transparent "></div>;
}

export function ProductPriceComponent({ product }: { product: Product }) {}
export function ProductDescriptionComponent({ product }: { product: Product }) {
  return (
    <div
      id="about-product"
      className="flex flex-wrap text-center my-8 max-w-[1200px] md:w-[85%] w-11/12 justify-center border rounded-xl p-4 shadow-lg"
    >
      <h3 className="h2 font-Vazir-Bold w-full my-8 leading-loose	">
        درباره محصول
      </h3>
      <div
        id="description"
        className="font-Vazir-Medium  w-full text-justify leading-loose"
      >
        {product?.review?.description ?? product?.main?.long_desc}
      </div>
    </div>
  );
}
export function ProductRelativeComponent({ product }: { product: Product }) {
  const getLaptop: Search = {
    perPage: "15",
    page: "1",
    category: { "category.L1": product?.category?.L1 },
    sort: "price",
    sortType: "desc",
  };
  return (
    <div id="relative-products" className="flex justify-center w-full">
      <ProductSliderOne
        setting={{
          url: `/search?category=${product?.category?.L1}`,
          name: "کالاهای مشابه",
          span: "مشاهده ...",
          getOption: getLaptop,
        }}
      />
    </div>
  );
}

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
