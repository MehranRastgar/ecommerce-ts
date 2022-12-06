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
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { AiFillCloseSquare } from "react-icons/ai";
import { useRouter } from "next/router";

export default function MobileUserBag() {
  const [count, setCount] = useState(0);
  const bagElement = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const userInfo: Client = useAppSelector(selectUserInfo);
  const [offsetY, setOffsetY] = useState<string>("");
  const [drop2, setDrop2] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const mobileCheck = useAppSelector(selectDeviceType);
  const [animationParent] = useAutoAnimate<HTMLDivElement>({ duration: 500 });
  const router = useRouter();
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

  useEffect(() => {
    setDrop(false);
  }, [router]);

  const timeout: number = 200;
  return (
    <>
      {drop ? (
        <div
          onMouseEnter={() => {
            setDrop(false);
          }}
          onClick={() => {
            setDrop(false);
          }}
          className={`fixed hidden ${
            !drop ? "hidden" : "md:flex"
          } top-0 left-0 z-[100] w-[100%] h-[100%] bg-ino-lgray/10 `}
        ></div>
      ) : (
        <></>
      )}
      <div
        id="bag-container"
        onMouseEnter={() => {
          setDrop(true);
        }}
        onTouchEnd={() => {
          setDrop(true);
        }}
        onMouseLeave={() => {
          setDrop(false);
        }}
        ref={bagElement}
        className="md:flex flex-wrap hidden justify-end "
      >
        <button
          className={`rounded-xl p-4 inline-flex ${
            !drop ? "text-ino-hgray" : "text-ino-hgray"
          } ${drop === true ? " z-[100]" : "z-[100]"}`}
        >
          <FaShoppingBag size={20} />
          <span className="font-thin -mr-8 mt-4 font-serif inline-flex items-center justify-center px-[8px] py-[3px] text-xs  leading-none text-gray-100 bg-blackout-red2 rounded-full ">
            {count}
          </span>
        </button>

        <div
          className={`hidden md:flex flex-wrap rounded-lg fixed transition-all z-[101] bg-white translate-y-14 translate-x-[14px] w-[400px] ${
            drop ? "h-[500px] flex p-[16px]" : " overflow-hidden h-[0px]"
          }`}
        >
          <span className="w-full text-start mx-2 font-Vazir-Bold text-sky-600">
            سبد خرید
          </span>
          <div className="flex h-[70%] p-2 rounded-xl bg-ino-white overflow-y-auto  items-start justify-center w-full">
            <div
              ref={animationParent}
              className="flex flex-wrap h-fit items-start justify-center w-full"
            >
              {userInfo?.cart !== undefined && userInfo?.cart?.length > 0 ? (
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
                                .replaceAll("/", "-")}?v=${cartItem?.variantId}`
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
          <div>
            <Link
              href={"/checkout/cart"}
              className="flex h-fit mb-2 px-4 rounded-lg bg-ino-primary hover:bg-ino-dark text-white hover:text-white self-end text-md font-Vazirmatn font-bold 	p-2"
            >
              ثبت سفارش
            </Link>
          </div>
        </div>
      </div>
      {/* =========================================== */}
      <div
        id="bag-container-mobile"
        onTouchEnd={() => {
          setDrop(true);
        }}
        onClick={() => {
          setDrop(true);
        }}
        ref={bagElement}
        className="md:hidden flex justify-end "
      >
        <button
          className={` rounded-xl p-4 inline-flex ${
            !drop ? "text-ino-hgray" : "text-ino-hgray"
          } ${drop === true ? " z-[100]" : "z-[100]"}`}
        >
          <FaShoppingBag size={20} />
          <span className="font-thin -mr-8 mt-4 font-serif inline-flex items-center justify-center px-[8px] py-[3px] text-xs  leading-none text-gray-100 bg-blackout-red2 rounded-full ">
            {count}
          </span>
        </button>
      </div>
      <div
        className={`md:hidden fixed flex flex-wrap z-[101] bg-white right-0 top-0 h-[100%] w-[100%] ${
          drop ? "flex" : "hidden"
        }`}
      >
        <div className="flex h-fit w-full justify-end p-2 text-ino-primary">
          <div
            onClick={() => {
              setDrop(false);
            }}
            className="flex p-2 cursor-pointer"
          >
            <AiFillCloseSquare size={30} />
          </div>
        </div>
        <div className="flex flex-wrap items-start h-full rounded-xl mx-2 bg-ino-white w-full overflow-hidden">
          <span className="w-full text-start  mx-2 font-Vazir-Bold text-sky-600">
            سبد خرید
          </span>
          <div className="flex h-[70%] p-2 rounded-xl bg-ino-white overflow-y-auto  items-start justify-center w-full">
            <div
              ref={animationParent}
              className="flex flex-wrap h-fit items-start justify-center w-full"
            >
              {userInfo?.cart !== undefined && userInfo?.cart?.length > 0 ? (
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
                                .replaceAll("/", "-")}?v=${cartItem?.variantId}`
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
          <div>
            <Link
              href={"/checkout/cart"}
              className="flex h-fit mb-2 px-4 rounded-lg bg-ino-primary hover:bg-ino-dark text-white hover:text-white self-end text-md font-Vazirmatn font-bold 	p-2"
            >
              ثبت سفارش
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
