import Image from "next/image";
import Link from "next/link";
import React from "react";
import imageLoader from "src/imageLoader";

const Logo = () => {
  return (
    <Link
      href="/"
      className="block md:flex items-center justify-center w-full flex-grow md:flex-grow-0"
    >
      <div className="flex w-[120px] h-[25px]">
        <Image
          src="/images/logo.png"
          alt="arvanta-logo"
          width={120}
          height={25}
          loader={imageLoader}
          unoptimized
          // objectFit="contain"
          className="object-contain cursor-pointer md:ltr:-mr-3"
        />
      </div>
    </Link>
  );
};

export default Logo;
