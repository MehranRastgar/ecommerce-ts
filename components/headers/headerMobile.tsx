import Image from "next/image";
import Link from "next/link";
import imager from "../../public/Asset13.png";
import imageLoader from "../../src/imageLoader";

export default function HeaderMobile() {
  return (
    <div className="flex w-full justify-center  text-2xl text-blackout-red text-center items-center">
      <Link href={"/"}>
        <div className="flex">
          <Image
            className="flex p-1 w-[80px] h-auto m-1"
            loader={imageLoader}
            alt="InoMal Logo"
            src={imager}
            unoptimized
            priority
            width={80}
            height={50}
          />
        </div>
      </Link>
    </div>
  );
}
