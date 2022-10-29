import Image from "next/image";
import Link from "next/link";
import imager from "../../public/Asset12.png";
import imageLoader from "../../src/imageLoader";

export default function HeaderMobile() {
  return (
    <div className="flex w-full justify-center  text-2xl text-blackout-red text-center items-center">
      <Link href={"/"}>
        <div>
          <Image
            loader={imageLoader}
            alt="InoMal Logo"
            src={imager}
            priority
            width={80}
            height={50}
          />
        </div>
      </Link>
    </div>
  );
}
