import React, { useEffect } from "react";
import Image from "next/image";
import imageLoader from "../../src/imageLoader";
import { imageAddress } from "../../pages";
import image from "../../public/slider-a/1.jpg";
import { useAppSelector } from "../../src/store/hooks";
import { selectDeviceType } from "../../src/store/slices/themeSlice";
import Link from "next/link";
import Router from "next/router";
export type SwiperItemType = {
  imageSrc: string;
  imageAlt: string;
  url: string;
};
// import "./SwiperItem.css";

export type Props = SwiperItemType;

function SwiperItem({ imageSrc, imageAlt, url }: Props) {
  const deviceType = useAppSelector<
    "android" | "ios" | "mobile" | "tablet" | "pc" | "laptop" | undefined
  >(selectDeviceType);

  useEffect(() => {}, [deviceType]);

  return (
    <div
      onClick={(e) => {
        Router.push(url);
        console.log("tocuched");
      }}
      className="swiper-item justify-center flex h-full w-[100%] overflow-hidden"
    >
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
        // src={image}
        draggable={false}
        className="flex w-full min-w-[600px] md:min-h-[200px] min-h-[150px] md:object-fill object-cover object-center h-full"
        // quality={90}
        loader={imageLoader}
        unoptimized
        unselectable="on"
        priority
        src={imageAddress(imageSrc, 1400, undefined, 80, "webp", "public")}
        // src={"/public/slider-a/1.jpg"}
        alt={imageAlt ?? "not-present"}
        width={1400}
        height={400}
      />
    </div>
  );
}

export default SwiperItem;
