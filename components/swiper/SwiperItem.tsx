import React from "react";
import Image from "next/image";
import imageLoader from "../../src/imageLoader";
import { imageAddress } from "../../pages";
// import { SwiperItemType } from "../types";

export type SwiperItemType = {
  imageSrc: string;
  imageAlt: string;
};
// import "./SwiperItem.css";

export type Props = SwiperItemType;

function SwiperItem({ imageSrc, imageAlt }: Props) {
  return (
    <div className="swiper-item">
      {/* <Image
        className=" rounded-xl"
        loader={imageLoader}
        // src={imageAddress(imageSrc, 1920, 420, 50, "webp")}
        src={imageSrc}
        alt={imageAlt}
        draggable={false}
        // priority
        width={1920}
        height={200}
        layout="contain"
      /> */}
      <Image
        draggable={false}
        className="swiper-img"
        loader={imageLoader}
        unoptimized
        loading="eager"
        // src={imageAddress(imageSrc, 1400, 200, 80, "webp")}
        src={imageSrc}
        alt={imageAlt ?? "not-present"}
        width={1400}
        height={400}
      />
    </div>
  );
}

export default SwiperItem;
