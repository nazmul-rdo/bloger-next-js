import Image from "next/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import SwiperCore, { Autoplay } from 'swiper';
import Author from "./_child/Author"
import Spinner from "./_child/Spinner"
import fetcher from '../lib/fetcher'


const Section1 = () => {

    const { data, isLoading, isError } = fetcher('api/trending')
    if (isLoading) return <Spinner></Spinner>
    if (isError) return <div>Error</div>

    SwiperCore.use([Autoplay])

    const bg = {
        background: "url('images/banner.png') no-repeat",
        backgroundPosition: "right"
    }
    return (
        <section className='py-16' style={bg}>
            <div className="container mx-auto md:px-20">
                <h1 className='font-blod text-4xl pb-12 text-center'>Trending</h1>


                <Swiper
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 2000
                    }}
                >
                    {
                        data.map((value, index) => (
                            <SwiperSlide key={index}>
                                <Slide data={value} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>


            </div>
        </section>
    )
}

function Slide({data}) {
    const { id, title, category, img, published, description, author } = data;
    // console.log(data);
    return (
        <div className="grid md:grid-cols-2">
            <div className="image">
                <Link href={`/posts/${id}`}><Image alt="no Image" src={img} width={600} height={600} /></Link>
            </div>
            <div className="info flex justify-center flex-col">
                <div className="cat">
                    <Link href={`/posts/${id}`} className="text-orange-600 hover:text-orange-800">{category}</Link>
                    <Link href={`/posts/${id}`} className="text-gray-800 hover:text-gray-600">- {published}</Link>
                </div>
                <div className="title">
                    <Link href={`/posts/${id}`} className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">{title}</Link>
                </div>
                <p className="text-gray-500 py-3">
                    {description}
                </p>
                { author ? <Author {...author}></Author> : <></>}
            </div>
        </div>
    )
}



export default Section1