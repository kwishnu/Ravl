import React, { Component } from 'react';
import Switch from "react-switch";
import { motion, AnimatePresence } from "framer-motion"
import tinycolor from 'tinycolor2';
import ReactSimpleRange from "react-simple-range";
import settings_styles from "../styles/settings_styles";
import colors from '../config/colors';
import config from '../config/config';
const scrHeight = config.scrHeight;
const KEY_BGColorPref = 'bgColorPrefKey';
const KEY_ModePref = 'modePrefKey';
const KEY_AnimationPref = 'animationPrefKey';
const KEY_BGColorSliderValue = 'bgColorValueSliderKey';
const KEY_BGValSliderValue = 'bgValValueSliderKey';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeSwitchEnabled: false,
      darkModeEnabled: false,
      animationPreference: 'Leave',
      leaveAnimationChecked: false,
      spinAnimationChecked: false,
      noneAnimationChecked: false,
      colorSliderValue: 276,
      valSliderValue: 29,
      swatchBG: global.bgColor,
      blockPremiumFeatures: true
    };
  }
  componentDidMount() {
    const modePref = window.localStorage.getItem(KEY_ModePref);
      if (modePref !== null) {
        const modePrefBool = (modePref === 'true')?true:false;
        this.setState({ darkModeEnabled: modePrefBool, darkModeSwitchEnabled: modePrefBool});
      }else{
        try {
            window.localStorage.setItem(KEY_ModePref, 'false');
        } catch (error) {
            window.alert('window.localStorage error: ' + error.message);
        }
      }
    const animPref = window.localStorage.getItem(KEY_ModePref);
    if (animPref !== null) {
      const ap = animPref;
      switch(ap){
        case "Spin":
          this.setState({spinAnimationChecked: true});
          break;
        case "None":
          this.setState({noneAnimationChecked: true});
          break;
        default:
          this.setState({leaveAnimationChecked: true});
      }
      this.setState({animationPreference: ap});
    }
    const bgColorValue =  window.localStorage.getItem(KEY_BGColorSliderValue);
    if (bgColorValue !== null) {
      const bgCV = bgColorValue;
      const bgCVInt = parseInt(bgCV);
      this.setState({colorSliderValue: bgCVInt});
    }else{
      this.setState({colorSliderValue: 276});
      try {
        window.localStorage.setItem(KEY_BGColorSliderValue, '276');
      } catch (error) {
          window.alert('localStorage error: ' + error.message);
      }
    }
    const bgValValue =  window.localStorage.getItem(KEY_BGValSliderValue);
    if (bgValValue !== null) {
      const bgV = bgValValue;
      const bgVInt = parseInt(bgV);
      this.setState({valSliderValue: bgVInt});
    }else{
      this.setState({valSliderValue: 29});
      try {
        window.localStorage.setItem(KEY_BGValSliderValue, '29');
      } catch (error) {
          window.alert('localStorage error: ' + error.message);
      }
    }
  }   
  showAlert(){
    window.alert("Premium Feature", "Sorry, these features come with the upgrade!",
      [
        {text: "Go", onClick: () => this.goToSupport(), style: "OK"},
        {text: "Cancel", style: "cancel"},
      ],
      {cancelable: true}
    )
  }
  goToSupport(){
    this.props.sendValueToGame(["Open Support", null]);
  }
  closeSelf(){
    this.props.requestModalClose("Settings", false);
  }
  toggleDarkMode(){
    const newBool = !this.state.darkModeSwitchEnabled;
    const newBoolStr = newBool ? "true":"false";
    this.props.sendValueToGame(["Dark Mode", newBool]);
    this.setState({darkModeEnabled: newBool, darkModeSwitchEnabled: newBool});
    try {
        window.localStorage.setItem(KEY_ModePref, newBoolStr);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
  }
  handleAnimationRadio(mode){
    if( (this.state.leaveAnimationChecked && mode === "Leave") ||
        (this.state.spinAnimationChecked && mode === "Spin") ||
        (this.state.noneAnimationChecked && mode === "None")
      ) return;
      let leaveBool = false;
      let spinBool = false;
      let noneBool = false;
      switch(mode){
        case "Leave":
          leaveBool = true;
          break;
        case "Spin":
          spinBool = true;
          break;
        case "None":
          noneBool = true;
          break;
        default:
          console.log("No default case...");
      }
    this.props.sendValueToGame(["Animation Style", mode]);
    this.setState({leaveAnimationChecked: leaveBool, spinAnimationChecked: spinBool, noneAnimationChecked: noneBool});
    try {
        window.localStorage.setItem(KEY_AnimationPref, mode);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
  }
  handleColorChange(sliderSetting) {
    const colResult = tinycolor({ h: sliderSetting.value, s: 96, l: this.state.valSliderValue });
    this.setState({swatchBG: colResult.toHexString()});
  }
  handleColorChangeComplete(sliderSetting){
    const colResult = tinycolor({ h: sliderSetting.value, s: 96, l: this.state.valSliderValue }).toHexString();
    this.setState({colorSliderValue: sliderSetting.value});
    global.bgColor = colResult;
    // this.props.navigation.setOptions({
    //   headerStyle: {backgroundColor: global.bgColor, height: tablet?scrHeight * 0.07:scrWidth * 0.22}
    // });
    try {
        window.localStorage.setItem(KEY_BGColorSliderValue, sliderSetting.toString());
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_BGColorPref, colResult);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    this.setState({colorSliderValue: sliderSetting.value});
  }
  handleColorValChange(sliderSetting){
    const colResult = tinycolor({ h: this.state.colorSliderValue, s: 96, l: sliderSetting.value });
    this.setState({swatchBG: colResult.toHexString()});
  }
  handleColorValChangeComplete(sliderSetting){
    const colResult = tinycolor({ h: this.state.colorSliderValue, s: 96, l: sliderSetting.value }).toHexString();
    console.log("colResult: " + colResult);
    
    global.bgColor = colResult;
    // this.props.navigation.setOptions({
    //   headerStyle: {backgroundColor: global.bgColor, height: tablet?scrHeight * 0.07:scrWidth * 0.22}
    // });
    try {
        window.localStorage.setItem(KEY_BGValSliderValue, sliderSetting.toString());
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_BGColorPref, colResult);
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    this.setState({valSliderValue: sliderSetting.value});
  }
  restoreDefaults(){
    this.setState({
      colorSliderValue: 276,
      valSliderValue: 29,
      swatchBG: colors.dark_purple,
      darkModeSwitchEnabled: false,
      darkModeEnabled: false,
      animationPreference: 'Leave',
      leaveAnimationChecked: true,
      spinAnimationChecked: false,
      noneAnimationChecked: false,
    });
    if(this.state.darkModeEnabled)this.toggleDarkMode();
    global.bgColor = colors.dark_purple;
    this.props.sendValueToGame(["Dark Mode", false]);
    this.props.sendValueToGame(["Animation Style", "Leave"]);
    // this.props.navigation.setOptions({
    //   headerStyle: {backgroundColor: global.bgColor, height: tablet?scrHeight * 0.07:scrWidth * 0.22}
    // });
    try {
        window.localStorage.setItem(KEY_BGColorSliderValue, '276');
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_BGValSliderValue, '29');
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_BGColorPref, '#2E034B');
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
    try {
        window.localStorage.setItem(KEY_AnimationPref, 'Leave');
    } catch (error) {
        window.alert('window.localStorage error: ' + error.message);
    }
  }
  // displayPremiumBlock(){
  //   return (
  //     <button style={settings_styles.premium_block} onClick={() => this.showAlert()}>
  //     </button>
  //   )
  // }

   render() {
    let { 
      darkModeSwitchEnabled, 
      darkModeEnabled, 
      leaveAnimationChecked,
      spinAnimationChecked,
      noneAnimationChecked
    } = this.state;
    console.log("leaveAnimationChecked: " + leaveAnimationChecked + "spinAnimationChecked: " + spinAnimationChecked + "noneAnimationChecked: " + noneAnimationChecked );
    const closeImage = darkModeEnabled? require("../images/close.png"):require("../images/close_black.png");
    const { isModalVisible } = this.props;
    const leaveCheckImg = leaveAnimationChecked && !darkModeEnabled? require("../images/checkbox_checked.png") :
                          leaveAnimationChecked && darkModeEnabled? require("../images/checkbox_checked_white.png") :
                          !leaveAnimationChecked && !darkModeEnabled? require("../images/checkbox_unchecked.png") :
                          require("../images/checkbox_unchecked_white.png");
    const spinCheckImg = spinAnimationChecked && !darkModeEnabled? require("../images/checkbox_checked.png") :
                          spinAnimationChecked && darkModeEnabled? require("../images/checkbox_checked_white.png") :
                          !spinAnimationChecked && !darkModeEnabled? require("../images/checkbox_unchecked.png") :
                          require("../images/checkbox_unchecked_white.png");
    const noneCheckImg = noneAnimationChecked && !darkModeEnabled? require("../images/checkbox_checked.png") :
                          noneAnimationChecked && darkModeEnabled? require("../images/checkbox_checked_white.png") :
                          !noneAnimationChecked && !darkModeEnabled? require("../images/checkbox_unchecked.png") :
                          require("../images/checkbox_unchecked_white.png");
    const hueSliderImage = require("../images/rainbow_slider.png");
    const valueSliderImage = require("../images/value_gradient.png");

    return(
      <AnimatePresence>
      {isModalVisible && 
        <motion.div
          initial={{ y: scrHeight }}
          animate={{ y: -2 }}
          exit={{ y: scrHeight }}
          style={{...settings_styles.containerView}}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >

          <div style={{...settings_styles.modalView, backgroundColor: darkModeEnabled ? colors.gray_4:colors.off_white}}>
            <div style={settings_styles.modalHeader}>
              <div style={settings_styles.titleContainer}>
                <div style={{...settings_styles.title, color: darkModeEnabled ? colors.off_white:colors.off_black}}>Settings</div>
              </div>
              <div style={settings_styles.closeButtonContainer}>
                <img
                  style = {settings_styles.close_image}
                  src={closeImage}
                  onClick={() => this.closeSelf()}
                  alt = {"Close Button"}
                />
              </div>
            </div>
            <div style={{...settings_styles.modalBody, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
            <div style={settings_styles.sectionHead}>
                  <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>Display</div>
                </div>
                <div style={settings_styles.switchRow}>
                  <div style={settings_styles.switchContainer}>
                    <Switch
                      height={20}
                      width={50}
                      handleDiameter={28}
                      onColor={ "#81b0ff" }
                      offColor={ "#767577" }
                      onHandleColor={colors.button_blue}
                      offHandleColor={colors.button_blue}
                      onChange={() => {this.toggleDarkMode()}}
                      checked={darkModeSwitchEnabled}
                      checkedIcon={false}
                      uncheckedIcon={false}
                    />
                  </div>
                  <div style={settings_styles.switchTextContainer}>
                    <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>DARK MODE</div>
                  </div>
                </div>
                <div style={settings_styles.sectionHead}>
                  <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>Animation Style</div>
                </div>
                <div style={settings_styles.radiobuttonRow}>
                  <div style={settings_styles.radioImageContainer}>
                    <img
                      onClick={() => this.handleAnimationRadio("Leave")}
                      style = {settings_styles.radioImage}
                      src = {leaveCheckImg}
                      alt = {"Leave Animation"}
                    />
                  </div>
                  <div style={settings_styles.switchTextContainer}>
                    <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>LEAVE</div>
                    <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>  {`\u2022  Zooms away`}</div>
                  </div>
                </div>
                <div style={settings_styles.radiobuttonRow}>
                  <div style={settings_styles.radioImageContainer}>
                    <img 
                      onClick={() => this.handleAnimationRadio("Spin")}
                      style = {settings_styles.radioImage}
                      src = {spinCheckImg}
                      alt = {"Spin Animation"}
                    />
                  </div>
                  <div style={settings_styles.switchTextContainer}>
                    <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>SPIN</div>
                    <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>  {`\u2022  Flips and fades`}</div>
                  </div>
                </div>
                <div style={settings_styles.radiobuttonRow}>
                  <div style={settings_styles.radioImageContainer}>
                    <img 
                      onClick={() => this.handleAnimationRadio("None")}
                      style = {settings_styles.radioImage}
                      src = {noneCheckImg}
                      alt = {"No Animation"}
                    />
                  </div>
                  <div style={settings_styles.switchTextContainer}>
                    <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>FADE</div>
                    <div style={{...settings_styles.text_small, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>  {`\u2022  No-nonsense fade`}</div>
                  </div>
                </div>
                <div style={settings_styles.sectionHead}>
                  <div style={{...settings_styles.text, color: this.state.darkModeEnabled ? colors.off_white:colors.off_black}}>Background Color:</div>
                </div>
                <div style={settings_styles.sliderContainer}>
                  <div style={settings_styles.slider1View}>
                    <img style={settings_styles.colorPickerImage} src={hueSliderImage} alt = {"Hue Selection"}/>
                    <ReactSimpleRange
                      onChangeComplete={(value) => this.handleColorChangeComplete(value)}
                      onChange={(value) => this.handleColorChange(value)}
                      defaultValue={this.state.colorSliderValue}
                      value={this.state.colorSliderValue}
                      max={359}
                      min={1}
                      trackColor={darkModeEnabled ? colors.gray_3:colors.off_white2}
                      sliderColor={darkModeEnabled ? colors.gray_3:colors.off_white2}
                      customThumb={
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: colors.text_white,
                          }}
                        ></div>
                      }                    
                    />
                  </div>
                  <div style={settings_styles.slider2View}>
                    <img style={settings_styles.valuePickerImage} src={valueSliderImage} alt = {"Value Selection"}/>
                    <ReactSimpleRange
                      onChangeComplete={(value) => this.handleColorValChangeComplete(value)}
                      onChange={(value) => this.handleColorValChange(value)}
                      defaultValue={this.state.valSliderValue}
                      value={this.state.valSliderValue}
                      max={67}
                      min={0}
                      trackColor={darkModeEnabled ? colors.gray_3:colors.off_white2}
                      sliderColor={darkModeEnabled ? colors.gray_3:colors.off_white2}
                      customThumb={
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: colors.text_white,
                          }}
                        ></div>
                      }                    
                    />
                  </div>
                  <div style={{...settings_styles.swatch, backgroundColor: this.state.swatchBG}}>
                </div>
                </div>
                <div style={settings_styles.spacer}>
                </div>
                <div style={settings_styles.defaultsButtonContainer}>
                  <button style={settings_styles.button} onClick={() => this.restoreDefaults()} >
                    <div style={settings_styles.button_text_white}>RESTORE DEFAULTS</div>
                  </button>
                </div>
                </div>
                {/* {!global.upgradeStatus && this.displayPremiumBlock()} */}
          </div>
        </motion.div>
        }
        </AnimatePresence>
      );
  }
}

export default Settings;