import { Swiper, SwiperSlide } from "swiper/react"
import Link from "next/link"
import Image from "next/image"
import Author from "./_child/Author"
import SwiperCore, { Autoplay } from 'swiper';
import Spinner from "./_child/Spinner"
import fetcher from '../lib/fetcher'

const Section3 = () => {

    const { data, isLoading, isError } = fetcher('api/popular')
    if (isLoading) return <Spinner></Spinner>
    if (isError) return <div>Error</div>

    SwiperCore.use([Autoplay])
    return (
        <section className="container mx-auto md:px-20 py-16">
            <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

            {/* swiper */}
            <Swiper
                slidesPerView={2}
                breakpoints={{
                    640:{
                        slidesPerView:2,
                        spaceBetween:30
                    }
                }}
            >
                {data.map((value, index) => (
                    <SwiperSlide key={index}>
                        <Post data={value} />
                    </SwiperSlide>
                ))}

            </Swiper>

        </section>
    )
}

function Post({ data }) {
    const { id, title, category, img, published, description, author } = data;
    return (
        <div className="grid">
            <div className="images">
                <Link href={`/posts/${id}`}><Image alt="no Image" src={img} width={600} height={400} /></Link>
            </div>
            <div className="info flex justify-center flex-col py-4">
                <div className="cat">
                    <Link href={`/posts/${id}`} className="text-orange-600 hover:text-orange-800">{category}</Link>
                    <Link href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600">- {published}</Link>
                </div>
                <div className="title">
                    <Link href={`/posts/${id}`} className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">{title}</Link>
                </div>
                <p className="text-gray-500 py-3">
                    {description}
                </p>
                {author ? <Author {...author}></Author> : <></>}
            </div>
        </div>
    )
}

export default Section3