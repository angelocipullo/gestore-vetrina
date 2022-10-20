import React, { useState } from 'react'
import ListItem from './ListItem';
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer } from 'react-sortable-hoc';
import "./List.css"

const ListWrapper = SortableContainer(({items}) => {
    return (
      <div className='list-container'>
        {items.map((item, index) => (
          <ListItem key={`item-${item.url}`} index={index} position={index} item={item} />
        ))}
      </div>
    );
  });

const List = (props) => {
    const [imgs, setImgs] = useState(props.items)

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newImgs = arrayMoveImmutable(imgs, oldIndex, newIndex);
       
        props.onChange && props.onChange(newImgs)
        setImgs(newImgs)
    };

    return (
        <div>
            {props.title}
            <ListWrapper items={imgs} onSortEnd={onSortEnd} />
        </div>
    );
}

export default List;

