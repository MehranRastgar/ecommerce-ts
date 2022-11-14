import Link from "next/link";
import imageLoader from "../../src/imageLoader";
import Image from "next/image";
import { FaSearchengin } from "react-icons/fa";
import { BsForwardFill } from "react-icons/bs";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MobileUserTwinComponent } from "../search/MobileSearchComponent";
export default function Header() {
  return (
    <>
      <div className="mx-[80px]">
        <Link href={"/"}>
          <Image
            loader={imageLoader}
            alt="InoMal Logo"
            src={"/Asset12.png"}
            unoptimized
            width={160}
            height={100}
          />
        </Link>
      </div>
      <SearchComponent />
      <MobileUserTwinComponent />
    </>
  );
}

import Router, { useRouter } from "next/router";

export async function GoSearch(searchString: string) {
  if (searchString.length > 3) Router.push(`/search/?q=${searchString}&page=1`);
  else console.log("لطفا حد اقل 4 حرف وارد کنید");
}

function SearchComponent() {
  const [searchModal, setSearchModal] = useState(false);
  const [divSize, setDivSize] = useState<string>("0");
  const [searchString, setSearchString] = useState<string>("");

  // const numb: string | undefined = String(
  //   document?.getElementById("mydiv")?.offsetWidth
  // );

  function enterChecker(key: string) {
    setSearchModal(true);

    if (key === "Enter" || key === "Escape") {
      GoSearch(searchString);
      setSearchModal(false);
    }
  }

  useEffect(() => {
    // console.log("numbnumbnumbnumb", numb);
    console.log(searchString);
  }, [searchString]);

  return (
    <>
      {searchModal === true ? (
        <div
          onClick={() => {
            setSearchModal(false);
          }}
          className="fixed z-[1] top-0 left-0 w-screen bg-black/25 h-screen"
        ></div>
      ) : (
        <></>
      )}
      <div className="w-2/3 z-[2]">
        <div
          id={"mydiv"}
          onClick={() => setSearchModal(true)}
          className={`flex items-center md:max-w-[720px]  p-2 rounded-xl m-2  h-[40px] ${
            searchModal === true
              ? "rounded-b-none z-[2] h-[42px] bg-gray-100"
              : "bg-gray-200"
          }`}
        >
          <FaSearchengin
            onClick={() => GoSearch(searchString)}
            color={`#010101`}
            size={25}
          />
          <div className="mx-2 py-4 border-r border-gray-600 h-[40] "></div>
          <input
            type={"search"}
            placeholder={"جستجو"}
            style={{
              transition: "height 1.2s ease-in-out",
              outlineStyle: "none",
            }}
            onKeyDown={(e) => enterChecker(e?.key ?? "nothing")}
            onChange={(e) => setSearchString(e.target.value)}
            className={`flex w-full focus:w-full  h-[40px] bg-transparent p-2 text-slate-600  ${
              searchModal === true ? "rounded-b-none z-[2]" : ""
            }`}
          ></input>
        </div>
      </div>
    </>
  );
}
function SearchModal({
  setSearchModal,
  searchModal,
  divSize,
}: {
  setSearchModal: any;
  searchModal: any;
  divSize: string;
}) {
  // const [styler, setStyler] = useState<string>();
  const style: string = `fixed flex items-center md:max-w-[720px] w-full flex-wrap rounded-t-none items-start p-2 rounded-xl -mt-2 m-2 bg-gray-100 ${
    searchModal === true
      ? `h-[110px] z-[3]`
      : `h-[10px] overflow-hidden -translate-y-4  bg-gray-200  -z-[1]`
  }`;

  return (
    <div
      style={{
        transition: "height 0.5s ease-in-out",
      }}
      className={style}
    >
      <>
        <div className="border-t-2 px-2 z-[3] border-blackout-black w-full"></div>
        <div className="  z-[3]">
          <button
            onClick={() => {
              setSearchModal(false);
            }}
          >
            <BsForwardFill
              onClick={() => setSearchModal(false)}
              color="#5c5c5c"
              size={30}
            />{" "}
          </button>
        </div>
      </>
    </div>
  );
}
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import UserContext from "src/components/userContext";
// import Breadcrumbs from "nextjs-breadcrumbs";
// import SearchForm from "../search/search-form";
// import { BsCart, BsArrowLeft } from "react-icons/bs";
// import Image from "next/image";
// import { isArray } from "lodash";
// import TempCart from "src/classes/TempCart";
// const tempcart = new TempCart();
// import { GoTrashcan } from "react-icons/go";
// import { IoMdRemoveCircle } from "react-icons/io";
// import Router, { useRouter } from "next/router";
// import UserManagement from "src/classes/UserManagement";

// const UserM = new UserManagement();

// import logo from "src/images/logo.png";

// const Example = () => {
//   return (
//     <Breadcrumbs
//       useDefaultStyle
//       transformLabel={(title) => title + " Custom Label"}
//       activeItemClassName="brActive"
//       omitRootLabel={true}
//       rootLabel="Home"
//     />
//   );
// };
// // components

