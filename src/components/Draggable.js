import React from 'react';
import Tile from './Tile';
// import {DndContext} from '@dnd-kit/core';
import {restrictToVerticalAxis, restrictToParentElement} from '@dnd-kit/modifiers';
import {useDraggable} from '@dnd-kit/core';

function Draggable(props) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;
  
  
  return (
    <div ref={setNodeRef} onDragEnd={handleDragEnd} style={style} {...listeners} {...attributes}  modifiers={[restrictToVerticalAxis, restrictToParentElement]} >
      <Tile/>
    </div>
  );

function handleDragEnd(event) {
  // console.log("handleDragEnd..." + JSON.stringify(event));
  console.log("Here I am!");
  // if (event.over && event.over.id === 'droppable') {
  //   setIsDropped(true);
  // }
}

}

export default Draggable;