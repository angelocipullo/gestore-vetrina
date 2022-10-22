import React, { useState } from 'react'

const Section = (props ) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className='section-container'>
            <p style={{cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)} style={{ marginTop: 20, marginBottom: 0}} className='h1'>{props.name} </p>

            {isOpen && props.children}

        </div>
    )
}

export default Section