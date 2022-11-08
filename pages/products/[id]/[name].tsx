import Layout from "../../../components/Layout";
import { Product } from "../../../src/types/types";
import { GetServerSideProps } from "next";
import mongoose from "mongoose";
import React, { useState, useEffect, useRef } from "react";
import ProductModel from "../../../src/models/ProProduct";
import ProductHeadComponent from "../../../components/ProductPage/ProductHeadComponent";
import ProductInfoSection, {
  CartSection,
} from "../../../components/ProductPage/ProductInfoSection";
import ProductImageComponent from "../../../components/ProductPage/ProductImageComponent";
import Link from "next/link";
import ProductAttributeComponent from "../../../components/ProductPage/ProductAttributeComponent";
import ProductSliderOne from "../../../components/products/ProductSliderOne";
import { Search } from "../..";

export default function ProductPage({ product }: { product: Product | null }) {
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
      <div className="flex flex-wrap w-full min-w-screen h-auto justify-start ">
        <div className="flex w-full md:w-2/6  items-start justify-center p-2 ">
          <ProductImageComponent productData={product} />
        </div>
        <div className="flex flex-wrap h-auto items-start justify-center w-full md:w-4/6  p-2">
          <Title name={product.main.title_fa} />
          <ProductInfoSection product={product} />
        </div>
        <div className="flex w-full  min-w-screen justify-center">
          <ProductDescriptionComponent product={product} />
        </div>
        <div className="flex w-full   min-w-screen justify-center">
          <ProductAttributeComponent product={product} />
        </div>
        <div className="flex w-full justify-start mt-[150px]">
          <ProductRelativeComponent product={product} />
        </div>
      </div>
    </>
  ) : (
    <div>product not exist</div>
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
    <div className="flex flex-wrap text-center my-8 w-full justify-center">
      <h3 className="h2 font-Vazir-Bold w-full my-8">درباره محصول</h3>
      <div
        id="description"
        className="font-Vazir-Medium md:w-8/12 w-full text-justify "
      >
        {product.review.description ?? product.main.long_desc}
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
          url: `/category/${product?.category?.L1}`,
          name: "کالاهای مشابه",
          span: "مشاهده ...",
          getOption: getLaptop,
        }}
      />
    </div>
  );
}

// ProductPage.getLayout = function getLayout(page: typeof ProductPage) {
//   return <Layout>{page}</Layout>;
// };

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
