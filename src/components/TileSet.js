import React, { Component } from 'react';
import Tile from './Tile';
// import config from '../config/config';
import Draggable from "react-draggable";
let tilePlusMargin = 0;
let maxMove = 0;
// const [position, setPosition] = useState({ x: 0, y: 0 })

  // eslint-disable-next-line no-unused-vars

class TileSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
    };
    this.rowRefs = [];

  }
  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setPosition(-2);

  //   }, 2000)
  // }

  handleStop(e, data){
    let moveMultiple = Math.round(data.y/tilePlusMargin);
    moveMultiple = moveMultiple > 0 && moveMultiple > maxMove?maxMove:moveMultiple;
    moveMultiple = moveMultiple < 0 && moveMultiple < -maxMove?-maxMove:moveMultiple;
    this.setPosition(moveMultiple);
    console.log("moveMultiple: " + moveMultiple + ", moveMultiple * tilePlusMargin: " + moveMultiple * tilePlusMargin);  
  };

  setPosition(num){
    const yPosition = num * tilePlusMargin;
    this.setState({position: yPosition});
    //setPosition({ x: 0, y: num * tilePlusMargin });

  }
  sendCellOut(ref){//animPref, , callback
    console.log("ref: " + ref);
    if(this.rowRefs[ref]){
      this.rowRefs[ref].animateOut(ref);//animPref, callback
    }
  }
  pulseCell(ref, which){//animPref, , callback
    // if(this.rowRefs[ref]){
      this.rowRefs[ref].pulse(which);//animPref, callback
    // }
  }
  renderTiles(row, i){
    return(
      <Tile id={"id" + i} myRef={'row' + i} key={"key" + i} ref={(ref) => this.rowRefs[row] = ref} tileHeight={this.props.tileHeight}/>
      )
  }

  render() {
  const { tilesInColumn, tileHeight } = this.props; 
  tilePlusMargin = tileHeight + 3;//2.3
  maxMove = tilesInColumn - 1;
  const arr = ["row0", "row1", "row2", "row3"]; 

  return (
    <Draggable 
      axis={'y'} 
      bounds={{top: -(tilePlusMargin * (maxMove + 0.4)), bottom: (tilePlusMargin * (maxMove + 0.4))}} 
      position={{x: 0, y: this.state.position}} onStop={(e, data) => this.handleStop(e, data)}
      
    > 
      <span style={{...styles.tileset, height: tilesInColumn * tileHeight}}>
        {
        arr.map((row, index) => this.renderTiles(row, index))
        }
        {/* <Tile tileHeight={tileHeight}/>
        <Tile tileHeight={tileHeight}/>
        <Tile tileHeight={tileHeight}/> */}
     </span>
    </Draggable>
  );
  }
// function handleDragEnd(event) {
//   // console.log("handleDragEnd..." + JSON.stringify(event));
//   console.log("Here I am!");
//   // if (event.over && event.over.id === 'droppable') {
//   //   setIsDropped(true);
//   // }
// }

}

const styles = {
tileset: {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 1,
  marginRight: 1,
  marginBottom: 2,
  // position: 'absolute',
  justifyContent: 'flex-end',
}

}

export default TileSet;