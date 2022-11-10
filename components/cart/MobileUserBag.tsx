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

export default function MobileUserBag() {
  const [count, setCount] = useState(0);
  const bagElement = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const userInfo: Client = useAppSelector(selectUserInfo);
  const [offsetY, setOffsetY] = useState<string>("");
  const [drop2, setDrop2] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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

  const numb: string | undefined = String(
    document?.getElementById("bag-container")?.offsetLeft
  );

  useEffect(() => {
    setCount(userInfo?.cart?.length ?? 0);
  }, [bagElement, offsetY, numb, userInfo]);

  return (
    <div
      id="bag-container"
      onMouseEnter={() => {
        setDrop(true);
      }}
      onMouseLeave={() => {
        setDrop(false);
      }}
      ref={bagElement}
      className="flex justify-end w-1/2"
    >
      <button className="inline-flex p-2">
        <FaShoppingBag color="#48424966" size={30} />
        <span className="font-thin -mr-8 mt-4 font-serif inline-flex items-center justify-center px-[8px] py-[3px] text-xs  leading-none text-gray-100 bg-blackout-red2 rounded-full ">
          {count}
        </span>
      </button>
      <div
        style={{
          transition: "all 300ms ease-in-out",
          opacity: `${drop === true ? "100%" : "0%"}`,
          width: `${true === true ? "30%" : "0%"}`,
          height: `${drop === true ? "40%" : "0%"}`,
          zIndex: "2",
          transform: `translate3d(0px,  50px, 0px)`,
        }}
        className={`fixed flex justify-center bg-transparent z-50`}
      >
        <div className="flex border rounded-xl mx-2 bg-white h-[98%] w-full overflow-hidden ">
          <div className="flex flex-wrap justify-end p-2 w-full font-Vazir-Medium ">
            <span className="w-full text-start mx-2 font-Vazir-Medium text-brand-purple">
              سبد خرید
            </span>
            <div className="flex h-[80%] p-2 rounded-xl bg-white overflow-y-auto  items-start justify-center w-full">
              <div className="flex flex-wrap h-fit items-start justify-center w-full">
                {userInfo?.cart !== undefined && userInfo?.cart?.length > 0 ? (
                  <>
                    {userInfo?.cart?.map((cartItem) => (
                      <>
                        <div className="flex my-2 p-2 rounded-xl shadow border h-[120px] w-full text-xs font-Vazir-Medium overflow-hidden">
                          <Image
                            className=" rounded-xl"
                            loader={imageLoader}
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
                              className="flex h-fit m-1 px-2 py-1 border rounded-xl bg-brand-purple text-white"
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
              className="flex h-fit m-1 px-2 py-1 border rounded-xl bg-brand-purple text-white"
            >
              پرداخت
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
