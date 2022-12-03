import React, { Component } from 'react';
// import config from '../config/config';
import colors from '../config/colors';
import '../styles/animations.css';
import { motion, AnimatePresence } from "framer-motion"
import 'animate.css';
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function posOrNeg(){
  return Math.round(Math.random()) * 2 - 1;
}
export function getColor(){//https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
  return "hsl(" + Math.floor(360 * Math.random()) + ',' +//hue
             Math.floor(70 + 10 * Math.random()) + '%,' +//saturation
             Math.floor(40 + 20 * Math.random()) + '%)'//lightness
}
const animateCSS = (element, animation, prefix = 'animate__') =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    const handleAnimationEnd = (event) => {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });



// import {getColor} from '../config/functions';//randomBoolean, getRandomInt, posOrNeg

// const flare1 = {
//   from: {
//     backgroundColor: '#00000000', scale: 1
//   },
//   to: {
//     backgroundColor: '#adfa75', scale: 1.2
//   },
// };
// const flare2 = {
//   0: {
//     backgroundColor: '#00000000', scale: 1
//   },
//   0.5: {
//     backgroundColor: '#adfa75', scale: 1.2
//   },
//   1: {
//     backgroundColor: '#adfa75', scale: 1
//   },
// };
// const flash1 = {
//   from: {
//     backgroundColor: '#00000000', scale: 1
//   },
//   to: {
//     backgroundColor: 'pink', scale: 1.2
//   },
// };
// const flash2 = {
//   from: {
//     backgroundColor: 'pink', scale: 1.2
//   },
//   to: {
//     backgroundColor: '#00000000', scale: 1.0
//   },
// };
// eslint-disable-next-line 
// const test = 
// [
//   { 0: 'scale: 1, rotate: 0deg' }, 
//   { 10: 'scale: 0.9, rotate: -3deg' },
//   { 20: 'scale: 0.9, rotate: -3deg' },
//   { 30: 'scale: 1.1, rotate: -3deg' },
//   { 40: 'rotate: 3deg' }, 
//   { 50: 'rotate: -3deg' },
//   { 60: 'rotate: 3deg' }, 
//   { 70: 'rotate: -3deg' },
//   { 80: 'rotate: 3deg' },
//   { 90: 'scale: 1.1, rotate: 3deg' }, 
//   { 100: 'scale: 1, rotate: 0deg' },
// ];
const pulse = 
[
  { 0: 'scale: 1' }, // 0%
  { 50: 'scale: 1.1' }, // 50%
  { 100: 'scale: 1' } // 100%
];
// const disappear = {
//   from: {
//     opacity: 1
//   },
//   to: {
//     opacity: 0
//   },
// };
// const pulse1_1 = {
//   0: {
//     scale: 1
//   },
//   0.5: {
//     scale: 1.1
//   },
//   1: {
//     scale: 1
//   },
// };
// const pulse1_2 = {
//   0: {
//     scale: 1
//   },
//   0.5: {
//     scale: 1.2
//   },
//   1: {
//     scale: 1
//   },
// };
// const flip = {
//   0: {
//     rotateX: '0deg'
//   },
//   0.5: {
//     rotateX: '180deg'
//   },
//   1: {
//     rotateX: '0deg'
//   },
// };

