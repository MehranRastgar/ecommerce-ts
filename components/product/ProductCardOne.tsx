import Link from "next/link";
import Image from "next/image";
import { imageAddress } from "../../pages/index";
import imageLoader from "../../src/imageLoader";
import { Color, MinifyProduct } from "../../src/types/types";
import { useSelector } from "react-redux";
import { selectDeviceType } from "../../src/store/slices/themeSlice";
import { useEffect, useState } from "react";

export default function ProductCardOne({
  minifyProduct,
}: {
  minifyProduct: MinifyProduct | undefined;
}) {
  const devType = useSelector(selectDeviceType);
  const [colorState, setColorState] = useState<string[]>();

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
  return devType === "mobile" ? (
    <Link
      className="flex flex-wrap w-full items-center border-b border-b-slate-300 p-2 mt-0 m-4 font-Vazir-Medium"
      href={`products/${minifyProduct?._id}/${(
        minifyProduct?.title_fa ?? minifyProduct?.sku
      )?.replaceAll(" ", "-")}`}
    >
      <div className="flex w-full items-center">
        <div key={minifyProduct?._id + "-a"} className="flex flex-wrap w-1/3">
          <Image
            className=" rounded-xl"
            loader={imageLoader}
            quality="80"
            // unoptimized
            loading="eager"
            placeholder="empty"
            src={imageAddress(minifyProduct?.image, 150, 150, 80, "webp")}
            alt={minifyProduct?.title_en ?? "not-present"}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-wrap w-2/3">
          <div
            key={minifyProduct?._id + "-num3"}
            className="text-xs font-Vazir-Bold  items-center text-justify"
          >
            {minifyProduct?.title_fa.toLocaleUpperCase()}
          </div>
          {
            <div
              key={minifyProduct?._id + "-num3"}
              className="text-xs mt-2  items-center text-justify text-blackout-black"
            >
              {minifyProduct?.primaryAttribute.title}
              <span className="text-gray-400 mx-2">
                {minifyProduct?.primaryAttribute.values}
              </span>
            </div>
          }
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex w-full">
          {colorState?.map((color, index) => (
            <>
              <input
                key={index}
                type={"color"}
                disabled
                className="m-2 h-[20px] w-[15px] bg-transparent "
                value={color}
              ></input>
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
        <div
          key={minifyProduct?._id + "-num2"}
          className="flex flex-wrap text-xs "
        >
          {(minifyProduct?.Price?.rrp_price !== undefined
            ? minifyProduct?.Price?.rrp_price / 10
            : 0
          ).toLocaleString()}{" "}
          <span className="text-cyan-400"> تومان</span>
        </div>
      </div>
    </Link>
  ) : (
    <Link
      className="flex w-full border border-blackout-saffron rounded-xl p-2 m-4 font-Vazir-Medium"
      href={`products/${minifyProduct?._id}/${(
        minifyProduct?.title_fa ?? minifyProduct?.sku
      )?.replaceAll(" ", "-")}`}
    >
      <div key={minifyProduct?._id + "-a"} className="w-full">
        <div key={minifyProduct?._id}>
          <Image
            className="border rounded-xl"
            loader={imageLoader}
            quality="80"
            // unoptimized
            loading="eager"
            placeholder="empty"
            src={imageAddress(minifyProduct?.image, 150, 150, 80, "webp")}
            alt={minifyProduct?.title_en ?? "not-present"}
            width={150}
            height={150}
          />
        </div>
        <div key={minifyProduct?._id + "-num2"}>
          {minifyProduct?.Price.rrp_price.toLocaleString()} - تومان
        </div>
        <div key={minifyProduct?._id + "-num3"}>{minifyProduct?.title_fa}</div>
        <div key={minifyProduct?._id + "-num3"}>
          {minifyProduct?.primaryAttribute.title}
        </div>
        <div key={minifyProduct?._id + "-num3"}>
          {minifyProduct?.primaryAttribute.values}
        </div>
      </div>
    </Link>
  );
}
