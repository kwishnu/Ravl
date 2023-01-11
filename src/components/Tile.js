import React, { Component } from 'react';
// import config from '../config/config';
import colors from '../config/colors';
import '../styles/animations.css';
import { motion, AnimatePresence } from "framer-motion"
import { getRandomInt, posOrNeg, getColor } from '../config/functions';
import 'animate.css';

const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    element.classList.add(`${prefix}animated`, animationName);
    const handleAnimationEnd = (event) => {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }
    element.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

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
    tileColor = (this.props.text === " ")?randColor:tileColor;
    tileColor2 = (this.props.text === " ")?randColor2:tileColor2;
    let txtColor = this.props.dark ? colors.off_white2:colors.off_black;
    let bordColor = this.props.dark ? colors.gray_1:colors.off_black;
    this.setState({bgColor: tileColor, toColor: tileColor2, textColor: txtColor, borderColor: bordColor});

    this.startColorCycling();
  }
  flash(ref, callback){
    const animElement = this.tileRefs[ref];
    animElement.style.setProperty('--animate-duration', '0.6s');
    animateCSS(animElement, 'pulse').then(() => callback(ref));
  }
  animateOut(ref, animPreference, callback){
    const animElement = this.tileRefs[ref];
    switch(animPreference){
      case "Spin":
        animElement.style.setProperty('--animate-duration', '0.3s');
        animateCSS(animElement, 'pulse').then(() => {
          animElement.style.setProperty('--animate-duration', '0.6s');
          setTimeout(() => {
            this.setState({show: false});
          }, 600);
          animateCSS(animElement, 'flipX');
        })
        .then(callback);
        break;
      case "None":
        animElement.style.setProperty('--animate-duration', '0.5s');
        animateCSS(animElement, 'pulse').then(() => {
          animElement.style.setProperty('--animate-duration', '0.6s');
          setTimeout(() => {
            this.setState({show: false});
          }, 600);
          
        })
        .then(callback);
        break;
      default://"Leave":
        animElement.style.setProperty('--animate-duration', '0.5s');
        animateCSS(animElement, 'showoff').then(() => {
          animElement.style.setProperty('--animate-duration', '1.6s');
          setTimeout(() => {
            this.setState({show: false});
          }, 500);
          animateCSS(animElement, 'bounceOutRight');
        })
        .then(callback);
    }
  }
  animateUpThenDown(ref){
    if(this.tileRefs[ref]){
      const animElement = this.tileRefs[ref];
      animElement.style.setProperty('--animate-duration', '1.4s');
      this.setState({tileKey: this.state.tileKeyStored, bgColor: colors.gray_3, textColor: colors.red, xValue: posOrNeg() * getRandomInt(100, 400)});
      const delayMSec = getRandomInt(1, 1000);
      setTimeout(() => {
        animateCSS(animElement, 'bounceOutDown');
        setTimeout(() => {
          this.setState({show: false});
        }, 600);
      }, delayMSec);
    }
  }
  animateRedPulse(ref){
    if(this.tileRefs[ref]){
      this.setState({tileKey: this.state.tileKeyStored, bgColor: this.state.darkModeEnabled? colors.dark_red : colors.red, textColor: colors.text_white});
      const animElement = this.tileRefs[ref];
      animElement.style.setProperty('--animate-duration', '0.4s');
      animateCSS(animElement, 'pulse').then(() => {
        animElement.style.setProperty('--animate-duration', '0.7s');
        animateCSS(animElement, 'tada');
      });
    }
  }
  toFromDarkMode(onOrOff){
    const bg = onOrOff? colors.gray_3:colors.text_white;
    const txt = onOrOff ? colors.off_white:colors.off_black;
    let bc = onOrOff ? colors.gray_1:colors.off_black;
    this.setState({tileKey: this.state.tileKeyStored, bgColor: bg, textColor: txt, borderColor: bc});
  }
  ravlTileToFromDarkMode(onOrOff){
    if(this.state.bgColor === colors.green)return;
    const bg = onOrOff? colors.dark_red:colors.red;
    const txt = onOrOff ? colors.off_white2:colors.text_white;
    let bc = onOrOff ? colors.gray_1:colors.off_black;
    this.setState({bgColor: bg, tileKey: this.state.tileKeyStored, textColor: txt, borderColor: bc});//tileKey: this.state.tileKeyStored, 
  }
  changeBGColor(color){
    let txtColor = (color === "white" || color === "yellow")?'#222222':'#ffffff';
    this.setState({bgColor: color, textColor: txtColor})
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
            exit={{ x: this.state.animPreference !== "Leave"?0 : this.state.xValue, y: this.state.xValue === 400?0:50, opacity: 0 }}
            onAnimationComplete={() => this.props.checkForWords(this.props.myRef)}
            transition={{ type: "spring", stiffness: 250, damping: 18, duration: 0.4 }}
          >
            {text === ' ' ?
            <motion.div 
              id={myRef} 
              key={this.state.tileKey}
              className={'anim-element'} 
              ref={(ref) => this.tileRefs[myRef] = ref} 
              // ref={node => {if (node) this.tileRefs[myRef] = node}} 
              style={{...tile_styles.tile, backgroundColor: this.state.bgColor, height: tileHeight, width: tileHeight}}
              animate={this.state.tileKey === this.state.tileKeyStored ? 
                {} 
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
              :
            <div 
              id={myRef} 
              className={'anim-element'} 
              ref={(ref) => this.tileRefs[myRef] = ref} 
              style={{...tile_styles.tile, backgroundColor: this.state.bgColor, height: tileHeight, width: tileHeight}}
            >
            <div style={{...tile_styles.text, fontSize: tileHeight/1.6, color: this.state.textColor}}>
              {text.toUpperCase()}
            </div>
            </div>
            }
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
    borderRadius: 5,
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
    userSelect: 'none'
  }
}

export default Tile;