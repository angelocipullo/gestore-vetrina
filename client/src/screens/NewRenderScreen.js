import React, { useEffect, useState } from 'react'

import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'

import { db } from '../firebase.config'
import { doc, onSnapshot } from "firebase/firestore";


const SLIDE_DURATION = 10000

const NewRenderScreen = () => {

    const [slides, setSlides] = useState([])


    useEffect(() => {
        checkNetwork()
    }, [])

    const checkNetwork = () => {
        const isOffline = !navigator.onLine
        console.log(isOffline)

        if (isOffline) {
            setTimeout(checkNetwork, 1500)
        } else {
            getSlides()
        }
    }

    const getSlides = async () => {
        const docRef = doc(db, "Vetrine", 'assifin');
        let data;

        onSnapshot(docRef, (doc) => {
            data = doc.data()
            console.log("Current data: ", data);

            setSlides(data.slides)
        });
    }

    const renderSlides = (slide, key) => {
        return (
            <SwiperSlide
                key={key}
                className='slides__slide'
            >
                <div
                    className='slides__slide'
                    style={{ background: slide.backgroundColor || '#fff'}}
                >

                    {slide.type === 'text' &&
                        <p style={{ color: slide.fontColor || 'black', fontSize: 50 }}>{slide.content}</p>
                    }

                    {slide.type === 'image' &&
                        <img className='slide__image' src={slide.content} />
                    }

                    {slide.type === 'video' &&
                        <video loop muted className='slide__video' autoPlay src={slide.content} />
                    }
                </div>
            </SwiperSlide >
        )
    }

    return (
        <div>
            <Swiper
                loop={true}
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: SLIDE_DURATION,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay, Pagination]}
                className="slides__container"
            >
                {slides.map(renderSlides)}
            </ Swiper>
        </div>
    )
}

export default NewRenderScreen