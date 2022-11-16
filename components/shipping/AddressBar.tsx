import React, { useEffect, useState, useContext } from "react";
import {
  IoIosRadioButtonOn,
  IoIosRadioButtonOff,
  IoIosAddCircleOutline,
} from "react-icons/io";
import Map from "../map/Map";

import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  selectUserInfo,
  selectUserUpdateFlag,
  updateUserData,
} from "../../src/store/slices/clientSlice";
import { useAppDispatch } from "../../src/store/hooks";
import { Client } from "../../src/types/types";
import LoadingOne, { LoadingTwo } from "../loader/default";

export default function AddressBar() {
  const userInfo = useSelector(selectUserInfo);
  const [addressSelection, setAddressSelection] = useState(false);

  useEffect(() => {}, [userInfo]);

  return (
    <section className=" flex	flex-wrap w-full	max-w-4xl	border rounded-lg items-start p-4">
      <h1 className="text-xl font-Vazirmatn font-bold text-brand-cyan w-full">
        آدرس
      </h1>
      <div>
        <h2 className="text-md font-Vazirmatn font-bold text-gray-600 p-2">
          {" "}
          {userInfo?.addresses !== undefined
            ? userInfo?.addresses[userInfo?.PrimaryAddressNumber ?? 0]
                ?.address_compact
            : "0"}
        </h2>
        <h3 className="text-md font-Vazirmatn font-bold text-gray-400	p-2">
          {userInfo?.addresses !== undefined
            ? userInfo?.addresses[userInfo?.PrimaryAddressNumber ?? 0]
                ?.receiver_name
            : "0"}
          {userInfo?.addresses !== undefined
            ? userInfo?.addresses[userInfo?.PrimaryAddressNumber ?? 0]
                ?.receiver_family
            : "0"}
        </h3>
        <h3 className="text-md font-Vazirmatn font-bold text-gray-400	p-2">
          {userInfo?.addresses !== undefined
            ? userInfo?.addresses[userInfo?.PrimaryAddressNumber ?? 0]
                ?.receiver_phone
            : "0"}
        </h3>
      </div>
      <div className="flex justify-end w-full">
        <button
          onClick={(event) => {
            setAddressSelection(true);
          }}
          className="px-4 rounded-lg hover:bg-gray-200 self-end text-md font-Vazirmatn font-bold text-blue-400	p-2"
        >
          تغییر آدرس
        </button>
      </div>
      {addressSelection ? (
        <>
          {" "}
          <AddressModal
            // setUpdated={props.setUpdated}
            setAddressSelection={setAddressSelection}
            // userInfo={userInfo}
          />
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

function AddressModal({ setAddressSelection }: { setAddressSelection: any }) {
  const userInfo = useSelector(selectUserInfo);
  // const [clickOutside, setClickOutside] = useState(false);
  const [clickInside, setClickInside] = useState(false);
  const [newAddress, setNewAddress] = useState(100);
  const [edit, setEdit] = useState(100);
  // const [hScale, setHScale] = useState(4);

  function handleChangePrimaryAddress({ index }: { index: number }) {}

  useEffect(() => {}, []);

  return (
    <>
      <div
        onClick={(event) => {
          setAddressSelection(false);
        }}
        className={`fixed justify-center items-center border rounded-lg left-0 top-0  z-50 w-full h-full   bg-transparent  backdrop-blur-sm backdrop-brightness-75 `}
      ></div>

      <div
        // onDoubleClick={(event)=>{props.setAddressSelection(false)}}
        className="fixed left-0 top-20  flex border rounded-lg w-full h-4/6 max-h-2/3 bg-white    z-[51]"
      >
        {edit == 100 && newAddress == 100 ? (
          <div className="flex flex-wrap	w-full h-full p-4  ">
            <div className="flex items-center justify-center w-full border-b">
              <h1 className="flex text-xl font-Vazirmatn font-bold text-cyan-400 p-4 w-1/3">
                انتخاب آدرس
              </h1>
              <div className="flex justify-end w-2/3 ">
                <button
                  onClick={(event) => {
                    setAddressSelection(false);
                  }}
                >
                  <AiOutlineClose
                    size={25}
                    className="text-black left-0 flex"
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap w-full h-3/4 overflow-y-scroll">
              <div className="flex text-balck font-Vazirmatn font-bold text-lg w-full border rounded-lg m-2 p-4">
                <button
                  onClick={(event) => {
                    setNewAddress(userInfo?.addresses?.length ?? 0);
                  }}
                  className="flex"
                >
                  افزودن آدرس جدید
                  <IoIosAddCircleOutline size={25} />
                </button>
              </div>
              <div className="flex flex-wrap w-full m-2 ">
                {userInfo?.addresses?.length ? (
                  userInfo?.addresses?.map((address, index) => (
                    <>
                      <AddressContainer
                        setEdit={setEdit}
                        userAddress={address}
                        index={index}
                        modal={setAddressSelection}
                        primaryAddress={
                          userInfo?.PrimaryAddressNumber
                            ? userInfo?.PrimaryAddressNumber
                            : 0
                        }
                      />
                    </>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <AddressEdit
              setNewAddress={setNewAddress}
              setAddressSelection={setAddressSelection}
              setEdit={setEdit}
              editnumber={edit === 100 ? newAddress : edit}
            ></AddressEdit>
          </>
        )}
      </div>
    </>
  );
}

function AddressContainer(props: any) {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const userState = useSelector(selectUserUpdateFlag);

  async function selectThisAddress(Number: number) {
    const user: Client = { ...userInfo };
    user.PrimaryAddressNumber = Number;
    dispatch(updateUserData(user));
  }

  // useEffect(() => {
  //   console.log(userState);
  // }, [userState]);

  return (
    <div className=" flex	flex-wrap w-full	max-w-3xl	border rounded-lg items-start p-4 m-2">
      {userState === "pending" ? <LoadingTwo /> : <></>}
      <section
        onClick={(event) => {
          selectThisAddress(props.index);
        }}
        className=" flex	flex-wrap w-full cursor-pointer	max-w-3xl	 rounded-lg items-start p-4"
      >
        {userInfo?.PrimaryAddressNumber == props.index ? (
          <IoIosRadioButtonOn size={20} className="text-blue-700" />
        ) : (
          <IoIosRadioButtonOff size={20} className="text-blue-700" />
        )}
        <h1 className="text-lg font-Vazirmatn font-bold text-gray-400 w-full">
          عنوان آدرس: {userInfo?.addresses?.[props.index].title}
        </h1>
        <h1 className="text-lg font-Vazirmatn font-bold text-gray-400 w-full"></h1>
        <div>
          <h2 className="text-md font-Vazirmatn font-bold text-gray-600 p-2">
            {" "}
            {userInfo?.addresses?.[props.index] !== undefined
              ? userInfo?.addresses[props.index]?.address_compact
              : "0"}
          </h2>
          <h3 className="text-md font-Vazirmatn font-bold text-gray-400	p-2">
            {userInfo?.addresses?.[props.index] !== undefined
              ? `${userInfo.addresses[props.index].receiver_name}  ${
                  userInfo.addresses[props.index].receiver_family
                } ,${userInfo.addresses[props.index].receiver_phone}`
              : ""}
          </h3>
        </div>
      </section>
      <div className="flex justify-end w-full">
        <button
          onClick={(event) => {
            props.setEdit(props.index);
          }}
          className="px-4 rounded-lg hover:bg-gray-200 self-end text-md font-Vazirmatn font-bold text-blue-400	p-2"
        >
          ویرایش آدرس
        </button>
      </div>
    </div>
  );
}

function AddressEdit(props: any) {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useAppDispatch();
  const userState = useSelector(selectUserUpdateFlag);
  const [reverseAddress, setReverseAddress] = useState();
  const [steps, setSteps] = useState(0);
  // async function checkNextStep() {
  //   if (reverseAddress?.address) {
  //     setSteps(1);
  //   }
  // }
  useEffect(() => {
    // checkNextStep();
    // console.log("reverseAddress", reverseAddress);
  }, []);
  return (
    <section className="flex flex-wrap p-4 m-2">
      <div className="flex items-center justify-center w-full border-b h-14 m-2">
        <h1 className="flex text-xl font-Vazirmatn font-bold text-cyan-400  p-4 w-1/3">
          ویرایش آدرس
        </h1>
        {/* <h2>{reverseAddress?.address}</h2> */}
        <div className="flex justify-end w-2/3">
          <button
            onClick={(event) => {
              props.setAddressSelection(false);
            }}
          >
            <AiOutlineClose size={25} className="text-black left-0 flex" />
          </button>
        </div>
      </div>
      <Map></Map>
      {steps == 0 ? <></> : <></>}
      {steps == 1 ? (
        <AddressForm
          setNewAddress={props.setNewAddress}
          setEdit={props.setEdit}
          setUpdated={props.setUpdated}
          editnumber={props.editnumber}
          userInfo={props.userInfo}
          reverseAddress={reverseAddress}
        >
          {" "}
          next step
        </AddressForm>
      ) : (
        <></>
      )}
    </section>
  );
}

function AddressForm(props: any) {
  const [reverseAddress, setReverseAddress] = useState(props.reverseAddress);
  const [client, setClient] = useState<Client>();
  const userInfo = useSelector(selectUserInfo);

  useEffect(() => {}, [reverseAddress]);
  return (
    <>
      {userInfo.addresses !== undefined ? (
        <div className="flex flex-wrap w-full max-h-[70%] m-2 overflow-y-scroll rounded-lg">
          <div className="flex flex-wrap w-full">
            {/* <h1>{props.userInfo?.addresses[props.editnumber]?.loc_address}</h1> */}
            <form className="flex flex-wrap w-full">
              <div className="flex m-2 flex-wrap w-full">
                <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                  عنوان آدرس
                </h3>
                <input
                  placeholder="مثال: خانه"
                  id="title"
                  className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                  type="address"
                  defaultValue={userInfo?.addresses[props.editnumber]?.title}
                ></input>
              </div>
              <div className="flex m-2 flex-wrap  w-full">
                <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                  آدرس پستی
                </h3>
                <input
                  id="address"
                  className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                  type="address"
                  defaultValue={props.reverseAddress?.address}
                ></input>
              </div>
              <div className="flex m-2 ">
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    استان
                  </h3>
                  <input
                    id="province"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="address"
                    defaultValue={
                      userInfo?.addresses[props.editnumber]?.province
                    }
                  ></input>
                </div>
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    شهر
                  </h3>
                  <input
                    id="city"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="address"
                    defaultValue={userInfo?.addresses[props.editnumber]?.city}
                  ></input>
                </div>
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    محله
                  </h3>
                  <input
                    id="neighbourhood"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="address"
                    defaultValue={
                      userInfo?.addresses[props.editnumber]?.neighbourhood
                    }
                  ></input>
                </div>
              </div>
              <div className="flex m-2  w-full border-b">
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    پلاک
                  </h3>
                  <input
                    id="plaque"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="address"
                    defaultValue={userInfo?.addresses[props.editnumber]?.plaque}
                  ></input>
                </div>
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    واحد
                  </h3>
                  <input
                    id="unit"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="address"
                    defaultValue={userInfo?.addresses[props.editnumber]?.unit}
                  ></input>
                </div>
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    کدپستی
                  </h3>
                  <input
                    id="postal_code"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="address"
                    defaultValue={
                      userInfo?.addresses[props.editnumber]?.postal_code
                    }
                  ></input>
                </div>
              </div>
              <h1 className="flex w-full font-Vazirmatn text-lg">
                مشخصات گیرنده مرسوله
              </h1>
              <div className="flex m-2  w-full border-b">
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    نام گیرنده
                  </h3>
                  <input
                    id="receiver_name"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="string"
                    defaultValue={
                      userInfo?.addresses[props.editnumber]?.receiver_name
                    }
                  ></input>
                </div>
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    فامیلی گیرنده
                  </h3>
                  <input
                    id="receiver_family"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="string"
                    defaultValue={
                      userInfo?.addresses[props.editnumber]?.receiver_family
                    }
                  ></input>
                </div>
                <div className="flex m-2 flex-wrap">
                  <h3 className="text-lg font-Vazirmatn font-bold text-gray-700 p-4">
                    موبایل گیرنده
                  </h3>
                  <input
                    id="receiver_phone"
                    className="flex font-Vazirmatn items-start w-full h-16 border rounded-lg p-2 focus:bg-gray-100"
                    type="phone"
                    defaultValue={
                      userInfo?.addresses[props.editnumber]?.receiver_phone
                    }
                  ></input>
                </div>
              </div>
            </form>
          </div>
          <div className="flex w-full justify-end items-center">
            <button
              onClick={(event) => {
                // changesHandler();
              }}
              className="bg-cyan-400 rounded-lg m-2 px-2 py-2 font-bold font-Vazirmatn text-white"
            >
              ذخیره آدرس
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

// function AddressObject() {
//   this.addr = {
//     title: "",
//     lat: 0.0,
//     lng: 0.0,
//     postal_code: "",
//     province: "",
//     city: "",
//     county: "",
//     district: "",
//     region: "",
//     neighbourhood: "",
//     plaque: "",
//     unit: "",
//     loc_address: "",
//     description: "",
//     address_compact: "",
//     receiver_name: "",
//     receiver_phone: "",
//     receiver_family: "",
//   };
// }

const loadingSvg = (
  <svg
    role="status"
    className="ml-1 inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-red-600 fill-cyan-500"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);