class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleViewRef = ref => this.view = ref;
    this.handleTileRef = ref2 => this.view = ref2;
    this.state = {
      text: this.props.text,
      tileHeight: this.props.tileHeight,
      yOffset: 0,
      intervalID: 0,
      bgColor: colors.text_white,
      toColor: colors.text_white,
      textColor: colors.off_black,
      darkModeEnabled: this.props.dark,
      show: true,
      animation: pulse,
      duration: 1,
      scale: 1,
      play: false,
      xValue: 400,
      tileKey: this.props.myRef,
      tileKeyStored: this.props.myRef,
      animDelay: Math.random()
    };

    this.tileRefs = [];

  }
  componentDidMount() {
    const randColor = getColor();
    const randColor2 = getColor();
    let tileColor = this.props.dark ? colors.gray_3:colors.text_white;
    let tileColor2 = this.props.dark ? colors.gray_3:colors.text_white;
    tileColor = (this.props.text === " ")?randColor:tileColor;//colors.transparent
    tileColor2 = (this.props.text === " ")?randColor2:tileColor2;//colors.transparent
    let txtColor = this.props.dark ? colors.off_white2:colors.off_black;
    let bordColor = this.props.dark ? colors.gray_1:colors.off_black;
    this.setState({bgColor: tileColor, toColor: tileColor2, textColor: txtColor, borderColor: bordColor});

    this.startColorCycling();

  }
  flash(ref, callback){
    console.log("sent ref " + ref);
    const rowRef = ref.split(',')[1];
    const animElement = this.tileRefs[rowRef];
    animElement.style.setProperty('--animate-duration', '0.6s');
    animateCSS(animElement, 'pulse').then(() => callback(ref));
  }
  animateOut(ref, callback){//animPreference
    console.log("should be leaving now...");
    const rowRef = ref.split(',')[1];
    const animElement = this.tileRefs[rowRef];
    animElement.style.setProperty('--animate-duration', '0.7s');
    animateCSS(animElement, 'flare').then((callback) => {
      animElement.style.setProperty('--animate-duration', '1.3s');
      setTimeout(() => {
        this.setState({show: false});
      }, 400);
      animateCSS(animElement, 'bounceOutRight');
    })
    .then(callback);

    // animElement.classList.add('animate__animated', 'animate__bounceOutLeft');

  }
    //   switch(animPreference){
  //     case "Spin":
  //       this.refs.outerTileView.animate(flare2, 400).then(() => {//*****this.outerTileView= React.createRef();<--put this just below super(props); above, then use by removing refs from this line
  //         this.refs.outerTileView.animate(flip, 600).then(go =>
  //           this.refs.outerTileView.animate(disappear, 500)
  //         ).then(callback)
  //       })
  //       break;
  //     case "None":
  //       this.refs.outerTileView.animate(flare2, 700).then(() => {
  //           this.refs.outerTileView.animate(disappear, 400).then(callback)
  //       })
  //       break;
  //     default://"Leave":
  //       this.refs.outerTileView.pulse(600).then(() => {
  //         this.refs.outerTileView.animate(flare1, 300).then(zoom =>
  //           this.refs.outerTileView.lightSpeedOut(350)
  //         ).then(callback)
  //       })
  //     }
  // }
  animateUpThenDown(ref){
    console.log("ref from tile: " + ref);
    const rowRef = ref.split(',')[1];
    const animElement = this.tileRefs[rowRef];
    animElement.style.setProperty('--animate-duration', '1.4s');
    this.setState({tileKey: this.state.tileKeyStored, bgColor: colors.gray_3, textColor: colors.red, xValue: posOrNeg() * getRandomInt(100, 700)});
    const delayMSec = getRandomInt(1, 1000);
    setTimeout(() => {
      animateCSS(animElement, 'bounceOutDown');
      setTimeout(() => {
        this.setState({show: false});
      }, 600);
    }, delayMSec);
  }
  animateRedPulse(ref){
    this.setState({tileKey: this.state.tileKeyStored, bgColor: this.state.darkModeEnabled? colors.dark_red : colors.red, textColor: colors.text_white});
    const rowRef = ref.split(',')[1];
    const animElement = this.tileRefs[rowRef];
    animElement.style.setProperty('--animate-duration', '0.4s');
    animateCSS(animElement, 'pulse').then(() => {
      animElement.style.setProperty('--animate-duration', '0.7s');
      animateCSS(animElement, 'tada');
    });
  }
  toFromDarkMode(onOrOff){
    const bg = onOrOff? colors.gray_3:colors.text_white;
    const txt = onOrOff ? colors.off_white:colors.off_black;
    let bc = onOrOff ? colors.gray_1:colors.off_black;
    this.setState({tileKey: this.state.tileKeyStored, bgColor: bg, textColor: txt, borderColor: bc});
  }
  ravlTileToFromDarkMode(onOrOff){
    const bg = onOrOff? colors.dark_red:colors.red;
    const txt = onOrOff ? colors.off_white2:colors.text_white;
    let bc = onOrOff ? colors.gray_1:colors.off_black;
    this.setState({bgColor: bg, tileKey: this.state.tileKeyStored, textColor: txt, borderColor: bc});//tileKey: this.state.tileKeyStored, 
  }
  changeBGColor(color){
    let txtColor = (color === "white" || color === "yellow")?'#222222':'#ffffff';
    this.setState({tileKey: this.state.tileKeyStored, bgColor: color, textColor: txtColor})
  }
  cycleBGColor(){
    if(this.state.tileKey !== this.state.tileKeyStored){
      let initialColor = this.state.toColor;
      let nextColor = getColor();
      if(this.props.text === ' '){
        this.setState({bgColor: initialColor, toColor: nextColor});
      }
      }else{
      clearInterval(this.state.intervalID);
    }
  }
  startColorCycling(){
    if(this.state.intervalID === 0){
      this.setState({tileKey: this.state.tileKey + 1});
      this.cycleBGColor();
      let intID = setInterval(() => {this.cycleBGColor()}, 1950);
      this.setState({intervalID: intID});
    }
  }
  toggleColorCycle(){
    if(this.state.intervalID !== 0){
      clearInterval(this.state.intervalID);
      setTimeout(() => {
        this.setState({intervalID: 0, tileKey: this.state.tileKeyStored});
      }, 250);
    }
  }

  render() {
    const animVal = (this.props.animate === true)?500:0;
    const { text, tileHeight, myRef } = this.props;
    return (
      <AnimatePresence>
        {this.state.show && 
          <motion.div
            initial={{ x: animVal }}
            animate={{ x: 0 }}
            exit={{ x: this.state.xValue, y: this.state.xValue === 400?0:50, opacity: 0 }}
            onAnimationComplete={() => this.props.checkForWords(this.props.myRef)}
            transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.4 }}
          >
            <motion.div 
              id={'id_' + myRef} 
              key={this.state.tileKey}
              className={'anim-element'} 
              ref={node => {if (node) this.tileRefs[myRef] = node}} 
              style={{...tile_styles.tile, backgroundColor: this.state.bgColor, height: tileHeight, width: tileHeight}}
              animate={this.state.tileKey === this.state.tileKeyStored ? 
                { scale: [1, 1.1, 1] } 
                : 
                { backgroundColor: [this.state.bgColor, this.state.toColor] }
              }
              transition={this.state.tileKey === this.state.tileKeyStored ? 
                { duration: 0.6, ease: "easeIn" }
                :
                { duration: 2, ease: "linear", repeat: Infinity }
              }
            >
            <div style={{...tile_styles.text, fontSize: tileHeight/1.6, color: this.state.textColor}}>
              {text.toUpperCase()}
            </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    );

  }
}

const tile_styles = {
  tile: {
    display: "flex",
    margin: 1,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.off_black, 
    borderStyle: 'solid',
    padding: 0
  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
  }
}

export default Tile;