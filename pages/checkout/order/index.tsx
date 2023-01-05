import mongoose from "mongoose";
import OrderModel from "../../../src/models/Order";
import { GetServerSideProps } from "next";
import { Order } from "../../../src/types/types";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { getOrders, selectOrders } from "../../../src/store/slices/orderSlice";
import { useEffect } from "react";
import Layout from "../../../components/Layout";

export default function OrderPage({
  orderData,
}: {
  orderData: Order[] | null;
}) {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(getOrders({ page: 0, perpage: 20 }));
  }, []);

  return (
    <>
      <Layout>
        <div>{orders?.length}</div>
      </Layout>
    </>
  );
}
