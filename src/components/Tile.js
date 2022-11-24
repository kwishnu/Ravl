import React, { Component } from 'react';
// import config from '../config/config';
import colors from '../config/colors';
import '../styles/animations.css';
import { motion, AnimatePresence } from "framer-motion"
import 'animate.css';
const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;//
    element.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
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
const flash1 = {
  from: {
    backgroundColor: '#00000000', scale: 1
  },
  to: {
    backgroundColor: 'pink', scale: 1.2
  },
};
const flash2 = {
  from: {
    backgroundColor: 'pink', scale: 1.2
  },
  to: {
    backgroundColor: '#00000000', scale: 1.0
  },
};
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
      textColor: colors.off_black,
      darkModeEnabled: this.props.dark,
      show: true,
      animation: pulse,
      duration: 1,
      scale: 1,
      play: false,
      showPulse: false,
      showTada: false
      // xValue: posOrNeg() * getRandomInt(20, 100)
    };
    // this.animatedRef = React.createRef();
    this.tileRefs = [];

  }
  // componentDidMount() {
  //   const randColor = getColor();
  //   let tileColor = this.props.dark ? colors.gray_3:colors.text_white;
  //   tileColor = (this.props.text === " ")?randColor:tileColor;//colors.transparent
  //   let txtColor = this.props.dark ? colors.off_white2:colors.off_black;
  //   let bordColor = this.props.dark ? colors.gray_1:colors.off_black;
  //   this.setState({bgColor: tileColor, textColor: txtColor, borderColor: bordColor});
  // }
  // randomBGColorChange() {
  //   let initialColor = this.state.bgColor;
  //   let nextColor = getColor();
  //   this.setState({bgColor: nextColor});
  //   return {
  //     from: {
  //       'backgroundColor': initialColor
  //     },
  //     to: {
  //       'backgroundColor': nextColor
  //     },
  //   };
  // }
  // goUp() {
  //   const upVal = getRandomInt(60, 120);
  //   return {
  //     from: {
  //       'translateY': 0, 'translateX': 0
  //     },
  //     to: {
  //       'translateY': -upVal, 'translateX': this.state.xValue
  //     },
  //   };
  // }
  // goDown() {
  //   return {
  //     from: {
  //       'translateY': 0, 'translateX': this.state.xValue
  //     },
  //     to: {
  //       'translateY': 600, 'translateX': 3 * this.state.xValue
  //     },
  //   };
  // }
  flash(callback){


    this.refs.outerTileView.pulse(600).then(() => {
      this.refs.outerTileView.animate(flash1, 200).then(back =>
        this.refs.outerTileView.animate(flash2, 200)
      ).then(callback)
    })
  }
  pulse(animationType){//animPreference, callback
    if(animationType === 'pulse'){
      this.setState({showPulse: true});
    }else{
      this.setState({showTada: true});
    }
    // setTimeout(() => {
    //   this.setState({play: true});
    //   console.log("animation: " + JSON.stringify(this.state.animation));
    // }, 200);
    // this.setState({scale: 1.1});
    // setTimeout(() => {
    //   this.setState({scale: 1});
    // }, 400)
  }
  animateOut(ref){//animPreference, callback
    const animElement = this.tileRefs[ref];//document.querySelector('anim-element');
    animElement.style.setProperty('--animate-duration', '0.7s');
    animateCSS(animElement, 'flare').then((message) => {
      animElement.style.setProperty('--animate-duration', '1.3s');
      setTimeout(() => {
        this.setState({show: false});
      }, 400);
      animateCSS(animElement, 'bounceOutRight');
    });

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
  // animateUpThenDown(){
  //   this.setState({bgColor: colors.gray_3, textColor: colors.red});
  //   let shootUp = this.goUp();
  //   let fallDown = this.goDown();
  //   this.refs.outerTileView.pulse(600).then(() => {
  //     this.refs.outerTileView.animate(shootUp, 300).then(down =>
  //       this.refs.outerTileView.animate(fallDown, 800)
  //     )
  //   })
  // }
  // animateRedPulse(){
  //   this.setState({bgColor: this.state.darkModeEnabled? colors.dark_red : colors.red, textColor: colors.text_white});
  //   this.refs.outerTileView.pulse(400).then(() => {
  //     this.refs.outerTileView.tada(800);
  //   })
  // }
  toFromDarkMode(onOrOff){
    const bg = onOrOff? colors.gray_3:colors.text_white;
    const txt = onOrOff ? colors.off_white:colors.off_black;
    let bc = onOrOff ? colors.gray_1:colors.off_black;
    this.setState({bgColor: bg, textColor: txt, borderColor: bc});
  }
  ravlTileToFromDarkMode(onOrOff){
    const bg = onOrOff? colors.dark_red:colors.red;
    const txt = onOrOff ? colors.off_white2:colors.text_white;
    let bc = onOrOff ? colors.gray_1:colors.off_black;
    this.setState({bgColor: bg, textColor: txt, borderColor: bc});
  }
  changeBGColor(color){
    let txtColor = (color === "white" || color === "yellow")?'#222222':'#ffffff';
    this.setState({bgColor: color, textColor: txtColor})
  }
  // cycleBGColor(t){
  //   if(this.refs.tileView){
  //     let changeColor = this.randomBGColorChange();
  //     this.refs.tileView.animate(changeColor, t);
  //   }else{
  //     clearInterval(this.state.intervalID);
  //   }
  // }
  // startColorCycling(){
  //   if(this.refs.tileView && this.state.intervalID === 0){
  //     let ccTime = getRandomInt(900, 1200);
  //     this.cycleBGColor(ccTime);
  //     let intID = setInterval(() => {this.cycleBGColor(ccTime)}, ccTime);
  //     this.setState({intervalID: intID});
  //   }
  // }
  toggleColorCycle(ref){
    if(!this.state.intervalID === 0){
      clearInterval(this.state.intervalID);
      this.setState({intervalID: 0});
    }
  }//this.state.animation  this.state.duration
  render() {
    // const anim = (this.props.animate === true)?"bounceInRight":"";
    const { text, tileHeight, myRef } = this.props;
    // let anim = this.state.animation;
    // console.log("tileHeight: " + tileHeight);
    return (
      <AnimatePresence>
        {this.state.show && 
        <motion.div //style={{...tile_styles.tile, height: tileHeight, width: tileHeight}}
        initial={{ x: 500 }}
        animate={{ x: 0 }}
        exit={{ x: 400, opacity: 0 }}
        onAnimationComplete={() => {console.log("finished!");}}
        transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.4 }}
        >
          <div id={'id_' + myRef} className={'anim-element'} ref={node => {if (node) this.tileRefs[myRef] = node}} style={{...tile_styles.tile, height: tileHeight, width: tileHeight}}>
          <div style={tile_styles.text}>
            {text.toUpperCase()}
          </div></div>
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
    backgroundColor: colors.off_white,
    borderColor: colors.off_black, borderStyle: 'solid'
  },
  text: {
    fontSize: 36,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    color: colors.off_black
  }
}

export default Tile;