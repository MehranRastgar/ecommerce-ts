import Link from "next/link";
import Image from "next/image";
import imageLoader from "../../imageLoader";
import { imageAddress } from "../../../pages";
import { useAppSelector } from "../../store/hooks";
import { selectDeviceType } from "../../store/slices/themeSlice";

export default function CardPromotionOne({
  cardName,
  ImageSrc,
  Url,
}: {
  cardName: string;
  ImageSrc: string;
  Url: string;
}) {
  return (
    <Link href={Url ?? "/"} className="flex flex-wrap select-none">
      <Image
        className={`flex  min-w-[300px] w-full md:w-[300px] h-auto m-2`}
        loader={imageLoader}
        alt={cardName ?? "-"}
        priority
        width={300}
        height={300}
        unselectable="on"
        draggable={false}
        src={imageAddress(`${ImageSrc}.png`, 300, 300, 90, "webp", "public")}
      />
    </Link>
  );
}
