import { MinifyProduct } from "../../src/types/types";
import ProductCardOne from "./ProductCardOne";
import Image from "next/image";
import imageLoader from "../../src/imageLoader";
import { imageAddress } from "../../pages";

export default function ProductCardDark({
  minifyProduct,
}: {
  minifyProduct: MinifyProduct | undefined;
}) {
  return (
    <>
      <div className="transition-shadow shadow-product  flex flex-wrap justify-center items-start rounded-lg min-w-[220px] max-w-[220px] h-[380px] border border-ino-hgray bg-ino-black m-[25px] ">
        <div className="flex flex-wrap justify-center items-center w-full rounded-lg">
          <div className="flex absolute w-[220px] h-[220px]">
            <Image
              className="lg:w-[220px] p-[33px] md:w-[220px]  w-[220px] h-auto"
              loader={imageLoader}
              quality="100"
              loading="eager"
              unselectable="on"
              draggable="false"
              placeholder="empty"
              src={imageAddress(
                minifyProduct?.image,
                200,
                200,
                100,
                "webp",
                undefined
              )}
              alt={minifyProduct?.title_en ?? "not-present"}
              width={250}
              height={250}
            />
          </div>
          <div className="flex w-[220px] h-[220px]">
            <Image
              className="lg:w-[220px] md:w-[220px]  w-[220px] h-auto"
              loader={imageLoader}
              unoptimized
              alt="InoMal Logo"
              src={"/Rectangle3.png"}
              priority
              width={220}
              height={220}
            />
          </div>
        </div>
        <div className="flex w-full border-b border-ino-primary mx-4 h-[2px]"></div>
        <ul className="flex w-full flex-wrap mx-1 p-1">
          <li className="flex w-full p-1 font-Vazir-Bold text-[12px] h-[50px] text-white text-center">
            {minifyProduct?.title_fa}
          </li>
          <li className="flex justify-around w-full p-1 font-Vazir-Bold text-[12px] h-[28px] text-white text-center">
            <div className="text-white  ">
              {minifyProduct?.primaryAttribute.title}
            </div>
            <div className="text-white  ">
              {minifyProduct?.primaryAttribute.values}
            </div>
          </li>
          <li className="flex w-full mr-4 items-end p-1 font-Vazir-Bold text-[14px] h-[50px] text-center">
            <div className="text-white bg-ino-green p-2">
              {(Number(minifyProduct?.Price?.rrp_price) / 10).toLocaleString()}
            </div>
            <span className="flex mx-2 text-blackout-red bg-ino-black">
              تومان
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