// export default function HeaderStats() {
//   // const {
//   //   sett: [settings, setSettings],
//   //   carty: [cardItems, setCardItems],
//   //   user: [user],
//   // } = useContext(UserContext);
//   // const [ismenuvisible, setIsmenuvisible] = useState(false);
//   const [blur, setBlur] = useState(false);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     // getSettings(setSettings);
//     // console.log(settings);
//   }, []);

//   return (
//     <>
//       <header
//         className="fixed flex flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap md:flex-nowrap sm:flex-wrap justify-start font-Vazir
//             w-full
//             filter  bg-white/95
//             border-b-2
//             z-50
//             "
//       >
//         <div className="flex-none flex-wrap self-start overflow-hidden items-center justify-end my-4">
//           <Link href="https://www.shopsoo.ir/">
//             <a
//               className="flex  text-white items-end
//                 font-Vazir-bold   text-3xl "
//             >
//               <div
//                 onMouseEnter={(event) => {
//                   setShowAll(true);
//                 }}
//                 onMouseLeave={(event) => {
//                   setShowAll(false);
//                 }}
//                 className="flex   w-64 items-start justify-start "
//               >
//                 {
//                   <h1
//                     className={` font-Righteous w-full transition-all duration-300 ease-linear text-3xl mr-10 hover:text-teal-600 ${
//                       showAll ? "text-teal-400" : "text-teal-400"
//                     } `}
//                   >
//                     Shopsoo
//                   </h1>
//                 }
//                 {/* <Image
//                   src={logo}
//                   alt="categories"
//                   title="categories"<AddBusinessIcon></AddBusinessIcon>
//                   width="220"
//                   height="44"
//                 /> */}
//               </div>
//             </a>
//           </Link>
//         </div>
//         <div className="flex justify-center w-full max-w-3xl min-w-2xl items-center">
//           <SearchForm settings={settings} setBlur={setBlur} />
//         </div>
//         <div className="flex justify-center w-full">
//           <HeaderInfo
//             profile={user?.userName}
//             cart={cardItems?.qty}
//             setCardItems={setCardItems}
//           ></HeaderInfo>
//         </div>

//         {/* {blur ? (
//                 <div
//                   className="fixed right-0 h-full w-full z-30 backdrop-brightness-50"
//                   onClick={(e) => {
//                     setBlur(false);
//                   }}
//                 ></div>
//               ) : (
//                 <></>
//               )} */}
//       </header>
//     </>
//   );
// }

// function HeaderInfo({ cart, profile, setCardItems }) {
//   const [cartDropdown1, setCartDropdown1] = useState(false);
//   const [mouseInter, setMouseInter] = useState(false);
//   const [userName, setUserName] = useState("");
//   const [activeCartDropdown, setActiveCartDropdown] = useState();
//   const router = useRouter();

//   async function SetUser() {
//     const userInfos = await UserM.getUserInfoFromLocalStorage();
//     setUserName(userInfos.firstname);
//     // console.log(UserM.userInfo);
//   }
//   async function checkCartDropdownActiveOrNot() {
//     if (router.asPath == "/checkout/cart") {
//       setActiveCartDropdown(false);
//     } else {
//       setActiveCartDropdown(true);
//     }
//   }
//   useEffect(() => {
//     checkCartDropdownActiveOrNot();
//   }, [router.asPath]);
//   useEffect(() => {
//     SetUser();
//     // getSettings(setSettings);
//     // console.log(settings);
//   }, []);
//   return (
//     <>
//       <div className="flex flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap md:flex-nowrap sm:flex-wrap  w-64 items-center justify-end  ">
//         <Link href="/profile">
//           <a>
//             <button className="px-2 py-1  flex justify-center hover:bg-gray-400 border mx-2 w-auto rounded-md ">
//               <Profile className="" />
//               <h1 className="  text-base  rounded-full">
//                 {userName ?? "کاربر میهمان"}
//               </h1>
//             </button>
//           </a>
//         </Link>

//         <button
//           onClick={(event) => {
//             if (!mouseInter) Router.push("/checkout/cart");
//           }}
//           onMouseLeave={(event) => {
//             setCartDropdown1(false);
//           }}
//           onMouseEnter={(event) => {
//             setCartDropdown1(true);
//           }}
//           className="px-2 py-1 flex justify-around hover:bg-gray-400  mx-4 w-auto rounded-md"
//         >
//           <h1 className="px-1 pt-1 border border-white translate-y-3 -translate-x-2 flex rounded-md   text-sx font-light items-center font-Vazirmatn text-white bg-brand-red">
//             {cart ? cart : "0"}
//           </h1>

//           <BsCart size={25} />

