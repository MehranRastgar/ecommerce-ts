import axios, { AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { imageAddress, Search } from "../../pages";
import { selectDeviceType } from "../../src/store/slices/themeSlice";
import { Color, GetProductsArray, MinifyProduct } from "../../src/types/types";
import ProductCardOne from "../product/ProductCardOne";
import Link from "next/link";
import Image from "next/image";
import imageLoader from "../../src/imageLoader";
import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  selectSettings,
  selectSettingsStatus,
} from "../../src/store/slices/settingsSlice";
import { Settings } from "../../src/types/types";
import { useAppSelector } from "../../src/store/hooks";

// const getBody1: Search = {
//   perPage: "10",
//   page: "1",
//   category: { "category.L1": "laptop" },
//   sort: "price",
//   sortType: undefined,
// };

const fetcher = (URL: string, searchBody: Search) =>
  axios
    .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}${URL}`, searchBody)
    .then((res: AxiosResponse) => {
      type MinifyProducts = MinifyProduct[];
      const GetProductsArray: GetProductsArray = {
        info: undefined,
        results: [],
      };
      GetProductsArray.results = res.data;
      const minifyProducts: MinifyProducts = [];
      // console.log("mibni", res.data, GetProductsArray);

      GetProductsArray?.results?.map((product) => {
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
      // console.log("mibni", minifyProducts);
      return minifyProducts;
    });

const config: SWRConfiguration = {
  fallbackData: "fallback",
  revalidateOnMount: false,
  // ...
};

import { BsArrowLeft } from "react-icons/bs";

export default function ProductSliderOne({ setting }: { setting: any }) {
  const { data } = useSWR<MinifyProduct[]>(
    [`/pro/psearch`, setting?.getOption],
    (url) => fetcher(url, setting?.getOption)
  );
  const settings = useAppSelector(selectSettings);
  const settingsStatus = useAppSelector(selectSettingsStatus);
  // const [minifyProducts, setMinifyProducts] = useState<MinifyProduct[]>([]);
  useEffect(() => {
    // console.log("data::", data);
    // getProductData({ setMinifyProducts, data });
  }, [data]);
  return (
    <div className="product-slider-one-container">
      {/* <div className="product-slider-one-items flex"> */}
      <ScrollContainer className="scroll-container product-slider-one-items overflow-y-hidden">
        <div className="bg-transparent font-Vazir-Bold w-full min-w-[140px] m-4 rounded-lg flex flex-wrap items-center justify-center p-2">
          <div className="text-[20px] text-gray-300 text-center">
            {setting?.name}
          </div>
          <Link
            className="flex flex-wrap items-center p-6  rounded-lg"
            href={setting?.url ?? "/"}
          >
            <div className="w-full text-[16px] text-white text-center">
              {setting?.span}
            </div>
            <div className="flex w-full justify-center items-center text-[16px] text-red-600 ">
              <BsArrowLeft size={20} color={"rgb(255 255 255)"} />
            </div>
          </Link>
        </div>
        {data !== undefined ? (
          data?.map((minifyProduct: MinifyProduct, index) => (
            <>
              <ProductSliderItem minifyProduct={minifyProduct} />
            </>
          ))
        ) : (
          <></>
        )}
        <div className=" font-Vazir-Bold w-full min-w-[200px] m-1 mx-2 flex items-center justify-center">
          <Link
            className="flex items-center p-6 bg-white rounded-lg"
            href={setting?.url ?? "/"}
          >
            <div className="mx-2">مشاهده همه</div>
            <BsArrowLeft size={15} />
          </Link>
        </div>
      </ScrollContainer>
      {/* </div> */}
    </div>
  );
}

const tooman = "تومان";
const tamas = "جهت اطلاع از قیمت تماس بگیرید";
export function ProductSliderItem({
  minifyProduct,
}: {
  minifyProduct: MinifyProduct | undefined;
}) {
  const devType = useSelector(selectDeviceType);
  const [colorState, setColorState] = useState<string[]>();
  let price = (
    minifyProduct?.Price?.selling_price
      ? minifyProduct?.Price?.selling_price / 10
      : 0
  ).toLocaleString();
  let delPrice = (
    minifyProduct?.Price?.rrp_price ? minifyProduct?.Price?.rrp_price / 10 : 0
  ).toLocaleString();

  function setColor(colors: Color[]): string[] {
    var colorsStyle: string[] = [];

    colors.map((color) => {
      colorsStyle.push(color.hex_code);
    });
    colorsStyle = [...new Set(colorsStyle)];
    return colorsStyle;
  }

  useEffect(() => {
    if (minifyProduct?.color?.length) {
      setColorState(setColor(minifyProduct?.color));
    }
  }, []);
  return (
    <div
      className={`w-full   m-1 mx-2 ${
        devType === "mobile" ? "min-w-[120px] " : "min-w-[200px]"
      }`}
    >
      <Link
        key={"click-on-product"}
        href={`products/${minifyProduct?._id}/${(
          minifyProduct?.title_fa ?? minifyProduct?.sku
        )?.replaceAll(" ", "-")}`}
        className=" flex  flex-wrap justify-center items-start 	w-full m-2"
      >
        <div
          className={`flex flex-wrap justify-center w-full p-0 border hover:border-gray-300 card `}
        >
          <div className="flex flex-wrap  justify-center m-2">
            <Image
              className=" rounded-xl"
              loader={imageLoader}
              unoptimized
              loading="eager"
              src={imageAddress(
                minifyProduct?.image,
                devType === "mobile" ? 100 : 200,
                devType === "mobile" ? 100 : 200,
                80,
                "webp",
                undefined
              )}
              alt={minifyProduct?.title_en ?? "not-present"}
              width={devType === "mobile" ? 75 : 150}
              height={devType === "mobile" ? 75 : 150}
            />
          </div>

          <h2 className="flex font-Vazir-Medium font-bold justify-center overflow-hidden  text-black text-sm   text-rtl mx-0 -my-1 items-top text-center tracking-normal  h-10 p-1     ">
            {minifyProduct?.title_fa ?? ""}
          </h2>

          {!(price == "0" || delPrice == "0") ? (
            <>
              <div className="text-red-500 flex w-full line-through font-Vazir-Medium text-xs font-thin   flex-wrap justify-center ">
                {delPrice}
              </div>
              <div className="text-green-500 flex w-full font-Vazir-Medium font-bold text-md flex-wrap justify-center ">
                {price}
              </div>
              <div className="text-blackout-black text-xs flex w-full flex-wrap font-Vazir-Medium font-bold justify-center">
                {price ? tooman : "--"}
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="text-blackout-red text-lg flex w-full font-bold font-Vazir-Medium  flex-wrap justify-center ">
                <br></br>
                ناموجود
              </div>
            </>
          )}

          {/* <div className="p-2">
          <div className="flex w-full flex-wrap justify-center text-center my-1 border-b font-Vazir-Medium ">
            {minifyProduct?.primaryAttribute?.title
              ?.replace("-", " ")
              ?.replace("-", " ")
              ?.replace("-", " ") +
              "   :   " +
              minifyProduct?.primaryAttribute?.values}
          </div>
        </div> */}
        </div>
      </Link>
    </div>
  );
}
