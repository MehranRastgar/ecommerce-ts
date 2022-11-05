import Link from "next/link";
import Image from "next/image";
import imageLoader from "../../src/imageLoader";
import { imageAddress } from "../../pages";
import { useAppSelector } from "../../src/store/hooks";
import { selectDeviceType } from "../../src/store/slices/themeSlice";

export default function CardPromotionOne({
  cardName,
  ImageSrc,
  Url,
}: {
  cardName: string;
  ImageSrc: string;
  Url: string;
}) {
  const deviceType = useAppSelector<
    "android" | "ios" | "mobile" | "tablet" | "pc" | "laptop" | undefined
  >(selectDeviceType);

  return (
    <Link href={Url ?? "/"} className="flex  select-none">
      <Image
        loader={imageLoader}
        alt={cardName ?? "-"}
        priority
        width={deviceType === "mobile" ? 150 : 250}
        height={deviceType === "mobile" ? 120 : 250}
        className="m-3"
        unselectable="on"
        draggable={false}
        src={imageAddress(
          `${ImageSrc}${deviceType === "mobile" ? "" : "-4x"}.png`,
          deviceType === "mobile" ? 150 : 250,
          undefined,
          80,
          "webp",
          "public"
        )}
      />
    </Link>
  );
}
