import React, { Component } from 'react';
import Tile from './Tile';
import Draggable from "react-draggable";
import '../styles/animations.css';
import 'animate.css';
import config from '../config/config';
import colors from '../config/colors';
const scrHeight = config.SCREEN_HEIGHT;
const KEY_LowColPositions = 'lowColPositions';

let tilePlusMargin = 0;
let maxMove = 0;
const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
  const animationName = `${prefix}${animation}`;//
  element.classList.add(`${prefix}animated`, animationName);
  function handleAnimationEnd(event) {
    event.stopPropagation();
    element.classList.remove(`${prefix}animated`, animationName);
    resolve('Animation ended');
  }
  element.addEventListener('animationend', handleAnimationEnd);//, {once: true});
});

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
      prevLocation: 0
    };
    this.rowRefs = [];
    this.colRefs = [];

  }
  componentDidMount() {
    global.lowColPosition = 0;
  }

  flashWord(ref, callback){
    // const wat = this.colRefs;
    // console.log(wat);

    if(this.rowRefs[ref]){
      this.rowRefs[ref].flash(ref, callback);
    }
  }
  animateFail(ref){
    if(this.rowRefs[ref]){
      this.rowRefs[ref].animateUpThenDown(ref);
    }
  }
  showFailWord(ref){
    if(this.rowRefs[ref]){
      this.rowRefs[ref].animateRedPulse(ref);
    }
  }
  goDark(ref, onOrOff){
    if(this.rowRefs[ref]){
      this.rowRefs[ref].toFromDarkMode(onOrOff);
    }
  }
  ravlTileGoDark(ref, onOrOff){
    if(this.rowRefs[ref]){
      this.rowRefs[ref].ravlTileToFromDarkMode(onOrOff);
    }
  }
  changeColor(ref, color){
    if(this.rowRefs[ref]){
      this.rowRefs[ref].changeBGColor(color);
    }
  }
  cycleColor(ref){
    if(this.rowRefs[ref]){
      this.rowRefs[ref].startColorCycling(ref);
    }
  }
  stopColorCycle(ref){
    if(this.rowRefs[ref]){
      this.rowRefs[ref].toggleColorCycle();
    }
  }
  dropColumn(){
    let lowPosition = -10;
    let lcp = JSON.parse(localStorage.getItem(KEY_LowColPositions));
console.log("lcp: " + JSON.stringify(lcp));
    for(let j=0; j<10;j++){
      lowPosition = (lcp[j] > lowPosition)?lcp[j]:lowPosition;
    }
    this.setPosition(lowPosition);
  }
  nudgeUpAndDown(col, forward){
    const r = "col" + col;
    const animElement = this.colRefs[r];
    animElement.style.setProperty('--animate-duration', '0.2s');
    const fireTimesForward = [0, 60, 120, 180];
    const fireTimesReverse = [180, 120, 60, 0];
    const fireTime = forward?fireTimesForward[col]:fireTimesReverse[col];
    setTimeout(() => {
        animateCSS(animElement, 'bump-up')
    }, fireTime);
  }
  moveColUpOrDown(col){
    const delay = [0, 600, 1200, 1800];
    const r2 = "col" + col;
    const animElement = this.colRefs[r2];
    animElement.style.setProperty('--animate-duration', '3s');
    col === 0 || col === 2?
    setTimeout(() => {
      animateCSS(animElement, 'move-up-and-down')
    }, delay[col])
    :
    setTimeout(() => {
      animateCSS(animElement, 'move-down-and-up')
    }, delay[col])

  }
  pingFromTile(ref){
    if(ref === 'col0,row' + (this.state.tilesInColumn - 1)){
      this.props.checkForWordsAtStart();
    }
  }
  handleStop(e, data){
    let moveMultiple = Math.round(data.y/tilePlusMargin);
    moveMultiple = moveMultiple > 0 && moveMultiple > maxMove?maxMove:moveMultiple;
    moveMultiple = moveMultiple < 0 && moveMultiple < -maxMove?-maxMove:moveMultiple;
    this.setPosition(moveMultiple);
    const numMoved = moveMultiple - this.state.prevLocation;
    this.props.sendColToGame([this.props.colIndex, numMoved]);
    this.setState({prevLocation: moveMultiple});

    let lcp = JSON.parse(localStorage.getItem(KEY_LowColPositions));
    lcp[this.props.colIndex] = moveMultiple;
    window.localStorage.setItem(KEY_LowColPositions, JSON.stringify(lcp));

    console.log("moveMultiple: " + moveMultiple + ", numMoved: " + numMoved);  
  };

  setPosition(num){
    const yPosition = num * tilePlusMargin + (num)/2;
    this.setState({position: yPosition});
    //setPosition({ x: 0, y: num * tilePlusMargin });

  }
  sendCellOut(ref, callback){//animPref, ref, callback
    if(this.rowRefs[ref]){
      this.rowRefs[ref].animateOut(ref, callback);
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
          ref={(ref) => this.rowRefs[`${cell.ref}`] = ref}
          myRef={`${cell.ref}`}
          text={`${cell.letter}`}
          animate={this.props.animate}
          dark={this.props.dark}
          tileHeight={this.props.tileHeight}
          checkForWords={(tileRef)=>{this.pingFromTile(tileRef);}}
        />
      )
    }
  }

  render() {
    const { tileHeight, colIndex } = this.props; 
    const cRef = "col" + colIndex;
    tilePlusMargin = tileHeight + 3;//2.3
    maxMove = this.state.tilesInColumn - 1;
    let colObj = this.state.letterArray;
    return (
      <div ref={(ref) => this.colRefs[cRef] = ref}>
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
      </div>
    );
  }
}

const styles = {
  tileset: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginLeft: 1,
    // marginRight: 1,
    marginBottom: 2,
  }
}

export default TileSet;