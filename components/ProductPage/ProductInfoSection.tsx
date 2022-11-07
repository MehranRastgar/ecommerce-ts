import { useState } from "react";
import {
  FaChevronCircleDown,
  FaCircle,
  FaRegCheckCircle,
} from "react-icons/fa";
import { GoDiffAdded } from "react-icons/go";
import ScrollContainer from "react-indiana-drag-scroll";
import { Product } from "../../src/types/types";
import Link from "next/link";

export default function ProductInfoSection({ product }: { product: Product }) {
  const [variantNumber, setVariantNumber] = useState<number>(
    product.primary_variant
  );

  return (
    <div className="flex justify-start w-full h-full mt-4">
      <div className="flex flex-wrap max-w-3xl overflow-hidden h-fit">
        <VariantSection
          variantNumber={variantNumber}
          setVariantNumber={setVariantNumber}
          product={product}
        />
        <ProductAttributeComponentReview product={product} />
      </div>
      <div className="flex w-28"></div>
      <CartSection variantNumber={variantNumber} product={product} />
    </div>
  );
}

export function CartSection({
  product,
  variantNumber,
}: {
  product: Product;
  variantNumber: any;
}) {
  const [mouseOverbutton, setMouseOverbutton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-wrap h-full justify-center p-4 max-h-[400px] w-1/4 border rounded-xl m-2 font-Vazir-Medium text-blackout-black bg-gray-100 justify-self-end overflow-hidden">
      <ul className="w-full">
        <li>گارانتی :</li>
        <li>{product?.variants?.[variantNumber].warranty}</li>
      </ul>
      <ul className="flex w-full">
        <li className="px-2">رنگ :</li>
        <li className="px-2 flex">
          {product?.variants?.[variantNumber].color.title}
          <div className="w-fit h-fit border-black p-1 border rounded-full mx-2">
            {" "}
            <FaCircle
              size={20}
              color={`${product?.variants?.[variantNumber].color.hex_code}`}
            />
          </div>
        </li>
      </ul>
      <div className="flex w-full "></div>
      <ul className="flex w-full h-fit min-w-[300px] justify-center text-center font-Vazir-Bold">
        <li className="px-2">
          {(
            product?.variants?.[variantNumber ?? 0].price.rrp_price / 10
          ).toLocaleString()}{" "}
        </li>
        <li className="px-2">تومان</li>
      </ul>
      <ul className="h-fit ">
        <button
          onMouseLeave={(event) => {
            setMouseOverbutton(false);
          }}
          onMouseOver={(event) => {
            setMouseOverbutton(true);
          }}
          onClick={(event) => {
            //setActive(true)
            //AddToCart();
          }}
          className={`flex items-center transition-all duration-100 font-bold font-Vazirmatn  hover:bg-cyan-300   bg-cyan-400 focus:ring-4 focus:outline-none shadow-lg shadow-cyan-500/50 rounded-lg text-md px-5 p-2 m-2 text-center ${
            mouseOverbutton ? " text-red-500 mx-3" : "text-white"
          }`}
        >
          <GoDiffAdded
            size={20}
            className={`fle  ${
              mouseOverbutton
                ? "rotate-45 text-red-500 mx-3"
                : "mx-1  text-blackout-white"
            } transition-all duration-100 `}
          ></GoDiffAdded>
          {!isLoading ? "به سبد" : loadingSvg}
        </button>
      </ul>
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
      {/* <ScrollContainer className="scroll-container product-slider-one-items overflow-y-hidden"> */}
      <div className="overflow-y-hidden border rounded-xl">
        <ScrollContainer
          hideScrollbars={false}
          className="flex scrollbar-for-slider max-w-[600px] min-w-[600px] w-fit select-none max-h-[400px] overflow-x-auto  p-2 text-[12px]"
        >
          {product?.variants?.map((variant, index) => (
            <>
              <div className="flex flex-wrap w-1/3 p-2">
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

                  <div className="flex mx-2 items-center justify-end p-2 text-[12px]">
                    {variant.color.title}
                    <div
                      className={
                        "w-fit h-fit border-gray-600 p-1  rounded-full mx-2 bg-gray-200 " +
                        `${index === variantNumber ? "border " : ""}`
                      }
                    >
                      {index === variantNumber ? (
                        <FaCircle
                          size={25}
                          color={`${variant.color.hex_code}`}
                        />
                      ) : (
                        <FaCircle
                          size={25}
                          color={`${variant.color.hex_code}`}
                        />
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
        </ScrollContainer>
      </div>
    </div>
  );
}
function ProductAttributeComponentReview({ product }: { product: Product }) {
  return (
    <>
      <div className="flex flex-wrap text-justify w-full h-fit font-Vazir-Medium mt-14 select-none">
        <div className="flex text-justify w-full font-Vazir-Medium">
          <div className="flex text-justify w-fit p-2">
            {product.attributes[0].title}
          </div>
          <div className="flex text-justify w-fit p-2">
            {product.attributes[0].values}
          </div>
        </div>
        <div className="flex text-justify w-full font-Vazir-Medium">
          <div className="flex text-justify w-fit p-2">
            {product.attributes[1].title}
          </div>
          <div className="flex text-justify w-fit p-2">
            {product.attributes[1].values}
          </div>
        </div>
        <div className="flex text-justify w-full font-Vazir-Medium">
          <div className="flex text-justify w-fit p-2">
            {product.attributes[2].title}
          </div>
          <div className="flex text-justify w-fit p-2">
            {product.attributes[2].values}
          </div>
        </div>
        <a href={`#espicification`}>
          <button className="flex bg-white border rounded-xl px-6 py-2 text-blue-600 items-center">
            <div className="mx-2">مشخصات فنی</div>
            <FaChevronCircleDown />
          </button>
        </a>
      </div>
    </>
  );
}

const loadingSvg = (
  <svg
    role="status"
    className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-red-600 fill-cyan-500"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
