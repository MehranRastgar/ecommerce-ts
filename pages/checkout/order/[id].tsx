import mongoose from "mongoose";
import OrderModel from "../../../src/models/Order";
import { GetServerSideProps } from "next";
import { Order } from "../../../src/types/types";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  getOrderById,
  selectSpecOrder,
} from "../../../src/store/slices/orderSlice";

export default function OrderPage({ orderId }: { orderId: string | null }) {
  const dispatch = useAppDispatch();
  const orderData = useAppSelector(selectSpecOrder);
  useEffect(() => {
    if (orderId !== null) dispatch(getOrderById(orderId));
  }, []);
  useEffect(() => {
    console.log(orderData);
  }, [orderData]);

  return (
    <>
      <div className="flex w-full font-Vazir-Medium ">
        تومان {(Number(orderData?.price) / 10).toLocaleString()}
      </div>
      <br />
      <div>{orderId}</div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      orderId: context?.query?.id ?? 0,
    },
  };
};
