import Image from "next/image"
import Link from "next/link"

export default function PyiursLogo () {
    return (
        <Link href={"/"} className="cursor-pointer">
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src="/images/logo-pyiurs.png"
                alt="Pyiurs"
                width={256}
                height={64}
                priority
            />
        </Link>
        
    )
}