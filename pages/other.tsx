// import { GetServerSideProps } from "next";
// import { useDispatch, useStore} from 'react-redux'
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useAppSelector, useAppDispatch } from "../src/store/hooks";
import {
  decrement,
  incrementByAmount,
  selectCount,
} from "../src/store/counterSlice";
import { setMobile, setUserInfo } from "../src/store/slices/clientSlice";
import { Client } from "../src/types/types";

export default function Other(props: any) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  // const store = useStore()

  useEffect(() => {
    // dispatch(increment())
    console.log("other page useEffect");
    dispatch(incrementByAmount(1));
    dispatch(setMobile(9120225594));
    dispatch(setUserInfo(userInfoConst));
    // callMyfriend();
    // store.dispatch(incrementByAmount(0))
  }, []);

  return (
    <div
      onClick={(e) => {
        dispatch(decrement());
      }}
    >
      <Link href={"/"}>
        <div>get back</div>
      </Link>
      {count}
      eeee
    </div>
  );
}

const userInfoConst: Client = {
  _id: { $oid: "6288dfff5b38281f3a82edec" },
  usernamebyphone: 9120225594,
  firstname: "Mehran",
  lastname: "Rastgar",
  __v: 15,
  nationalId: "0012577499",
  viewCounter: 273,
  addresses: [
    {
      title: "منزل",
      lat: 51.40948842221406,
      lng: 35.68178873444152,
      postal_code: 0,
      province: "تهران",
      city: "تهران",
      county: "",
      district: "",
      region: "",
      neighbourhood: "نازی آباد",
      plaque: 40,
      unit: 1,
      loc_address: "",
      description: "",
      address_compact: "ایران، تهران، منطقه ۱۲ شهر تهران، محله سنگلج، بهشت",
      receiver_name: " مهران ",
      receiver_family: "راستگار",
      receiver_phone: "09120225594",
      _id: { $oid: "62eb0d0271c04c6e291f1d3a" },
    },
    {
      title: "office",
      lat: 51.40228271484376,
      lng: 35.70105636868033,
      postal_code: 23431312,
      province: "tehran",
      city: "tehran",
      county: "",
      district: "",
      region: "",
      neighbourhood: "naziabad",
      plaque: 22,
      unit: 85,
      loc_address: "",
      description: "",
      address_compact:
        "ایران، تهران، منطقه ۱۱ شهر تهران، انقلاب اسلامی، کافی شاپ مهر و ماه",
      receiver_name: "mehran",
      receiver_family: "rastgar",
      receiver_phone: "0912022333333",
      _id: { $oid: "631c3fb0cd8073c614f60635" },
    },
    {
      title: "خانه",
      lat: 51.3636589050293,
      lng: 35.672752836909616,
      postal_code: 1819989111,
      province: "تهران",
      city: "تهران",
      county: "",
      district: "",
      region: "",
      neighbourhood: "نازی آباد",
      plaque: 22,
      unit: 32,
      loc_address: "",
      description: "",
      address_compact:
        "ایران، تهران، منطقه ۱۰ شهر تهران، محله سلیمانی - تیموری، منصور گرشاسبی",
      receiver_name: " مهران ",
      receiver_family: "راستگار",
      receiver_phone: "09154445",
      _id: { $oid: "62eb8a4771c04c6e291f2d94" },
    },
  ],
  cart: [
    {
      productId: "6320e17ef567489d7af9a115",
      quantity: 1,
      DateTime: 16,
      ImageUrl:
        "https://api.bugtech.ir/api/image?x=500&y=500&q=100&t=webp&path=images/pro/laptop/28277808/undefined-0.jpg",
      Price: 162999000,
      ProductUrl:
        "/pro/6320e17ef567489d7af9a115/لپ-تاپ-15.6-اینچی-لنوو-مدل-V15-SC",
      sku: "LENOVO V15-SC 15.6 inch laptop",
    },
    {
      productId: "631d9a02847de09995cadcdb",
      quantity: 1,
      DateTime: 1,
      ImageUrl:
        "https://api.bugtech.ir/api/image?x=500&y=500&q=100&t=webp&path=images/pro//27480318/undefined-0.jpg",
      Price: 58400000,
      ProductUrl:
        "/pro/631d9a02847de09995cadcdb/لپ-تاپ-15.6-اینچی-ایسوس-مدل-TUF-Gaming-FX507ZR-HQ033",
      sku: "Asus-TUF-Gaming-FX507ZR-HQ033-15.6-inch-laptop",
    },
  ],
  PrimaryAddressNumber: 0,
};

function callMyfriend() {
  // var myHeaders = new Headers();
  // myHeaders.append(
  //   "Authorization",
  //   "Bearer 79|Qm2F36Ju60eICV7V6gak3mOreDbvTT1yje50pK7YBearer 102|BRjBUYxNKFtJ5s8jcHHg1mI7veb6JZU1lZZ9R4gA"
  // );
  // myHeaders.append("Accept", "application/json");
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("X-CSRF-TOKEN", "meta[name='csrf-token'][content]");
  // var raw = JSON.stringify({
  //   _token: "{{ csrf_token() }}",
  //   star: "3",
  //   startAt: "1401/08/06",
  //   finishAt: "1401/08/11",
  //   featureIds: [],
  //   sort: "highDiscount",
  // });
  // var requestOptions = {
  //   method: "POST",
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: "follow",
  // };
  // fetch("https://hamkar.safarnet.net/api/v1/hotel/search", requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // setResult(data.result)
  //     console.log(data);
  //   })
  //   .catch((error) => console.log("error", error));
  // var myHeaders = new Headers();
  //       myHeaders.append("Authorization", "Bearer 104|1RAEWK6pzv6e5jR5DSCzT9eqgQsGMgtSstidTTyZ");
  //       myHeaders.append("Accept", "application/json");
  //       myHeaders.append("Content-Type", "application/json");
  //       var raw = JSON.stringify({
  //         // "_token": "{{ csrf_token() }}",
  //         "star": "3",
  //         "startAt": "1401/08/06",
  //         "finishAt": "1401/08/11",
  //         "featureIds": [],
  //         "sort": "highDiscount"
  //       });
  //       var requestOptions:RequestInit = {
  //         method: 'POST',
  //         headers: myHeaders,
  //         body: raw,
  //         redirect: 'follow'
  //       };
  //       fetch("http://hamkar.safarnet.net/api/v1/hotel/search",requestOptions )
  //         .then(response => response.json())
  //         .then(data => {
  //           // setResult(data.result)
  //           console.log(data)
  //         })
  //         .catch(error => console.log('error', error));
  // var axios = require('axios');
  // var data =  JSON.stringify({
  //   "star": "3",
  //   "startAt": "1401/08/02",
  //   "finishAt": "1401/08/05",
  //   "featureIds": [],
  //   "sort": "highDiscount"
  // });
  // var config = {
  //   method: 'post',
  //   url: 'https://hamkar.safarnet.net/api/v1/hotel/search',
  //   headers: {
  //     'Authorization': 'Bearer 79|Qm2F36Ju60eICV7V6gak3mOreDbvTT1yje50pK7YBearer 102|BRjBUYxNKFtJ5s8jcHHg1mI7veb6JZU1lZZ9R4gA',
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   data : data
  // };
  // axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}
