import Link from "next/link"
import Image from "next/image"
import Author from "./_child/Author"
import Spinner from "./_child/Spinner"
import fetcher from '../lib/fetcher'

const Section2 = () => {

    const { data, isLoading, isError } = fetcher('api/posts') 

    if(isLoading) return <Spinner></Spinner>
    if(isError) return <div>Error</div>

  return (
    <section className="container mx-auto md:px-20 py-10">
        <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>

        {/* grid columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
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
    const {id, title,subtitle, category, img, published, author} = data;
    
    return (
        <div className="item">
            <div className="images">
                <Link href={`/posts/${id}`}><Image alt="no Image" src={img} className="rounded" width={500} height={350} /></Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link href={`/posts/${id}`} className="text-orange-600 hover:text-orange-800">{category}</Link>
                    <Link href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600">- {published}</Link>
                </div>
                <div className="title">
                    <Link href={`/posts/${id}`} className="text-xl font-bold text-gray-800 hover:text-gray-600">{title}</Link>
                </div>
                <p className="text-gray-500 py-3">
                    {subtitle}
                </p>
                {author? <Author {...author}></Author>: <></>}
            </div>
        </div>
    )
}

export default Section2