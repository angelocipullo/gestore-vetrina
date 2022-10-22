import React from "react";
import { SortableElement } from "react-sortable-hoc";

const SortableItem = (props) => {



  return (
    <div className="item-container">
      <p className="list-item-index">{props.position + 1} </p>
      <div className="list-item">
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={require(`../../../images/${props.item.url}`)}
          alt={props.index}
        />
      </div>
    </div>
  );
};

export default SortableElement(SortableItem);
