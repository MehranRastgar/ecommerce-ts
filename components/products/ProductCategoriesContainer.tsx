import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { imageAddress } from "../../pages";
import imageLoader from "../../src/imageLoader";
import { useAppSelector } from "../../src/store/hooks";
import {
  selectSettings,
  selectSettingsStatus,
} from "../../src/store/slices/settingsSlice";
import {
  selectDeviceType,
  setDeviceType,
} from "../../src/store/slices/themeSlice";
import { L1, Settings } from "../../src/types/types";

export default function ProductCategoriesContainer() {
  const settings = useAppSelector(selectSettings);
  const settingsStatus = useAppSelector(selectSettingsStatus);
  const [categories, setCategories] = useState<Settings>();

  useEffect(() => {
    if (settingsStatus === "idle") {
      // console.table(settings);
      settings.map((setting) => {
        if (setting.name === "categories") setCategories(setting);
      });
    }
  }, [settingsStatus, settings]);

  return (
    <div className="flex flex-wrap justify-center w-full font-Vazir-Medium select-none">
      {settingsStatus === "idle" ? (
        <>
          {categories?.properties?.[0]?.properties?.map((catItem) => (
            <>
              <CategoryItem itemCat={catItem?.L1?.[0]} />
            </>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

function CategoryItem({ itemCat }: { itemCat: L1 | undefined }) {
  return (
    <>
      <Link
        className="flex mx-1 md:w-1/3 lg:w-1/5 xl:w-1/5 max-w-[200px] w-1/2"
        href={`/search${itemCat?.url ?? "/"}`}
      >
        <Image
          loader={imageLoader}
          className="flex md:w-full w-full h-auto m-2"
          unoptimized
          alt={itemCat?.title ?? "-"}
          width={200}
          height={250}
          unselectable="on"
          draggable={false}
          loading="lazy"
          placeholder="blur"
          blurDataURL={imageAddress(
            `/catImage/${itemCat?.title}.png`,
            10,
            15,
            80,
            "webp",
            "public"
          )}
          src={imageAddress(
            `/catImage/${itemCat?.title}.png`,
            200,
            250,
            80,
            "webp",
            "public"
          )}
        />
      </Link>
      {/* <div className="flex p-2 m-4">{itemCat}</div> */}
    </>
  );
}
