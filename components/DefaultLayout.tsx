import React, { useEffect, useState } from "react";
import Header from "./headers/header";
import NavbarMobile from "./headers/navbarMobile";
import NavbarOne from "./headers/navbarOne";
import { isMobile } from "react-device-detect";

function DefaultLayout({ children }: { children: any }) {
  const [ismob, setIsmob] = useState<string>();
  const ismobact = isMobile === true ? "true" : "false";

  useEffect(() => {}, [ismob]);

  return (
    <div>
      <Header></Header>
      {ismob === "true" ? (
        <NavbarMobile></NavbarMobile>
      ) : (
        <NavbarOne></NavbarOne>
      )}
      {children}
    </div>
  );
}

export default DefaultLayout;
