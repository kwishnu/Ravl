import React, {useState} from 'react';
import Tile from './Tile';
import Draggable from "react-draggable";


function TileSet() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // const myRef = React.createRef()
  const handleDrag = (e, data) => {
    // setPosition({ x: 0, y: data.y })    
  };
  const handleStop = (e, data) => {
    console.log("data from handleStop: " + (data.y));
    setPosition({ x: 0, y: -200 })    
  };
  const handleDrop = (e, data) => {
    console.log("data: " + (data.y));
    // setPosition({ x: 0, y: 100 })    
  };

  return (
    <Draggable axis={'y'}  position={position} onDrop={handleDrop} onDrag={handleDrag} onStop={handleStop}> 
      <span>
        <Tile />
        <Tile />
        <Tile />
      </span>
    </Draggable>
  );

// function handleDragEnd(event) {
//   // console.log("handleDragEnd..." + JSON.stringify(event));
//   console.log("Here I am!");
//   // if (event.over && event.over.id === 'droppable') {
//   //   setIsDropped(true);
//   // }
// }

}

export default TileSet;