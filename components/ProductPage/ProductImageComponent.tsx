import { Product } from "../../src/types/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { imageAddress } from "../../pages";
import imageLoader from "../../src/imageLoader";
import ScrollContainer from "react-indiana-drag-scroll";

export default function ProductImageComponent({
  productData,
}: {
  productData: Product;
}) {
  const slideRef = useRef<HTMLInputElement>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [tab, setTab] = useState<number>(0);

  function fadeAnimation() {
    slideRef?.current?.classList?.add("fade-anim-image");
    setTimeout(() => {
      slideRef?.current?.classList?.remove("fade-anim-image");
    }, 500);
  }

  // function Submit(command: "next" | "prev") {
  //   if (command == "next") {
  //     fadeAnimation();
  //     if (tab < productData?.main?.images.length - 1) {
  //       setTab(tab + 1);
  //     } else setTab(0);

  //     return;
  //   } else if (command == "prev") {
  //     fadeAnimation();
  //     if (tab > 0) setTab(tab - 1);
  //     return;
  //   }
  // }

  return (
    <>
      <div className="flex  justify-center flex-wrap w-full max-h-full overflow-hidden">
        <div
          ref={slideRef}
          className="flex w-full justify-center bg-white justify-items-stretch select-none"
        >
          {productData?.main?.images.length > 0 ? (
            <>
              <Image
                className="flex justify-center w-[500px] h-auto m-2 p-1"
                loader={imageLoader}
                src={imageAddress(
                  productData?.main?.images?.[tab],
                  500,
                  500,
                  90,
                  "webp",
                  undefined
                )}
                placeholder="blur"
                blurDataURL="/Asset12.png"
                loading="lazy"
                alt={productData?.main?.title_en ?? "noname"}
                width={500}
                height={500}
              />
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="overflow-y-hidden border rounded-xl overflow-hidden h-fit">
          <ScrollContainer
            hideScrollbars={false}
            className="flex scrollbar-for-slider  max-w-[600px] min-w-[600px] w-fit select-none max-h-[400px] overflow-x-auto  p-2 text-[12px]"
          >
            {productData?.main?.images?.length ? (
              productData?.main?.images?.map((img, index) => (
                <>
                  <Image
                    onClick={() => {
                      setTab(index);
                    }}
                    unoptimized
                    // blurDataURL={imageAddress(img, 5, 5, 50, "webp", undefined)}
                    placeholder={"empty"}
                    loading={"eager"}
                    className={
                      "w-[100px] h-[100px] border m-1 rounded-xl cursor-pointer " +
                      `${tab === index ? "border-red-400 border-2" : ""}`
                    }
                    loader={imageLoader}
                    src={imageAddress(img, 100, 100, 80, "webp", undefined)}
                    alt={productData?.main?.title_en ?? "noname"}
                    width={100}
                    height={100}
                  />
                </>
              ))
            ) : (
              <></>
            )}
          </ScrollContainer>
        </div>
      </div>
    </>
  );
}
