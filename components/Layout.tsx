import React, { useEffect, useState } from "react";
import Header from "./headers/header";
import NavbarMobile from "./headers/navbarMobile";
import NavbarOne from "./headers/navbarOne";
import { isMobile } from "react-device-detect";
import HeaderMobile from "./headers/headerMobile";
import MobileSearchComponent from "./search/MobileSearchComponent";
import { FaTelegram } from 'react-icons/fa'
const eventScreemSize: number = 720
function Layout({ children }: { children: any }) {
    const [ismob, setIsmob] = useState<string>('true')
    const [updateSize, setUpdateSize] = useState<boolean>(false)
    useEffect(() => {
        window.addEventListener("resize", (event) => {
            var width = document.body.clientWidth;
            if (width < eventScreemSize && ismob == 'false') {
                setIsmob('true')
            }
            else if (width > eventScreemSize && ismob == 'true') {
                setIsmob('false')
            }
            // console.log(width)
            // console.log(ismob)
            setUpdateSize((pervValue) => !pervValue)
        });
    }, [])

    useEffect(() => {
        const ismobact = isMobile === true ? 'true' : 'false'
        var width = document.body.clientWidth;

        if (width > eventScreemSize && ismobact == 'false') {
            setIsmob('false')
        } else if (width < eventScreemSize && ismobact == 'false') {
            setIsmob('true')
        } else if (width < eventScreemSize && ismobact == 'true') {
            setIsmob('true')
        } else if (width > eventScreemSize && ismobact == 'true') {
            setIsmob('false')
        }
    }, [updateSize])

    return <div>
        {ismob === 'true' ?
            <>
                <div
                    className="flex bg-white border-b-2 mx-3" >
                    <NavbarMobile ></NavbarMobile>
                    <HeaderMobile ></HeaderMobile>
                    <button className="flex h-fit m-2 p-2 border rounded-xl bg-gray-100">
                        <FaTelegram
                            color="#f99e23"
                            size={20} />
                        {/* <div className="text-xs font-Vazir-Bold w-full">پشنیبانی</div> */}
                    </button>
                </div>
                <MobileSearchComponent></MobileSearchComponent>
            </> :
            <>
                <Header></Header>
                <NavbarOne></NavbarOne>
            </>}
        {children}
    </div>
}

export default Layout;