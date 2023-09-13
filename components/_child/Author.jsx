import Image from "next/image"
import Link from "next/link"

const Author = ({name,img,designation}) => {
  if(!name&&!img) return <></>
  return (
    <div className="author flex py-5">
        <Image alt="no images" src={img} width={60} height={60} className="rounded-full"></Image>        
        <div className="flex flex-col justify-center px-4">
            <Link href={"/"} className="text-md font-bold text-gray-800 hover:text-gray-600">{name}</Link>
            <span className="text-sm text-gray-500">{designation}</span>
        </div>
    </div>
  )
}

export default Author