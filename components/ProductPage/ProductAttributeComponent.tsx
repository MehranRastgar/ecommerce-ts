import { ComponentProps } from "react";
import { Product } from "../../src/types/types";
import { CartSection } from "./ProductInfoSection";

type attributeObj = {
  name: string;
  options: string;
};
const titleContainer =
  "flex flex-col my-1 w-11/12  text-xl  	font-IBM text-gray-800";
export default function ProductAttributeComponent({
  product,
}: {
  product: Product;
}) {
  var keys = Object.keys(product.attributext);
  var values = Object.values(product.attributext);
  let i = 0;

  var attributeName: attributeObj[] = [];
  keys.map(function (attribute, index) {
    attributeName.push({ name: attribute, options: values[index] });
  });

  //

  return (
    <div
      id="espicification"
      className="flex flex-col justify-center mt-20 max-w-[1200px] md:w-[85%] w-11/12 items-center border rounded-xl p-4 shadow-lg"
    >
      <h2 className="h2 font-Vazir-Medium my-12 text-blue-600">مشخصات فنی</h2>
      <div className={titleContainer}>
        <div className="flex md:flex-col  justify-center my-1 w-full  text-lg font-bold  text-gray-800">
          <NumberList attributeName={attributeName}></NumberList>
        </div>
      </div>
    </div>
  );
}

function NumberList({ attributeName }: { attributeName: attributeObj[] }) {
  console.log();
  const listItems = attributeName?.map((number, index) => (
    <>
      <ul
        className={`flex flex-wrap md:flex-wrap-row justify-start items-start   ${
          index % 2 ? "bg-white" : "bg-gray-100"
        } mx-4 font-Vazirmatn border border-white hover:border-black`}
      >
        <li
          className={`flex flex-wrap md:flex-wrap-row items-center w-full md:w-1/2  p-2  bg-transparent   text-base font-Vazirmatn font-bold px-10`}
        >
          {number.name == "brand" ||
          number.name == "warranty" ||
          number.name == "suggestion" ||
          number.name == "seller"
            ? ""
            : `${number.name
                ?.replace("-", " ")
                ?.replace("-", " ")
                ?.replace("-", " ")}`}
        </li>
        {/* <p className="m-0 mx-4">
		{number.name=="brand"||number.name=="warranty"||number.name=="suggestion"||number.name=="seller"?"":
		"   :   "}
		</p> */}
        <li
          className={`flex  flex-wrap md:flex-wrap-row items-center w-full md:w-1/2  p-2   bg-transparent   text-black text-base font-normal px-10`}
        >
          {number.name == "brand" ||
          number.name == "warranty" ||
          number.name == "suggestion" ||
          number.name == "seller"
            ? ""
            : `${number.options}`}
        </li>
      </ul>
    </>
  ));

  return <ul>{listItems}</ul>;
}
