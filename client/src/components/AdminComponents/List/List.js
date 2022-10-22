import React, { useState, useEffect } from 'react'
import ListItem from './ListItem';
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer } from 'react-sortable-hoc';
import "./List.css"

const ListWrapper = SortableContainer(({ items, callback }) => {
    const deleteImg = (index) => () => {
        callback(index)
    }

    return (
        <div className='list-container'>
            {items.map((item, index) => (
                <div style={{ display: 'flex'}}>
                    <ListItem key={`item-${item.url}`} index={index} position={index} item={item} />
                    <div onClick={deleteImg(index)} className="list-item-delete">x</div>
                </div>
            ))}
        </div>
    );
});

const List = (props) => {
    const [imgs, setImgs] = useState(props.items)

    useEffect(() => {
        props.onChange && props.onChange(imgs)
    }, [imgs])
    

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newImgs = arrayMoveImmutable(imgs, oldIndex, newIndex);
        setImgs(newImgs)
    };

    const deleteImage = (index) => {
        setImgs( imgs.filter((img, i) => i !== index))
    }

    return (
        <div style={{marginTop: 15}}>
            <ListWrapper items={imgs} onSortEnd={onSortEnd} callback={(e) => deleteImage(e)} />
        </div>
    );
}

export default List;

