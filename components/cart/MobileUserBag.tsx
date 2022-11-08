import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import { selectCount } from "../../src/store/counterSlice";
import { FaShoppingBag } from "react-icons/fa";
import { Client } from "../../src/types/types";
import { selectUserInfo } from "../../src/store/slices/clientSlice";

export default function MobileUserBag() {
  const count = useAppSelector(selectCount);
  const bagElement = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const uerInfo: Client = useAppSelector(selectUserInfo);
  const [offsetY, setOffsetY] = useState<string>("");
  const [drop2, setDrop2] = useState<boolean>(false);

  const numb: string | undefined = String(
    document?.getElementById("bag-container")?.offsetLeft
  );

  useEffect(() => {}, [count, bagElement, offsetY, numb]);

  return (
    <div
      id="bag-container"
      onMouseEnter={() => {
        setDrop(true);
      }}
      onMouseLeave={() => {
        setDrop(false);
      }}
      ref={bagElement}
      className="flex justify-end w-1/2"
    >
      <button className="inline-flex p-2">
        <FaShoppingBag color="#48424966" size={30} />
        <span className="font-thin -mr-8 mt-4 font-serif inline-flex items-center justify-center px-[8px] py-[3px] text-xs  leading-none text-gray-100 bg-blackout-red2 rounded-full ">
          {count}
        </span>
      </button>
      <div
        style={{
          transition: "all 300ms ease-in-out",
          width: `${drop === true ? "300px" : "0%"}`,
          height: `${drop === true ? "300px" : "0%"}`,
          zIndex: "2",
          transform: `translate3d(0px,  50px, 0px)`,
        }}
        className={`fixed flex w-[300px] bg-transparent h-[300px] z-50 overflow-hidden `}
      >
        <div className="border rounded-xl mx-4 bg-white h-full w-full ">
          <div className="flex justify-start p-4 w-full h-4 font-Vazir-Medium">
            <span className="mx-2 font-Vazir-Medium">سبد خرید</span>
          </div>
        </div>
      </div>
    </div>
  );
}
