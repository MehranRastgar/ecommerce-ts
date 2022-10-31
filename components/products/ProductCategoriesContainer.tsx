import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
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
    <div className="flex flex-wrap justify-center w-full font-Vazir-Medium">
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
  const deviceType = useAppSelector<
    "android" | "ios" | "mobile" | "tablet" | "pc" | "laptop" | undefined
  >(selectDeviceType);

  useEffect(() => {}, [deviceType]);
  return (
    <>
      <Link href={`${itemCat?.url ?? "/"}`}>
        <Image
          loader={imageLoader}
          alt={itemCat?.title ?? "-"}
          src={`/catImage/${itemCat?.title}${
            deviceType === "mobile" ? "" : "-4x"
          }.png`}
          priority
          width={deviceType === "mobile" ? 120 : 250}
          height={50}
          className="m-3"
        />
      </Link>
      {/* <div className="flex p-2 m-4">{itemCat}</div> */}
    </>
  );
}
