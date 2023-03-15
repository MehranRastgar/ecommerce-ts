import React, { useEffect, useState, useRef, useContext } from "react";
import Head from "next/head";

// import UserContext, { AddressContext } from "src/components/userContext";
// import Carty from "src/classes/cart";
import Router from "next/router";
// import Landing from "layouts/Landing";
import Link from "next/link";
import AddressBar from "./AddressBar";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../store/slices/clientSlice";
// import SettAddress from "src/components/address/SetAddress";
// import CheckoutBar from "src/components/checkoutBar/checkoutBar";
// import UserManagement from "src/classes/UserManagement";
// import AddressBar from "src/components/ShippingComponents/AddressBar";
// import TimingBar from "src/components/ShippingComponents/TimingBar";

const addressSchema = {
  lat: " ",
  lng: " ",
  postal_code: " ",
  county: " ",
  city: " ",
  region: " ",
  neighbourhood: " ",
  plaque: " ",
  unit: " ",
  loc_address: " ",
  address_compact: " ",
  description: " ",
  receiver_name: " ",
  receiver_phone: " ",
};

export default function Shipping() {
  const userInfo = useSelector(selectUserInfo);

  const [userAddress, setUserAddress] = useState();
  const [section, setSection] = useState(0);

  //const { register, handleSubmit } = useForm();
  const [updated, setUpdated] = useState(true);

  return (
    <>
      <div className="flex mt-0 w-full max-h-96 items-start justify-center ">
        {userInfo ? <AddressBar></AddressBar> : <></>}
      </div>
      <div className="flex mt-0 w-full max-h-96 items-start justify-center">
        {userInfo ? (
          <></>
        ) : (
          // <TimingBar setUpdated={setUpdated} userInfo={userInfo}></TimingBar>
          <></>
        )}
      </div>
    </>
  );
}

// export async function getServerSideProps(context) {
//   let user = context.query.user
//   if (!user) {
//     return {
//       redirect: {
//         destination: '/account/login',
//         permanent: false,
//       },
//     }
//   }
//   return {
//     props: {
//       user: user ?? undefined,
//     }, // will be passed to the page component as props
//   };
// }
