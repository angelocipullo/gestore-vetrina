import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const SortableItem = (props) => {
    return (
        <div className='list-item'>
            <img style={{ width:'100%', height: "100%", objectFit:'cover' }} src={props.item.url} />
            <p className='list-item-index'>{props.position} </p>
        </div>
    )
}

export default SortableElement(SortableItem);