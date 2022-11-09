import { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../src/store/hooks";
import { selectCount } from "../../src/store/counterSlice";
import { FaShoppingBag } from "react-icons/fa";
import { Client } from "../../src/types/types";
import { selectUserInfo } from "../../src/store/slices/clientSlice";

export default function MobileUserBag() {
  const [count, setCount] = useState(0);
  const bagElement = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState<boolean>(false);
  const userInfo: Client = useAppSelector(selectUserInfo);
  const [offsetY, setOffsetY] = useState<string>("");
  const [drop2, setDrop2] = useState<boolean>(false);

  const numb: string | undefined = String(
    document?.getElementById("bag-container")?.offsetLeft
  );

  useEffect(() => {
    setCount(userInfo?.cart?.length ?? 0);
  }, [bagElement, offsetY, numb, userInfo]);

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
          opacity: `${drop === true ? "100%" : "0%"}`,
          width: `${true === true ? "30%" : "0%"}`,
          height: `${drop === true ? "40%" : "0%"}`,
          zIndex: "2",
          transform: `translate3d(0px,  50px, 0px)`,
        }}
        className={`fixed flex justify-center bg-transparent z-50`}
      >
        <div className="flex border rounded-xl mx-2 bg-white h-[98%] w-full overflow-hidden ">
          <div className="flex flex-wrap justify-start p-2 w-full font-Vazir-Medium ">
            <span className="mx-2 font-Vazir-Medium text-brand-purple">
              سبد خرید
            </span>
            <div className="flex flex-wrap h-[90%] p-2 rounded-xl bg-white overflow-y-auto  items-center justify-center w-full">
              {userInfo?.cart !== undefined && userInfo?.cart?.length > 0 ? (
                <>
                  {userInfo?.cart?.map((cartItem) => (
                    <>
                      <div className="flex my-2 p-2 rounded-xl border w-full text-xs font-Vazir-Medium overflow-hidden">
                        <div className="flex h-fit w-1/4 ">{cartItem.sku}</div>
                        <div className="flex h-fit w-1/4 ">
                          {cartItem.quantity}
                        </div>
                        <div className="flex h-fit w-1/4 ">
                          {cartItem.Price}
                        </div>
                        <div className="flex h-fit w-1/4 ">
                          {cartItem?.quantity !== undefined &&
                          cartItem?.quantity > 1 ? (
                            <button onClick={() => {}} className="text-sm">
                              reduce
                            </button>
                          ) : (
                            <button onClick={() => {}} className="text-sm">
                              remove
                            </button>
                          )}
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <span className="flex w-full h-full items-center mx-2 text-3xl text-gray-300 font-Vazir-Medium">
                  خالی...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
