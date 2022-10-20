import React from 'react'
import "./GalleryComponent.css"


// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination } from "swiper";

const GalleryComponent = ({ gallery }) => {

    const galleryStyle = {
        backgroundColor: gallery.backgroundColor
    }

    const renderImages = (img, key) => {
        return (
            <SwiperSlide className='slide' key={key}>
                <img style={{ objectFit: img.resizeType }} src={img.url} className='img' />
            </SwiperSlide>
        )
    }

    if (gallery.isEnabled)
        return (
            <div className='gallery-container' style={galleryStyle} >
                <Swiper
                    loop={true}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="slide"
                >
                    {gallery.images.map(renderImages)}
                </Swiper>
            </div>
        )
}

export default GalleryComponent