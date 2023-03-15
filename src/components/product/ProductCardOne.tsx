import Link from "next/link";
import Image from "next/image";
import { imageAddress } from "../../../pages/index";
import imageLoader from "../../imageLoader";
import { Color, MinifyProduct } from "../../types/types";
import { useSelector } from "react-redux";
import { selectDeviceType } from "../../store/slices/themeSlice";
import { useEffect, useRef, useState } from "react";
// import reactQuer
const tooman = "تومان";
const tamas = "جهت اطلاع از قیمت تماس بگیرید";

export default function ProductCardOne({
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
    <>
      <div className="flex flex-wrap w-full justify-center items-center  border-b-slate-300 p-2 font-Vazir-Medium select-none h-auto md:h-[350px] md:w-1/2 lg:w-1/4 xl:w-1/5 2xl:w-1/5 3xl:w-1/5">
        <Link
          href={encodeURI(
            `/products/${minifyProduct?._id}/${(
              minifyProduct?.title_fa ?? minifyProduct?.sku
            )
              ?.replaceAll(" ", "-")
              .replaceAll("/", "-")}`
          )}
          className="w-full border p-2 rounded-lg shadow h-full overflow-hidden md:max-w-[260px] "
        >
          <div className="flex items-start justify-center md:w-4/5 w-full ">
            <div className="hidden md:flex flex-wrap items-start justify-start w-1/5">
              <div className="font-Vazir-Bold text-xs m-2">رنگ</div>
              {colorState?.map((color, index) => (
                <>
                  <div
                    style={{
                      boxShadow: `${color} 0px 5px 15px`,
                      backgroundColor: `${color} `,
                    }}
                    key={index}
                    className="m-2 h-[10px] w-[10px] bg-transparent rounded-full border"
                  ></div>
                </>
              ))}
            </div>
            <div
              key={minifyProduct?._id + "-a"}
              className="md:w-full  justify-center flex flex-wrap h-auto w-1/3"
            >
              <Image
                // style={{
                //   boxShadow: `${minifyProduct?.color?.[0].hex_code} 2px 3px 2px`,
                // }}
                className={`lg:w-[300px] md:w-[200px] w-[100px] h-auto p-1 m-1 rounded-xl`}
                loader={imageLoader}
                quality="80"
                loading="eager"
                unselectable="on"
                draggable="false"
                placeholder="empty"
                src={imageAddress(
                  minifyProduct?.image,
                  300,
                  300,
                  80,
                  "webp",
                  undefined
                )}
                alt={minifyProduct?.title_en ?? "not-present"}
                width={100}
                height={100}
              />
            </div>
            <div className="md:hidden flex flex-wrap w-2/3">
              <div
                key={minifyProduct?._id + "-num3"}
                className="text-md text-ino-gray font-Vazir-Bold items-center text-justify"
              >
                {minifyProduct?.title_fa.toLocaleUpperCase()}
              </div>
              {
                <div
                  key={minifyProduct?._id + "-num4"}
                  className="text-xs mt-2 w-full items-center text-justify text-blackout-black"
                >
                  {minifyProduct?.primaryAttribute.title}
                  <span className="text-gray-400 mx-2">
                    {minifyProduct?.primaryAttribute.values}
                  </span>
                </div>
              }
            </div>
          </div>
          <div className="md:flex-wrap flex w-full">
            <div className="md:hidden flex w-full">
              {colorState?.map((color, index) => (
                <>
                  <div
                    style={{
                      boxShadow: `${color} 0px 5px 15px`,
                      backgroundColor: `${color} `,
                    }}
                    key={index}
                    className="m-2 h-[10px] w-[10px] bg-transparent rounded-full border"
                  ></div>
                  {/* <button
                key={`colo-${index}`}
                type={"button"}
                className={
                  "m-2 h-[15px] w-[15px] border rounded-md " +
                  "bg-[" +
                  color +
                  "]"
                }
              ></button> */}
                </>
              ))}
            </div>
            {minifyProduct?.Price?.selling_price !== undefined &&
            minifyProduct?.Price?.selling_price <
              minifyProduct?.Price?.rrp_price ? (
              <>
                <div className="text-red-500 flex w-full line-through font-Vazir-Medium text-lg font-thin flex-wrap justify-center ">
                  {(minifyProduct?.Price?.rrp_price / 10).toLocaleString()}
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="text-white flex w-full font-Vazir-Medium text-lg font-thin flex-wrap justify-center ">
                  {minifyProduct?.Price?.rrp_price}
                </div>
              </>
            )}
            <div
              key={minifyProduct?._id + "-num2"}
              className="md:justify-center md:w-full md:text-lg flex flex-wrap  md:text-[16px] font-Vazir-Medium "
            >
              {minifyProduct?.Price?.selling_price !== undefined &&
              minifyProduct?.Price?.selling_price > 0 ? (
                <>
                  {(minifyProduct?.Price?.selling_price !== undefined
                    ? minifyProduct?.Price?.selling_price / 10
                    : 0
                  ).toLocaleString()}{" "}
                  <span className="md:mx-2 text-ino-primary font-Vazir-Bold text-[12px]">
                    تومان
                  </span>
                </>
              ) : (
                <>
                  <span className="md:mx-2 text-red-400 text-[12px]">
                    ناموجود
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex w-full mx-0 border-b border-ino-primary"></div>

          <h2 className="hidden md:flex font-Vazir-Medium justify-center overflow-hidden h-[50px] text-black text-xs text-rtl mx-[2px] my-1 items-top text-center tracking-normal  p-[2px]">
            {minifyProduct?.title_fa ?? ""}
          </h2>
          <h3 className=" hidden md:inline-flex font-Vazir-Medium justify-center overflow-hidden h-[50px] text-black text-xs text-rtl mx-[2px] my-1 items-top text-center tracking-normal  p-[2px]">
            <span className="flex mx-1">
              {minifyProduct?.primaryAttribute.title ?? ""}
            </span>
            <span className="flex mx-1">
              {minifyProduct?.primaryAttribute.values ?? ""}
            </span>
          </h3>
        </Link>
      </div>

      {/* <Link
        key={"click-on-product"}
        href={encodeURI(
          `/products/${minifyProduct?._id}/${(
            minifyProduct?.title_fa ?? minifyProduct?.sku
          )
            ?.replaceAll(" ", "-")
            .replaceAll("/", "-")}`
        )}
        className="hidden md:flex min-h-[420px] flex-wrap justify-center items-start max-w-[px] 	w-1/3  md:w-1/2 lg:w-1/4 xl:w-1/5 2xl:w-1/5 3xl:w-1/5 select-none"
      >
        <div
          className={` flex h-full flex-wrap justify-center w-full p-2 border hover:border-gray-300 card `}
        >
          <div className="flex flex-wrap  justify-center m-2">
            <Image
              className="block md:flex w-[300px] rounded-xl  h-auto"
              unoptimized
              loader={imageLoader}
              placeholder="empty"
              loading="eager"
              unselectable="on"
              draggable="false"
              src={imageAddress(
                minifyProduct?.image,
                300,
                300,
                80,
                "webp",
                undefined
              )}
              alt={minifyProduct?.title_en ?? "not-present"}
              width={300}
              height={300}
            />
          </div>

          <h2 className="flex font-Vazir-Medium font-bold justify-center overflow-hidden  text-black text-sm   text-rtl mx-2 my-1 items-top text-center tracking-normal  h-10 p-1     ">
            {minifyProduct?.title_fa ?? ""}
          </h2>

          {!(price == "0" || delPrice == "0") ? (
            <>
              <div className="text-red-500 flex w-full line-through font-Vazir-Medium text-lg font-thin   flex-wrap justify-center ">
                {delPrice}
              </div>
              <div className="text-green-500 flex w-full font-Vazir-Medium font-bold text-lg flex-wrap justify-center ">
                {price}
              </div>
              <div className="text-blackout-black text-lg flex w-full flex-wrap font-Vazir-Medium font-bold justify-center">
                {price ? tooman : "--"}
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="text-blackout-red text-lg flex w-full font-bold font-Vazir-Medium  flex-wrap justify-center ">
                ناموجود
              </div>
            </>
          )}

        </div>
      </Link> */}
    </>
  );
}
