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
import { Client } from "../src/types/types";
import {
  Card,
  CardContent,
  CardMedia,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

export default function Other(props: any) {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  // const store = useStore()

  useEffect(() => {
    // dispatch(increment())
    // callMyfriend();
    // store.dispatch(incrementByAmount(0))
  }, []);

  return <></>;
}
