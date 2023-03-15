import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { imageAddress, Search } from "../../../pages";
import { selectDeviceType } from "../../store/slices/themeSlice";
import { Color, GetProductsArray, MinifyProduct } from "../../types/types";
import ProductCardOne from "../product/ProductCardOne";
import Link from "next/link";
import Image from "next/image";
import imageLoader from "../../imageLoader";
import useSWR from "swr";
import type { SWRConfiguration } from "swr";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  selectSettings,
  selectSettingsStatus,
} from "../../store/slices/settingsSlice";
import { Settings } from "../../types/types";
import { useAppSelector } from "../../store/hooks";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const skeletItem: string[] = ["1", "2", "3", "4", "1", "2", "3", "4"];
// const getBody1: Search = {
//   perPage: "10",
//   page: "1",
//   category: { "category.L1": "laptop" },
//   sort: "price",
//   sortType: undefined,
// };

const fetcher = (URL: string, searchBody: Search, config: AxiosRequestConfig) =>
  axios
    .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}${URL}`, searchBody, config)
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

// const config: SWRConfiguration = {
//   fallbackData: "fallback",
//   revalidateOnMount: false,
//   // ...
// };

import { BsArrowLeft } from "react-icons/bs";
import LoadingOne from "../loader/default";
const config: AxiosRequestConfig = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Cache-Control": "no-cache",
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "*/*",
  },
};
export default function ProductSliderOne({ setting }: { setting: any }) {
  const { data } = useSWR<MinifyProduct[]>(
    [`/pro/psearch`, setting?.getOption],
    (url) => fetcher(url, setting?.getOption, config)
  );
  const settings = useAppSelector(selectSettings);
  const settingsStatus = useAppSelector(selectSettingsStatus);
  const style1: string = `product-slider-one-container bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-ino-primary to-ino-darker`;
  const style2: string = `product-slider-one-container bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-ino-hgray to-ino-gray`;
  const style3: string = `product-slider-one-container bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-wipro-darkblue to-wipro-darkpurple`;

  // const [minifyProducts, setMinifyProducts] = useState<MinifyProduct[]>([]);
  useEffect(() => {
    // console.log("data::", data);
    // getProductData({ setMinifyProducts, data });
  }, [data]);
  return (
    <>
      <div
        className={
          setting.color === 1 ? style1 : setting.color === 2 ? style2 : style3
        }
      >
        {/* <div className="product-slider-one-items flex"> */}
        <ScrollContainer
          vertical={false}
          hideScrollbars={false}
          className="scroll-container h-fit product-slider-one-items overflow-y-hidden "
        >
          <div className="bg-transparent h-fit font-Vazir-Bold w-full min-w-[140px] m-4 rounded-lg flex flex-wrap items-center justify-center p-2">
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
          {/* {data === undefined ? (
            <>
              <div className={`w-full m-1 mx-2 min-w-[120px] md:min-w-[200px]`}>
                <LoadingOne />
              </div>
            </>
          ) : (
            ""
          )} */}
          {data !== undefined ? (
            data?.map((minifyProduct: MinifyProduct, index) => (
              <>
                <ProductSliderItem minifyProduct={minifyProduct} />
              </>
            ))
          ) : (
            <>
              {skeletItem.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="flex items-start justify-center mt-6 "
                  >
                    <div className="-translate-x-[90px] opacity-30">
                      <LoadingOne />
                    </div>
                    <Stack spacing={1}>
                      {/* For variant="text", adjust the height via font-size */}
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={100}
                      />
                      {/* For other variants, adjust the size with `width` and `height` */}
                      <Skeleton variant="rounded" width={100} height={20} />
                      <Skeleton variant="rounded" width={100} height={20} />
                    </Stack>
                  </div>
                </>
              ))}
            </>
          )}
          <div className=" font-Vazir-Bold w-full min-w-[200px] m-1 mx-2 flex items-center justify-center">
            <Link
              className="flex items-center p-6 bg-ino-white rounded-lg"
              href={setting?.url ?? "/"}
            >
              <div className="mx-2">مشاهده همه</div>
              <BsArrowLeft size={15} />
            </Link>
          </div>
        </ScrollContainer>
        {/* </div> */}
      </div>
    </>
  );
}

const tooman = "تومان";
const tamas = "جهت اطلاع از قیمت تماس بگیرید";
export function ProductSliderItem({
  minifyProduct,
}: {
  minifyProduct: MinifyProduct | undefined;
}) {
  // const devType = useSelector(selectDeviceType);
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
      colorsStyle.push(color?.hex_code);
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
    <div className={`w-full m-1 mx-2 min-w-[120px] md:min-w-[150px]`}>
      <Link
        key={"click-on-product"}
        href={`/products/${minifyProduct?._id}/${(
          minifyProduct?.title_fa ?? minifyProduct?.sku
        )
          ?.replaceAll(" ", "-")
          .replaceAll("/", "-")}`}
        className=" flex  flex-wrap justify-center items-start 	w-full m-2"
      >
        <div
          className={`flex flex-wrap justify-center w-full p-0 border hover:border-gray-300 card `}
        >
          <div className="flex flex-wrap  justify-center ">
            <Image
              className="md:w-[100px] w-[100px] h-auto rounded-xl"
              loader={imageLoader}
              loading="eager"
              src={imageAddress(
                minifyProduct?.image,
                200,
                200,
                80,
                "webp",
                undefined
              )}
              alt={minifyProduct?.title_en ?? "not-present"}
              width={200}
              height={200}
            />
          </div>

          <h2 className="flex font-Vazir-Medium font-bold justify-center overflow-hidden  text-black text-[10px]   text-rtl mx-0 -my-1 items-top text-center tracking-normal  h-16 p-1     ">
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
