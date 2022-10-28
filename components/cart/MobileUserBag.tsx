import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import { selectCount } from "../../src/store/counterSlice";
import { FaShoppingBag } from "react-icons/fa";

export default function MobileUserBag() {
  const count = useAppSelector(selectCount);
  useEffect(() => {
    console.log("updated count in bag");
  }, [count]);

  return (
    <div className="w-1/2">
      <button className="inline-flex p-2">
        <FaShoppingBag color="#48424966" size={30} />
        <span className="font-thin -mr-8 mt-4 font-serif inline-flex items-center justify-center px-[8px] py-[3px] text-xs  leading-none text-gray-100 bg-blackout-red2 rounded-full ">
          {count}
        </span>
      </button>
    </div>
  );
}
