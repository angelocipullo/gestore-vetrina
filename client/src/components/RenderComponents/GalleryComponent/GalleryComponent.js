import React from 'react'
import "./GalleryComponent.css"

const GalleryComponent = ( { gallery } ) => {

    const galleryStyle = {
        backgroundColor: gallery.backgroundColor
    }

    return (
        <div className='container' style={galleryStyle}>
            No photos found
        </div>
    )
}

export default GalleryComponent