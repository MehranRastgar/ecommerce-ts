import React, { useEffect } from "react";
// import Router from "next/router";

import Layout from "../components/Layout";

export default function Error404() {
  useEffect(() => {
    //Router.push("/");
  });

  return (
    <>
      <Layout>page not found</Layout>
    </>
  );
}
