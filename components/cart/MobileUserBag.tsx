import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from "../../src/store/counterSlice";
import { FaShoppingBag } from "react-icons/fa";

export default function MobileUserBag() {
  const count = useAppSelector(selectCount);
  useEffect(() => {
    console.log("updated count in bag");
  }, [count]);

  return (
    <div className="w-1/2">
      <button className="inline-flex p-2">
        <FaShoppingBag color="#f99e23" size={30} />
        <span className="-mr-8 mt-4  inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-100 bg-blackout-red2 rounded-full ">
          {count}
        </span>
      </button>
    </div>
  );
}
