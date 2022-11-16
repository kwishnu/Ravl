import React, {useState} from 'react';
import Tile from './Tile';
// import config from '../config/config';
import Draggable from "react-draggable";
let tilePlusMargin = 0;

const TileSet = (props) => {
  const { tilesInColumn, tileHeight } = props;
  tilePlusMargin = tileHeight + 2;
  const maxMove = tilesInColumn - 1;
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleStop = (e, data) => {
    const moveMultiple = Math.round(data.y/tilePlusMargin);
    setPosition({ x: 0, y: moveMultiple * tilePlusMargin })    
  };

  return (
    <Draggable axis={'y'} bounds={{top: -(tilePlusMargin * (maxMove + 0.4)), bottom: (tilePlusMargin * (maxMove + 0.4))}} position={position} onStop={handleStop}> 
      <span>
        <Tile tileHeight={props.tileHeight}/>
        <Tile tileHeight={props.tileHeight}/>
        <Tile tileHeight={props.tileHeight}/>
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