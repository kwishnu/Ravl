import React, { Component } from 'react';
import Tile from './Tile';
import Draggable from "react-draggable";
import config from '../config/config';
import colors from '../config/colors';
const scrHeight = config.SCREEN_HEIGHT;
let tilePlusMargin = 0;
let maxMove = 0;
// const [position, setPosition] = useState({ x: 0, y: 0 })

  // eslint-disable-next-line no-unused-vars

class TileSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      letterArray: this.props.letterArray,
      tilesInColumn: (this.props.letterArray.length + 2)/3,
      tileHeight: this.props.tileHeight,
      tilePlusMargin: this.props.tileHeight + 2,
      yOffsetInt: 0,
      bottom: (0.65 * scrHeight - (((this.props.letterArray.length + 2)/3) * (this.props.tileHeight + 2)))/2,
      bgColor: colors.transparent,
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
    if(this.rowRefs[ref]){
      this.rowRefs[ref].animateOut(ref);//animPref, callback
    }
  }
  pulseCell(ref, which){//animPref, , callback
    // if(this.rowRefs[ref]){
      this.rowRefs[ref].pulse(which);//animPref, callback
    // }
  }
  renderTiles(cell, i){
    if(cell.letter){
      return (
        <Tile
          key={`${cell.ref}`}
          ref={`${cell.ref}`}
          myRef={`${cell.ref}`}
          text={`${cell.letter}`}
          animate={this.props.animate}
          dark={this.props.dark}
          tileHeight={this.props.tileHeight}
          checkForWords={(tileRef)=>{this.pingFromTile(tileRef);}}
        />

      // <Tile id={"id" + i} myRef={'row' + i} key={"key" + i} ref={(ref) => this.rowRefs[row] = ref} tileHeight={this.props.tileHeight}/>
      )
    }
  }


  render() {
  const { tileHeight } = this.props; 
  tilePlusMargin = tileHeight + 3;//2.3
  maxMove = this.state.tilesInColumn - 1;
  // const arr = ["row0", "row1", "row2", "row3"]; 
  let colObj = this.state.letterArray;
  return (
    <Draggable 
      axis={'y'} 
      bounds={{top: -(tilePlusMargin * (maxMove + 0.4)), bottom: (tilePlusMargin * (maxMove + 0.4))}} 
      position={{x: 0, y: this.state.position}} onStop={(e, data) => this.handleStop(e, data)}
    > 
      <span style={{...styles.tileset, height: this.state.tilesInColumn * tileHeight}}>
        {
          colObj.map((row, index) => this.renderTiles(row, index))
        }
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