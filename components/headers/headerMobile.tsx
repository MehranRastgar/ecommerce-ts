import Image from "next/future/image";

export default function HeaderMobile() {
    return <div className="flex w-full justify-center font- text-2xl text-blackout-red text-center items-center" >
        <Image
            alt="InoMal Logo"
            src={'/Asset12.png'}
            unoptimized
            width={200}
            height={100}
        />
    </div>
}