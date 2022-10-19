import React from 'react'
import "./OverlayText.css"

const OverlayText = ({ overlayText }) => {


    const textStyle = {
        color: overlayText.color,
        fontSize: parseInt(overlayText.fontSize),
        background: overlayText.backgroundColor,
        textAlign: overlayText.textAlign,
        textTransform: overlayText.textTransform,
        fontWeight: overlayText.fontWeight
    }

    if (overlayText.isEnabled) {
        return (
            <div className='text-container'>
                <p style={textStyle} className={overlayText.position}>
                    {overlayText.isMarquee
                        ? <marquee> {overlayText.content} </marquee>
                        : <p> {overlayText.content} </p>
                    }
                </p>
            </div>
        )
    } else {
        return null
    }

}


export default OverlayText