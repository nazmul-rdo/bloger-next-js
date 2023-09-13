import Link from "next/link"
import Image from "next/image"
import Author from "./Author"
import fetcher from '../../lib/fetcher'
import Spinner from "./Spinner"

const Ralated = () => {
    const {data, isLodding, isError} = fetcher('/api/popular')

    if(isLodding) return <Spinner></Spinner>
    if(isError) return <div>Error</div>
    
  return (
    <section className="pt-20">
             <h1 className="font-bold text-3xl py-10">Related</h1>

             <div className="flex flex-col gap-10">
                
                { 
                    data?.map((value, index)=>(
                        <Post data={value} key={index} />
                    ))
                }
             </div>
        </section>
  )
}

function Post({data}){

    const { id, title, category, img, published, description, author } = data;
    return (
        <div className="flex gap-5">
            <div className="image flex flex-col justify-start">
                <Link href={`/posts/${id}`}><Image alt="no Image" src={img} className="rounded" width={300} height={200} /></Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link href={`/posts/${id}`} className="text-orange-600 hover:text-orange-800">{category}</Link>
                    <Link href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600">- {published}</Link>
                </div>
                <div className="title">
                    <Link href={`/posts/${id}`} className="text-xl font-bold text-gray-800 hover:text-gray-600">{title}</Link>
                </div>
                {author? <Author {...author}></Author>:<></>}
            </div>
        </div>
    )
}

export default Ralated