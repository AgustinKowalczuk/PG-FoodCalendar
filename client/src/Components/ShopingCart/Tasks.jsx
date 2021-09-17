import React from 'react'
import { Draggable } from "react-beautiful-dnd";



export default function Tasks(props) {
    return (      
          <Draggable draggableId={props.x} index={props.con}>
              {
                  (provided) => {
                    <h5 {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                        {props.x}
                    </h5>  
                  }
              }
          </Draggable>
    )
}