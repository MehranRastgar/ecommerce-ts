import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import { selectCount } from "../../src/store/counterSlice";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";
import { AddToCartType, Client } from "../../src/types/types";
import {
  reduecFromCart,
  selectUserInfo,
} from "../../src/store/slices/clientSlice";
import { IoMdRemoveCircle, IoIosAddCircle } from "react-icons/io";
import { GoTrashcan } from "react-icons/go";
import { imageAddress } from "../../pages";
import imageLoader from "../../src/imageLoader";
import {
  selectDeviceType,
  ThemeState,
} from "../../src/store/slices/themeSlice";

export default function MobileUserBag() {
  const [count, setCount] = useState(0);
  const bagElement = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const userInfo: Client = useAppSelector(selectUserInfo);
  const [offsetY, setOffsetY] = useState<string>("");
  const [drop2, setDrop2] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const mobileCheck = useAppSelector(selectDeviceType);

  function handleReduceFromCart(productId: string, variantId: string) {
    if (
      userInfo._id !== undefined &&
      productId !== undefined &&
      userInfo.accessToken !== undefined
    ) {
      const reduce: AddToCartType = {
        accessToken: userInfo.accessToken,
        userId: userInfo._id,
        productId: productId,
        variantId: variantId,
      };
      dispatch(reduecFromCart(reduce));
    } else {
      console.log("please sign in first");
    }
  }

  // const numb: string | undefined = String(
  //   document?.getElementById("bag-container")?.offsetLeft
  // );

  useEffect(() => {
    setCount(userInfo?.cart?.length ?? 0);
  }, [bagElement, offsetY, userInfo]);
  const timeout: number = 200;
  return (
    <>
      <div
        style={{
          transition: `${
            drop === true
              ? "opacity 800ms ease-in-out"
              : "opacity 800ms ease-in-out"
          }`,
          opacity: `${drop === true ? "100%" : "0%"}`,
          width: `${drop === true ? "100%" : "0%"}`,
          height: `${drop === true ? "100%" : "0%"}`,
        }}
        onTouchStart={() => {
          // setDrop(false);
          setTimeout(() => setDrop(false), timeout);
        }}
        onClick={() => {
          // setDrop(false);
          setTimeout(() => setDrop(false), timeout);
        }}
        className="fixed top-0 left-0 z-[100] w-[100%] h-[100%] bg-black/60"
      ></div>
      <div
        id="bag-container"
        onMouseEnter={() => {
          if (mobileCheck === "mobile") {
          } else {
            setTimeout(() => setDrop(true), timeout);
          }
        }}
        onClick={() => {
          if (mobileCheck === "mobile") {
            if (drop) {
              setDrop(false);
              // setTimeout(() => setDrop(false), timeout);
            } else {
              setDrop(true);
              // setTimeout(() => setDrop(true), timeout);
            }
          } else {
            setDrop(true);
            // setTimeout(() => setDrop(true), timeout);
          }
        }}
        onMouseLeave={() => {
          if (mobileCheck === "mobile") {
          } else {
            setDrop(false);
            // setTimeout(() => setDrop(false), timeout);
          }
          // setDrop(false);
        }}
        ref={bagElement}
        className="flex justify-end w-1/2 "
      >
        <button
          className={`inline-flex p-2 ${drop === true ? " z-[101]" : ""}`}
        >
          <FaShoppingBag
            color={`${!drop ? "#48424966" : "#ffffff"}`}
            size={20}
          />
          <span className="font-thin -mr-8 mt-4 font-serif inline-flex items-center justify-center px-[8px] py-[3px] text-xs  leading-none text-gray-100 bg-blackout-red2 rounded-full ">
            {count}
          </span>
        </button>
        <div
          style={{
            transition: "height 300ms ease-in-out",
            opacity: `${drop === true ? "100%" : "0%"}`,
            height: `${drop === true ? "40%" : "0%"}`,
            transform: `translate3d(0px,  50px, 0px)`,
          }}
          className={`fixed z-[101] flex justify-center bg-transparent 
          ${drop ? "md:w-[40%] lg:w-[550px] w-[80%]" : "w-[0px]"}
          `}
        >
          <div className="flex border rounded-xl mx-2 bg-white h-[98%] w-full overflow-hidden ">
            <div className="flex flex-wrap justify-end p-2 w-full font-Vazir-Medium ">
              <span className="w-full text-start mx-2 font-Vazir-Medium text-brand-purple">
                سبد خرید
              </span>
              <div className="flex h-[80%] p-2 rounded-xl bg-white overflow-y-auto  items-start justify-center w-full">
                <div className="flex flex-wrap h-fit items-start justify-center w-full">
                  {userInfo?.cart !== undefined &&
                  userInfo?.cart?.length > 0 ? (
                    <>
                      {userInfo?.cart?.map((cartItem) => (
                        <>
                          <div className="flex my-2 p-2 rounded-xl shadow border h-[120px] w-full text-xs font-Vazir-Medium overflow-hidden">
                            <Image
                              className="flex w-[100px] h-auto m-1 rounded-xl"
                              loader={imageLoader}
                              unoptimized
                              quality="80"
                              loading="eager"
                              unselectable="on"
                              draggable="false"
                              placeholder="empty"
                              src={imageAddress(
                                cartItem?.ImageUrl,
                                100,
                                100,
                                100,
                                "webp",
                                undefined
                              )}
                              alt={cartItem?.title_fa ?? "not-present"}
                              width={100}
                              height={100}
                            />
                            <div className="flex h-fit w-2/4 ">
                              {cartItem.title_fa ?? cartItem.sku}
                            </div>
                            <div className="flex flex-wrap h-fit w-1/4 ">
                              <span className="text-red-500 line-through">
                                {(
                                  cartItem?.variant.price.rrp_price / 10
                                ).toLocaleString()}
                              </span>
                              {(
                                cartItem?.variant.price.selling_price / 10
                              ).toLocaleString()}{" "}
                              تومان
                            </div>
                            <div className="flex flex-wrap h-fit w-1/4 ">
                              <div className="flex w-full">
                                {cartItem?.quantity !== undefined &&
                                cartItem?.quantity > 1 ? (
                                  <button
                                    onClick={() => {
                                      handleReduceFromCart(
                                        cartItem.productId,
                                        cartItem.variantId
                                      );
                                    }}
                                    className="text-sm"
                                  >
                                    <IoMdRemoveCircle
                                      color={"rgb(235,18,18)"}
                                      size={20}
                                    />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      handleReduceFromCart(
                                        cartItem.productId,
                                        cartItem.variantId
                                      );
                                    }}
                                    className="text-sm "
                                  >
                                    <GoTrashcan
                                      color={"rgb(235,18,18)"}
                                      size={20}
                                    />
                                  </button>
                                )}
                                {cartItem?.quantity} عدد
                              </div>
                              <Link
                                href={encodeURI(
                                  `/products/${cartItem?.productId}/${(
                                    cartItem?.title_fa ?? cartItem?.sku
                                  )
                                    ?.replaceAll(" ", "-")
                                    .replaceAll("/", "-")}?v=${
                                    cartItem?.variantId
                                  }`
                                )}
                                className="px-4 rounded-lg hover:bg-gray-200 self-end text-md font-Vazirmatn font-bold text-blue-400	p-2"
                              >
                                نمایش کالا
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                    </>
                  ) : (
                    <span className="flex w-full h-full items-center mx-2 text-3xl text-gray-300 font-Vazir-Medium">
                      خالی...
                    </span>
                  )}
                </div>
              </div>
              <Link
                href={"/checkout/cart"}
                className="px-4 rounded-lg hover:bg-gray-200 self-end text-md font-Vazirmatn font-bold text-blue-400	p-2"
              >
                ثبت سفارش
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
