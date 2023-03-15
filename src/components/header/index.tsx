import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Menu from "./menu";
import Logo from "./Logo";
import Settings from "./Settings";
import SearchBar from "./SearchBar";
import CartIcon from "../cart/CartIcon";
import Language from "./language/Language";
import NavbarOne from "../headers/navbarOne";
import Header from "../headers/header";

const UserBox = dynamic(() => import("./user"), {
  ssr: false,
});
const Theme = dynamic(() => import("./theme/Theme"), {
  ssr: false,
});

var scrollBefore = 0;

interface Props {}

const Index: React.FC<Props> = (props) => {
  const [lastNumber, setLastNumber] = useState<number>(500);
  const [navHidden, setNavHidden] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  //================================================
  function scrollFunction() {
    var offsetY: number = window.pageYOffset;
    setLastNumber(window.pageYOffset);
    if (offsetY > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (scrollBefore - offsetY < 0) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
    scrollBefore = window.pageYOffset;
  }
  //================================================
  useEffect(() => {
    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction);
    };

    // configPage();
  }, []);

  return (
    <header className="md:fixed left-0 right-0 top-0 md:bg-palette-fill shadow-sm pt-4 z-[1000]">
      <div className="flex flex-col md:px-4 mb-2">
        <div className="flex items-center justify-between md:order-2 md:mt-2 relative">
          <Menu />
          {/* <div className="hidden md:flex topHeader flex-wrap w-full fixed items-start bg-transparent">
            <header
              className={`relative items-center flex flex-nowrap lg:flex-nowrap xl:flex-nowrap 2xl:flex-nowrap md:flex-nowrap sm:flex-wrap justify-start font-Vazir w-full filter bg-ino-lwhite z-[1] transition-all duration-500
              ${isScrolled === true ? "-mt-[55px] h-[60px] " : "h-[60px] "}
             
              `}
            >
              <Header />
            </header>
            <NavbarOne
              navHidden={navHidden}
              isScrolled={isScrolled}
            ></NavbarOne>
           
          </div>
          <div className="hidden md:flex w-full bg-transparent h-[100px]"></div>  */}
          <div className="md:hidden">
            <Logo />
          </div>
          <Settings /> {/* 👈settings: md:hidden */}
          <div className="hidden md:flex md:items-center md:justify-between">
            <Language />
            <Theme />
          </div>
        </div>
        <hr className="md:hidden" />
        <div className="mb-2 mt-4 md:mt-0 flex  items-center md:order-1">
          <div className="hidden md:block">
            <Logo />
          </div>
          <div className="flex-grow">
            <SearchBar />
          </div>
          <div className="ltr:ml-2 rtl:mr-2 sm:ltr:ml-4 sm:rtl:mr-4 flex items-center justify-between ">
            <UserBox />
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Index;
