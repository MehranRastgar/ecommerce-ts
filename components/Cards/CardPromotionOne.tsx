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
  return (
    <Link href={Url ?? "/"} className="flex select-none">
      <Image
        className={`flex w-[150px] md:w-[250px] h-auto m-2`}
        loader={imageLoader}
        alt={cardName ?? "-"}
        priority
        width={250}
        height={250}
        unselectable="on"
        draggable={false}
        src={imageAddress(`${ImageSrc}.png`, 250, 250, 80, "webp", "public")}
      />
    </Link>
  );
}