//           {cartDropdown1 & activeCartDropdown ? (
//             <div className="flex-wrap items-center overflow-hidden rounded-xl absolute z-[20] flex justify-center  h-3/7 max-w-xl border shadow-lg translate-y-10 mx-4 w-full left-0 bg-white ">
//               <Link href="/checkout/cart">
//                 <a>
//                   <div className="flex w-full flex-nowrap items-center justify-end">
//                     <h3 className="text-end text-cyan-500 text-xl font-Vazirmatn mt-5">
//                       {" "}
//                       مشاهده سبد خرید{" "}
//                     </h3>
//                     <BsArrowLeft
//                       size={25}
//                       className="text-cyan-500 mx-2 mt-5"
//                     />
//                   </div>
//                 </a>
//               </Link>
//               <div
//                 onMouseLeave={(event) => {
//                   setMouseInter(false);
//                 }}
//                 onMouseEnter={(event) => {
//                   setMouseInter(true);
//                 }}
//                 className=" flex-wrap   justify-start h-96  w-full border overflow-y-auto rounded-b-lg bg-gray-50  mt-10 overflow-auto
//                   hidden lg:flex xl:flex 2xl:flex md:flex sm:hidden
//                   "
//               >
//                 <CartDropdown
//                   setDropdown={setCartDropdown1}
//                   setCardItems={setCardItems}
//                 ></CartDropdown>
//               </div>
//             </div>
//           ) : (
//             <></>
//           )}
//         </button>
//       </div>
//     </>
//   );
// }

// function CartDropdown({ setDropdown, setCardItems }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   async function getItems() {
//     // setCartItems(await CartClass.readCarts())
//     setIsLoading(true);
//     const cartObject = await CartClass.getAndSetItems();
//     setCardItems({ qty: cartObject.cartCount });
//     setCartItems(cartObject.cartItems);
//     setIsLoading(false);
//   }
//   async function RemoveFromCart(item) {
//     // tempcart.SetItemsInLocalStorage(await tempcart.removeItem(item.productId, await tempcart.GetItemsFromLocalStorage()))
//     await CartClass.removeFromCart(item.productId);
//     const cartObject = await CartClass.getAndSetItems();
//     setCardItems({ qty: cartObject.cartCount });
//     setCartItems(cartObject.cartItems);
//   }
//   useEffect(() => {
//     getItems();
//   }, []);

//   return (
//     <>
//       <div className=" m-1 max-w-xl flex flex-wrap justify-center transition-all duration-1000 w-full">
//         {cartItems.length ? (
//           cartItems.map((cart, index) => {
//             return (
//               <>
//                 <div
//                   key={`cart-items-${index}`}
//                   className="flex rounded-xl  bg-white  mx-1 my-3 justify-center w-11/12 items-center border hover:border-2 max-h-32 overflow-hidden"
//                 >
//                   <Link href={cart.ProductUrl}>
//                     <a className="flex flex-wrap items-center">
//                       <div className="flex  w-full items-center">
//                         <div className="flex w-auto ">
//                           <Image
//                             loading="lazy"
//                             src={cart.ImageUrl}
//                             width={100}
//                             height={100}
//                             alt="article"
//                             objectFit="scale-down"
//                           />
//                         </div>
//                         <div className="flex text-cyan-500 font-Vazirmatn ml-2 w-auto">
//                           {(Number(cart.Price) / 10).toLocaleString()}
//                           <span className="mx-2">تومان</span>
//                         </div>
//                         <div className="flex m-2 text-red-500 font-Vazirmatn font-bold w-auto">
//                           {cart.quantity}عدد
//                         </div>
//                       </div>
//                       <div className="flex w-full p-1 font-Vazirmatn font-bold text-sm">
//                         {cart?.sku}
//                       </div>
//                     </a>
//                   </Link>
//                   <button
//                     onClick={(event) => {
//                       RemoveFromCart(cart);
//                     }}
//                   >
//                     {cart.quantity > 1 ? (
//                       <IoMdRemoveCircle
//                         size={20}
//                         className="flex m-4  transition-transform ease-out duration-500 rounded-full hover:text-red-600 hover:scale-125 text-red-400"
//                       ></IoMdRemoveCircle>
//                     ) : (
//                       <GoTrashcan
//                         size={20}
//                         className="flex transition-transform ease-out duration-500 hover:text-red-600 hover:scale-125 text-red-400"
//                       ></GoTrashcan>
//                     )}
//                   </button>
//                 </div>
//               </>
//             );
//           })
//         ) : (
//           <>
//             {!isLoading ? (
//               <div className="flex w-full h-full items-center justify-center  text-center ">
//                 <div className=" items-center w-full font-Vazirmatn font-bold text-xl text-center text-gray-500">
//                   سبد شما خالی میباشد
//                 </div>
//               </div>
//             ) : (
//               <div className="flex w-full justify-center items-center scale-150">
//                 {loadingSvg}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </>
//   );
// }

// const loadingSvg = (
//   <svg
//     role="status"
//     className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-red-600 fill-cyan-500"
//     viewBox="0 0 100 101"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//       fill="currentColor"
//     />
//     <path
//       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//       fill="currentFill"
//     />
//   </svg>
// );
