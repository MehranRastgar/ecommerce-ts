import { useEffect, useState } from "react";
import {
  FaChevronCircleDown,
  FaCircle,
  FaRegCheckCircle,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { IoMdRemoveCircle, IoIosAddCircle } from "react-icons/io";
import { GoTrashcan } from "react-icons/go";
import { AiOutlineShoppingCart } from "react-icons/ai";

import { GoDiffAdded } from "react-icons/go";
import ScrollContainer from "react-indiana-drag-scroll";
import { AddToCartType, Cart, Product } from "../../src/types/types";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import {
  addToCart,
  ProductId,
  reduecFromCart,
  selectCartFlag,
  selectToken,
  selectUserInfo,
} from "../../src/store/slices/clientSlice";

export default function ProductInfoSection({ product }: { product: Product }) {
  const router = useRouter();

  const [variantNumber, setVariantNumber] = useState<number>(
    product?.primary_variant ?? 0
  );

  function autoVariantSelection() {
    if (router?.query?.v !== undefined) {
      const numb: number = product?.variants.findIndex(
        (item) => String(item._id) === router?.query?.v
      );
      setVariantNumber(numb);
    }
  }
  useEffect(() => {
    autoVariantSelection();
  }, [router?.query?.v]);

  return (
    <div className="flex flex-auto justify-start w-full h-full mt-4">
      <div className="flex min-w-[360px] flex-wrap max-w-3xl overflow-hidden h-fit">
        <VariantSection
          variantNumber={variantNumber}
          setVariantNumber={setVariantNumber}
          product={product}
        />
        <ProductAttributeComponentReview product={product} />
      </div>
      <div className="flex w-28"></div>
      <CartSection variantNumber={variantNumber} product={product} />
    </div>
  );
}

export function CartSection({
  product,
  variantNumber,
}: {
  product: Product;
  variantNumber: any;
}) {
  const [mouseOverbutton, setMouseOverbutton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const token = useAppSelector(selectToken);
  const CartState = useAppSelector(selectCartFlag);
  // const [cartArray, setCartArray] = useState<Cart[]>(userInfo.cart ?? []);
  const [findedIndex, setFindedIndex] = useState<number>(-1);

  function handleReduceFromCart() {
    if (
      userInfo._id !== undefined &&
      product._id !== undefined &&
      userInfo.accessToken !== undefined
    ) {
      const reduce: AddToCartType = {
        accessToken: userInfo.accessToken,
        userId: userInfo._id,
        productId: product._id,
        variantId: product?.variants?.[variantNumber]?._id,
      };
      dispatch(reduecFromCart(reduce));
    } else {
      console.log("please sign in first");
      console.log(userInfo._id, product._id, userInfo.accessToken);
    }
  }

  function handleAddToCart() {
    if (
      userInfo._id !== undefined &&
      product._id !== undefined &&
      userInfo.accessToken !== undefined
    ) {
      const adder: AddToCartType = {
        accessToken: userInfo.accessToken,
        userId: userInfo._id,
        productId: product._id,
        variantId: product?.variants?.[variantNumber]?._id,
      };
      dispatch(addToCart(adder));
    } else {
      console.log("please sign in first");
      console.log(userInfo._id, product._id, userInfo.accessToken);
    }
  }

  async function handleClickShape() {
    const index: number | undefined = userInfo?.cart?.findIndex(
      (item) => item?.variantId === product?.variants?.[variantNumber]?._id
    );
    if (
      index !== undefined &&
      index >= 0 &&
      userInfo?.cart?.length &&
      userInfo?.cart?.length > index
    ) {
      if (Number(userInfo?.cart?.[index]?.quantity) >= 0) {
        const num: number = Number(userInfo?.cart?.[index]?.quantity);
        setFindedIndex(num);
      }
    } else {
      setFindedIndex(-1);
    }
  }

  useEffect(() => {
    if (CartState === "idle" || CartState === "success") handleClickShape();
  }, [userInfo?.cart, product?._id, variantNumber, CartState]);

  useEffect(() => {
    // setCartArray(userInfo.cart ?? []);
  }, [CartState, userInfo, product]);

  return (
    <div className="flex flex-wrap shadow h-full justify-center p-4 max-w-[320px] min-w-[260px] max-h-[400px] w-1/4 md:w-1/2 sm:w-full border rounded-xl m-2 font-Vazir-Medium text-blackout-black bg-gray-100 justify-self-end overflow-hidden">
      {product?.variants?.[variantNumber]?.warranty! ? (
        <ul className="w-full">
          <li>گارانتی :</li>
          <li>
            {product?.variants?.[variantNumber]?.warranty ?? "بدون گارانتی"}
          </li>
        </ul>
      ) : (
        <></>
      )}
      {product?.variants?.[variantNumber]?.color?.hex_code !== undefined ? (
        <ul className="flex w-full">
          <li className="px-2">رنگ :</li>
          <li className="px-2 flex">
            {product?.variants?.[variantNumber]?.color?.title}
            <div className="w-fit h-fit border-black p-1 border rounded-full mx-2">
              {" "}
              <FaCircle
                size={20}
                color={`${product?.variants?.[variantNumber]?.color?.hex_code}`}
              />
            </div>
          </li>
        </ul>
      ) : (
        <></>
      )}
      <div className="flex w-full "></div>
      {product?.variants?.[variantNumber ?? 0]?.price?.selling_price === 0 ||
      product?.variants?.[variantNumber ?? 0]?.price?.selling_price ===
        undefined ? (
        <></>
      ) : (
        <>
          <ul className="flex w-full h-fit min-w-[300px] justify-center text-center font-Vazir-Bold">
            <li className="px-2">
              {(
                product?.variants?.[variantNumber ?? 0].price.selling_price / 10
              ).toLocaleString()}{" "}
            </li>
            <li className="px-2">تومان</li>
          </ul>
        </>
      )}
      {product?.variants?.[variantNumber ?? 0]?.price?.selling_price !== 0 &&
      product?.variants?.[variantNumber ?? 0]?.price?.selling_price !==
        undefined ? (
        <ul className="h-fit ">
          {findedIndex < 1 ? (
            <button
              onMouseLeave={(event) => {
                setMouseOverbutton(false);
              }}
              onMouseOver={(event) => {
                setMouseOverbutton(true);
              }}
              onClick={(event) => {
                //setActive(true)
                handleAddToCart();
              }}
              className={`flex items-center transition-all duration-100 font-bold font-Vazirmatn  hover:bg-cyan-300   bg-cyan-400 focus:ring-4 focus:outline-none shadow-lg shadow-cyan-500/50 rounded-lg text-md px-5 p-2 m-2 text-center ${
                mouseOverbutton ? " text-red-500 mx-3" : "text-white"
              }`}
            >
              <GoDiffAdded
                size={20}
                className={`fle  ${
                  mouseOverbutton
                    ? "rotate-45 text-red-500 mx-3"
                    : "mx-1  text-blackout-white"
                } transition-all duration-100 `}
              ></GoDiffAdded>
              {CartState === "loading" ? loadingSvg : "به سبد"}
            </button>
          ) : (
            <>
              <div className="flex  rounded-lg justify-around bg-gray-200 max-w-[110px] h-10 shadow-lg shadow-gray-500/50 items-center p-2 m-2">
                <button
                  disabled={findedIndex > 1 ? true : false}
                  onClick={(event) => {
                    // setActive(true);
                    // AddToCart();
                    handleAddToCart();
                  }}
                >
                  <IoIosAddCircle
                    size={20}
                    className={`flex  rounded-full   ${
                      findedIndex > 1 ? "text-gray-400" : "text-green-400"
                    }`}
                  ></IoIosAddCircle>
                </button>

                <a className="transition-transform ease-out duration-1000 font-Vazirmatn font-bold flex flex-wrap text-md justify-center  text-red-400 w-8">
                  {findedIndex}{" "}
                  {findedIndex > 1 ? (
                    <span className="flex text-xs justify-center w-full hover:text-red-900 transition-colors ease-out duration-1000">
                      حداکثر
                    </span>
                  ) : (
                    <span></span>
                  )}
                </a>
                <button
                  onClick={(event) => {
                    //setActive(false),
                    handleReduceFromCart();
                  }}
                >
                  {findedIndex > 0 ? (
                    <IoMdRemoveCircle
                      size={20}
                      className="flex   rounded-full  text-red-400"
                    ></IoMdRemoveCircle>
                  ) : (
                    <GoTrashcan
                      size={20}
                      className="flex transition-transform ease-out duration-500 hover:text-red-600 hover:scale-125 text-red-400"
                    ></GoTrashcan>
                  )}
                </button>
              </div>
              {true ? (
                <Link
                  href="/checkout/cart"
                  className=" font-Vazirmatn font-bold text-xs flex rounded-lg justify-around bg-gray-200 max-w-[110px] h-10 shadow-lg shadow-gray-500/50 items-center p-2 m-2"
                >
                  <span className="mx-1 text-center">مشاهده سبد خرید</span>
                  <AiOutlineShoppingCart
                    className=" text-red-600"
                    size={20}
                  ></AiOutlineShoppingCart>
                </Link>
              ) : (
                <></>
              )}
            </>
          )}
          <div className="flex justify-center text-center w-full text-blackout-red">
            {CartState === "error" ? "خطایی رخ داده" : ""}
          </div>
        </ul>
      ) : (
        <div className="flex text-blackout-red ">ناموجود</div>
      )}
    </div>
  );
}

function VariantSection({
  product,
  variantNumber,
  setVariantNumber,
}: {
  product: Product;
  variantNumber: any;
  setVariantNumber: any;
}) {
  if (
    product?.variants?.[variantNumber]?.price?.selling_price === undefined ||
    product?.variants?.[variantNumber]?.price?.selling_price === 0
  )
    return <></>;
  return (
    <div className="w-fit min-w-[360px]">
      {/* <ScrollContainer className="scroll-container product-slider-one-items overflow-y-hidden"> */}
      <div className="overflow-y-hidden border rounded-xl">
        <ScrollContainer
          hideScrollbars={false}
          className="flex scrollbar-for-slider max-w-[600px] min-w-[600px] w-fit select-none max-h-[400px] overflow-x-auto  p-2 text-[12px]"
        >
          {product?.variants?.map((variant, index) => (
            <>
              <div className="flex flex-wrap w-1/3 p-2">
                <div
                  onClick={() => {
                    setVariantNumber(index);
                  }}
                  className={
                    "cursor-pointer font-Vazir-Medium border rounded-xl w-full p-2 " +
                    `${
                      index === variantNumber
                        ? "border-red-600 text-gray-800 "
                        : "text-gray-400 "
                    }`
                  }
                >
                  <div className="p-2">{variant?.warranty}</div>

                  <div className="flex mx-2 items-center justify-end p-2 text-[12px]">
                    {variant?.color?.title}
                    <div
                      className={
                        "w-fit h-fit border-gray-600 p-1  rounded-full mx-2 bg-gray-200 " +
                        `${index === variantNumber ? "border " : ""}`
                      }
                    >
                      {index === variantNumber ? (
                        <FaCircle
                          size={25}
                          color={`${variant?.color?.hex_code}`}
                        />
                      ) : (
                        <FaCircle
                          size={25}
                          color={`${variant?.color?.hex_code}`}
                        />
                      )}
                    </div>
                    <div className="font-Vazir-Bold w-3/4 text-end">
                      {(variant?.price?.selling_price / 10).toLocaleString()}{" "}
                      تومان
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </ScrollContainer>
      </div>
    </div>
  );
}
function ProductAttributeComponentReview({ product }: { product: Product }) {
  return (
    <>
      <div className="flex flex-wrap text-justify w-full h-fit font-Vazir-Medium mt-14 select-none">
        <div className="flex text-justify w-full font-Vazir-Medium">
          <div className="flex text-justify w-fit p-2">
            {product.attributes[0].title}
          </div>
          <div className="flex text-justify w-fit p-2">
            {product.attributes[0].values}
          </div>
        </div>
        <div className="flex text-justify w-full font-Vazir-Medium">
          <div className="flex text-justify w-fit p-2">
            {product.attributes[1].title}
          </div>
          <div className="flex text-justify w-fit p-2">
            {product.attributes[1].values}
          </div>
        </div>
        <div className="flex text-justify w-full font-Vazir-Medium">
          <div className="flex text-justify w-fit p-2">
            {product.attributes[2].title}
          </div>
          <div className="flex text-justify w-fit p-2">
            {product.attributes[2].values}
          </div>
        </div>
        <a href={`#espicification`}>
          <button className="flex bg-white border rounded-xl px-6 py-2 text-blue-600 items-center">
            <div className="mx-2">مشخصات فنی</div>
            <FaChevronCircleDown />
          </button>
        </a>
      </div>
    </>
  );
}

const loadingSvg = (
  <svg
    role="status"
    className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-red-600 fill-cyan-500"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
