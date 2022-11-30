import Router from "next/router";
import { BsHeadset, BsWhatsapp } from "react-icons/bs";
import { TbBrandTelegram } from "react-icons/tb";
import { FiInstagram } from "react-icons/fi";

export default function FooterMain() {
  return (
    <footer className="footer flex justify-center h-[500px]">
      <div className="flex flex-wrap justify-center max-w-[500px]">
        <FooterSocial />
        <FooterDescription />
        <FooterCallUs />
        <FooterClick />
      </div>
    </footer>
  );
}

function FooterDescription() {
  return (
    <div className="flex w-full items-center justify-center font-Vazir-Bold">
      <span className="flex w-full m-4 text-justify ">
        هدف ما ایجاد تجربه ای رضایت بخش در خرید اینترنتی میباشد در صورتی که
        مایلید ایده های خودتون رو با ما در میان بگذارید، از طریق whatsapp یا
        telegram با ما در ارتباط باشید.
      </span>
      {/* <BsHeadset size={25} /> */}
    </div>
  );
}
function FooterCallUs() {
  return (
    <>
      <div className="flex w-full items-center justify-center font-Vazir-Bold">
        پشتیبانی
      </div>
      <div className="flex w-full items-center justify-center font-Vazir-Bold">
        <span className="m-2">
          {" "}
          <a
            href="tel:02174037600"
            style={{
              direction: "ltr",
            }}
            className="justify-end text-justify"
          >
            02174037600
          </a>
        </span>

        <BsHeadset size={25} />
      </div>
    </>
  );
}

function FooterSocial() {
  return (
    <div className="flex w-full ">
      <ul className="flex text-white justify-around w-full my-10">
        <li className="p-4 rounded-2xl border h-fit w-fit">
          <TbBrandTelegram size={35} />
        </li>
        <li className="p-4 rounded-2xl border h-fit w-fit">
          <FiInstagram size={35} />
        </li>
        <li className="p-4 rounded-2xl border h-fit w-fit">
          <BsWhatsapp size={35} />
        </li>
      </ul>
    </div>
  );
}

function FooterClick() {
  return (
    <div className="flex">
      <ul className="flex w-full justify-around mx-5 p-2 font-Vazir-Medium h-fit cursor-pointer">
        <li
          onClick={() => {
            Router.push("/aboutus");
          }}
          className="flex p-2"
        >
          درباره ما
        </li>
        <li className="border-r"></li>
        <li
          onClick={() => {
            Router.push("/contactus");
          }}
          className="flex p-2"
        >
          تماس با ما
        </li>
        <li className="border-r"></li>
        <li
          onClick={() => {
            Router.push("/crm");
          }}
          className="flex p-2"
        >
          پشتیبانی
        </li>
      </ul>
    </div>
  );
}
