import Link from "next/link";
import Image from "next/image";
import { imageAddress } from "../../pages/index";
import imageLoader from "../../src/imageLoader";
import { MinifyProduct } from "../../src/types/types";
import { useSelector } from "react-redux";
import { selectDeviceType } from "../../src/slices/themeSlice";

export default function ProductCardOne({
  minifyProduct,
}: {
  minifyProduct: MinifyProduct | undefined;
}) {
  const devType = useSelector(selectDeviceType);

  return devType === "mobile" ? (
    <Link
      className="flex w-full border-b border-b-slate-300 p-2 m-4 font-Vazir-Medium"
      href={`products/${minifyProduct?._id}/${(
        minifyProduct?.title_fa ?? minifyProduct?.sku
      )?.replaceAll(" ", "-")}`}
    >
      <div></div>
      <div key={minifyProduct?._id + "-a"} className="w-full">
        <div className="flex ">
          {minifyProduct?.color?.map((col) => (
            <>
              <input
                type={"color"}
                value={col.hex_code}
                className={`m-2 h-[20px] w-[20px] border rounded-full`}
              ></input>
            </>
          ))}
          <div className=""></div>
        </div>
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
            width={100}
            height={100}
          />
        </div>
        <div key={minifyProduct?._id + "-num2"}>
          {minifyProduct?.Price.rrp_price.toLocaleString()} - تومان
        </div>
        <div key={minifyProduct?._id + "-num3"}>{minifyProduct?.title_en}</div>
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
        <div key={minifyProduct?._id + "-num3"}>{minifyProduct?.title_en}</div>
      </div>
    </Link>
  );
}
