import { useEffect, useState } from 'react'
import { FaSearchengin, FaUserCheck, FaShoppingBag, FaUserAltSlash } from 'react-icons/fa'
import { BsForwardFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'


export default function MobileSearchComponent() {
    return <div className="flex mx-3">
        <MobileSearchBar />
        <MobileUserTwinComponent />
    </div>
}

export function MobileSearchBar() {
    const [searchModal, setSearchModal] = useState<boolean>(false)
    // const dispatch = useDispatch();

    return (
        <>
            <div
                onClick={() => setSearchModal(true)}
                className="flex items-center w-2/3 p-2 rounded-xl m-2  bg-gray-200 h-[50px]">
                <FaSearchengin color={`${searchModal === true ? '' : '#e61f37'}`} size={30} />
                {/* <input  className='flex w-5/6 p-1 bg-transparent m-1 h-full border-none focus:'></input> */}
            </div>
            {searchModal === true ? <SearchModal setSearchModal={setSearchModal} /> : <></>}
        </>)
}

function SearchModal({ setSearchModal }: { setSearchModal: any }) {

    return (
        <div className='justify-start flex absolute top-0 right-0 w-full h-full bg-white'>
            <div className='flex w-full mx-3 border-b-2 border-cyan-400 p-2 h-fit'>
                <BsForwardFill
                    onClick={() => setSearchModal(false)}
                    color='#ff0065' size={40} />
                <input placeholder='جستجو' className='p-2 m-2 cursor-pointer h-fit'></input></div>
        </div>
    )
}

export function MobileUserTwinComponent() {
    return <div className='flex items-center w-1/3 mx-2'>
        <MobileUserProfile />
        <MobileUserBag />
    </div>
}

function MobileUserProfile() {
    const [userCheck, setUserCheck] = useState<string | undefined>(undefined)
    useEffect(() => {
        setUserCheck(undefined)
    },[])
    return (
        <div className='w-1/2'>
            {userCheck === undefined ?
                <button className='p-2'><FaUserAltSlash color='#002223' size={30} /></button>
                :
                <div className='flex flex-wrap w-full'>
                    <button className='p-2'><FaUserCheck color='#f99e23' size={30} /></button>
                    {/* <h4 className='flex w-full -mt-4'>mehran</h4> */}
                </div>
            }
        </div>
    )
}

function MobileUserBag() {

    return <div className='w-1/2'>
       <button className='p-2'> <FaShoppingBag color='#f99e23'  size={30} /></button>
    </div>
}