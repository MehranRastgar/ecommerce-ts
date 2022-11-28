import { useSelector } from "react-redux";
import {
  reduecFromCart,
  selectUserInfo,
  selectUserInfoStatus,
  selectUserUpdateFlag,
  updateVariantsCart,
} from "../../src/store/slices/clientSlice";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import imageLoader from "../../src/imageLoader";
import { imageAddress } from "..";
import { GoTrashcan } from "react-icons/go";
import { IoMdRemoveCircle } from "react-icons/io";
import { AddToCartType, Cart } from "../../src/types/types";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import Shipping from "../../components/shipping/shipping";
import { useEffect, useState } from "react";
import { LoadingSvg, LoadingTwo } from "../../components/loader/default";
import {
  selectUpdatedPrices,
  selectUpdatedPricesFlag,
  updateCartPrices,
  variantId,
} from "../../src/store/slices/orderSlice";
export default function CartPage() {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useAppDispatch();

  async function checkUpdate() {
    // const variantIds: variantId[] = [];
    // userInfo.cart?.map((item) => {
    //   variantIds.push({ id: item?.variantId });
    // });
    dispatch(updateVariantsCart());
  }

  useEffect(() => {
    checkUpdate();
    // if (UpdatedPricesFlag === "success") calcSum();
  }, []);

  return (
    <>
      <Head>
        <title>بررسی سفارش</title>
        <meta
          name="description"
          content="بررسی سفارش - سایت فروشگاهی اینومال"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="select-none flex flex-wrap h-fit font-Vazir-Bold justify-center items-start w-full ">
        {userInfo?.firstname !== undefined ? (
          <>
            <div className="flex justify-center w-full max-w-[800px] flex-wrap">
              <h1 className="mt-6 flex text-center h-fit justify-center w-full font-Vazir-Medium text-2xl text-blackout-red">
                مشخصات
              </h1>
              <div className="flex w-full max-w-[800px] flex-wrap border mt-4 rounded-md text-gray-600 text-xs shadow-lg">
                <FillFeild item={userInfo.firstname ?? "-"} label="نام" />
                <FillFeild
                  item={String(userInfo.lastname ?? "-")}
                  label="نام خانوادگی"
                />
                <FillFeild
                  item={String("0" + userInfo.usernamebyphone ?? "-")}
                  label="شماره موبایل"
                />
                <div className="flex w-full justify-end m-2">
                  <button className="px-4 rounded-lg hover:bg-gray-200 self-end text-md font-Vazirmatn font-bold text-blue-400	p-2">
                    تغییر مشخصات
                  </button>
                </div>
              </div>
              <div className="flex w-full flex-wrap mt-4 text-gray-600 text-xs rounded-lg">
                <h1 className="my-4 flex text-center h-fit justify-center w-full font-Vazir-Medium text-2xl text-blackout-red">
                  آدرس
                </h1>
                <Shipping />
              </div>
              <h1 className="mt-20 flex text-center h-fit justify-center w-full font-Vazir-Medium text-2xl text-blackout-red">
                سبد خرید
              </h1>
              <div className="flex w-full justify-center">
                <CartContainer></CartContainer>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center text-3xl font-Vazir-Bold text-gray-600">
              سبد شما خالی میباشد
            </div>
          </>
        )}
        <div className="StickyContainer mt-4 w-fit max-w-[300px]">
          <ReportContainer cart={userInfo?.cart} />
        </div>
      </div>
    </>
  );
}
const FillFeild = ({ label, item }: { label: string; item: string }) => {
  return (
    <ul className="flex items-center h-fit font-Vazir-Medium text-[15px] w-full">
      <li className="flex  w-[110px] mx-2 p-2 font-Vazir-Medium">{label}:</li>
      <li className="flex mx-2 p-2 text-gray-400">{item}</li>
    </ul>
  );
};
function ReportContainer({ cart }: { cart: Cart[] | undefined }) {
  const dispatch = useAppDispatch();
  const userInfoFlag = useAppSelector(selectUserUpdateFlag);
  const updatedPrices = useAppSelector(selectUpdatedPrices);
  const [cRep, setCrep] = useState<{
    total: number | "loading";
    benefit: number | "loading";
    qty: number | "loading";
  }>({
    total: "loading",
    benefit: "loading",
    qty: "loading",
  });

  function calcSum() {
    var cartReport: {
      total: number | "loading";
      benefit: number | "loading";
      qty: number | "loading";
    } = {
      total: "loading",
      benefit: "loading",
      qty: "loading",
    };
    var TrrpPrice: number = 0;
    var TSellingPrice: number = 0;
    var TotalNumber: number = 0;
    // cart?.map((item) => {
    //   const sellingPrice: number | undefined =
    //     updatedPrices?.[
    //       updatedPrices?.findIndex((it) => it?._id === item?.variantId)
    //     ]?.price?.selling_price;
    //   const rrpPrice: number | undefined =
    //     updatedPrices?.[
    //       updatedPrices?.findIndex((it) => it?._id === item?.variantId)
    //     ]?.price?.rrp_price;

    //   TrrpPrice += (rrpPrice ?? 0) * (item.quantity ?? 0);
    //   TSellingPrice += (sellingPrice ?? 0) * (item.quantity ?? 0);
    //   TotalNumber += item.quantity ?? 0;
    // });
    cart?.map((item) => {
      const sellingPrice: number | undefined = item.variant.price.selling_price;
      const rrpPrice: number | undefined = item.variant.price.rrp_price;
      TrrpPrice += (rrpPrice ?? 0) * (item.quantity ?? 0);
      TSellingPrice += (sellingPrice ?? 0) * (item.quantity ?? 0);
      TotalNumber += item.quantity ?? 0;
    });
    cartReport.total = TSellingPrice;
    cartReport.benefit = Math.abs(TrrpPrice - TSellingPrice);
    cartReport.qty = TotalNumber;
    setCrep(cartReport);
  }

  useEffect(() => {
    console.log("UpdatedPricesFlag:", userInfoFlag);
    if (userInfoFlag === "success") calcSum();
  }, [userInfoFlag]);
  useEffect(() => {
    console.log("cart, cart?.length:", cart, cart?.length);

    // checkUpdate();
    if (userInfoFlag === "success") calcSum();
  }, [cart, cart?.length]);

  const value: number = 115574;
  return (
    <>
      {cart !== undefined ? (
        <div className="mt-14 mb-4 md:flex flex w-full md:w-fit mx-2 rounded-md border shadow-lg">
          <ul className="flex flex-wrap w-fit justify-start m-4 font-Vazir-Medium">
            <li className="flex my-2 w-full">
              مبلغ کل :{" "}
              <span className="flex mx-2">
                {cRep.total === "loading"
                  ? LoadingSvg
                  : (cRep.total / 10).toLocaleString()}
              </span>{" "}
              تومان
            </li>
            <li className="flex my-2 w-full">
              سود شما از خرید :{" "}
              <span className="flex mx-2">
                {cRep.benefit === "loading"
                  ? LoadingSvg
                  : (cRep.benefit / 10).toLocaleString()}
              </span>{" "}
              تومان
            </li>
            <li className="flex my-2 w-full">
              هزینه ارسال و بسته بندی : <span className="flex mx-2">{0}</span>{" "}
              تومان
            </li>
            <li className="flex w-full border-b my-2"></li>
            <li className="flex my-2 w-full">
              قابل پرداخت :{" "}
              <span className="flex mx-2">
                {cRep.total === "loading"
                  ? LoadingSvg
                  : (cRep.total / 10).toLocaleString()}
              </span>{" "}
              تومان
            </li>
            <li className="flex my-2 justify-center w-full">
              <button className="bg-blackout-red w-fit rounded-md font-Vazir-Bold text-white p-4">
                ثبت سفارش و پرداخت
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

function CartContainer() {
  const userInfo = useSelector(selectUserInfo);
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

  return (
    <div className="flex text-sm md:text-lg flex-wrap w-full justify-center rounded-lg max-w-[400px] md:max-w-[800px]">
      {userInfo?.cart !== undefined ? (
        userInfo?.cart.map((cartItem, index) => (
          <>
            <CartItem
              key={index}
              cartItem={cartItem}
              handleReduceFromCart={handleReduceFromCart}
            />
          </>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

function CartItem({
  cartItem,
  handleReduceFromCart,
}: {
  cartItem: Cart;
  handleReduceFromCart: Function;
}) {
  const userInfo = useAppSelector(selectUserInfo);
  const userUpdateFlag = useAppSelector(selectUserUpdateFlag);

  const [price, setPrice] = useState<number | "loading" | "notAvailable">(
    "loading"
  );
  useEffect(() => {}, []);
  return (
    <div className="flex w-full items-center rounded-md border shadow-lg h-[250px] my-4">
      <div className="flex justify-center w-1/6">
        <button
          onClick={() => {
            handleReduceFromCart(cartItem.productId, cartItem.variantId);
          }}
          className="text-sm "
        >
          {cartItem.quantity} عدد
          <GoTrashcan color={"rgb(235,18,18)"} size={20} />
        </button>
      </div>
      <div className="flex w-auto">
        {" "}
        <Image
          className="flex md:w-[200px] md:h-[200px]  w-[100px] h-[100px] m-1 rounded-xl"
          loader={imageLoader}
          unoptimized
          quality="80"
          loading="eager"
          unselectable="on"
          draggable="false"
          placeholder="empty"
          src={imageAddress(
            cartItem?.ImageUrl,
            200,
            200,
            100,
            "webp",
            undefined
          )}
          alt={cartItem?.title_fa ?? "not-present"}
          width={100}
          height={100}
        />
      </div>
      <div className="flex w-4/6 h-full m-4 font-Vazir-Medium">
        <ul className="flex flex-wrap my-4 h-full w-4/6">
          <li className="my-2 flex w-full font-Vazir-Medium text-gray-500">
            {cartItem.title_fa}
          </li>
          <li className="my-2 flex w-full text-sm font-Vazir-Medium text-gray-500">
            {cartItem.variant.warranty}
          </li>
          {/* <li className="my-2 flex w-full">sss</li> */}
          <li className="my-2 flex w-full">
            <div className="input-color-container">
              {cartItem.variant.color.title}{" "}
              <input
                key="color"
                type={"color"}
                disabled
                className="input-color"
                value={cartItem.variant?.color?.hex_code}
              ></input>
            </div>
            <label className="mx-3 font-Vazir-Thin text-sm">
              {cartItem.variant.color.title}
            </label>
          </li>
        </ul>
        <div className="flex mx-2 flex-wrap justify-start w-2/6 h-full place-items-end">
          <div className="h-[200px]"></div>
          <div className="flex flex-wrap md:flex-nowrap h-fit w-full text-blackout-red my-4">
            <div className="flex h-fit w-fit mx-2 justify-end text-blackout-red">
              {userUpdateFlag !== "success" ? (
                <div className="flex h-[45px] w-[45px]"> {LoadingSvg}</div>
              ) : (
                ` ${
                  price === "notAvailable"
                    ? "ناموجود"
                    : (
                        cartItem.variant.price.selling_price / 10
                      )?.toLocaleString()
                }`
              )}{" "}
            </div>
            <div className="flex h-fit w-fit mx-2 justify-end text-cyan-400">
              تومان
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
