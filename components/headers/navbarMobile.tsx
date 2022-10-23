import { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi";

export default function NavbarMobile() {
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  return (
    <nav
      className="flex flex-wrap justify-start 
        w-1/4
        filter 
        font-semibold
        "
    >
      <button
        className="flex h-fit m-2 p-2 border rounded-xl bg-gray-100"
        onClick={() => {
          setOpenMenu((PrevValue) => !PrevValue)
        }}
      >
        <GiHamburgerMenu color="#e61f37"  size={40} />
      </button>
      {openMenu === true ?
        <OpenMenuModal setOpenMenu={setOpenMenu} />
        :
        <></>}
    </nav>)
}

function OpenMenuModal({ setOpenMenu }: { setOpenMenu: any }) {


  return (

    <div
      className='justify-start flex fixed top-0 right-0 w-full h-full bg-transparent'>
      <div className='flex w-2/3  border-b-2 border-cyan-400 p-2 h-full bg-white'>

        <input placeholder='منو' className='p-2 m-2 cursor-pointer h-fit'></input>

      </div>
      <div
        onClick={() => setOpenMenu(false)}
        className="flex w-1/3 bg-black/30 h-full">

      </div>
    </div>


  )

}

{/* <ul className="flex flex-wrap w-1/2 bg-red-300">
<li className={liClass}><a href="">Home</a></li>
<li className={liClass}><a href="">News</a></li>
<li className={liClass}><a href="">Contact</a></li>
<li className={liClass}><a href="">About</a></li>
</ul> */}