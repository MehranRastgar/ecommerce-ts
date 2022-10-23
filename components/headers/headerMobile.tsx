import Image from "next/future/image";
import Link from "next/link";

export default function HeaderMobile() {
    return <div className="flex w-full justify-center  text-2xl text-blackout-red text-center items-center" >
        <Link href={'/'}>
            <a>
                <Image
                    alt="InoMal Logo"
                    src={'/Asset12.png'}
                    unoptimized
                    width={130}
                    height={50}
                />
            </a>
        </Link>
    </div>
}