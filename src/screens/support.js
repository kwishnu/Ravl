import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import formatDate from 'date-fns/format';
import support_styles from "../styles/support_styles";
import colors from '../config/colors';
import config from '../config/config';
const scrHeight = config.scrHeight;
const thisYear = formatDate(new Date(), "yyyy");

// const KEY_ModePref = 'modePrefKey';

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeEnabled: false,
    };
  }
  componentDidMount() {
    // AsyncStorage.getItem(KEY_ModePref).then((modePref) => {
    //   if (modePref !== null) {
    //     const modePrefBool = (modePref == 'true')?true:false;
    //     this.setState({ darkModeEnabled: modePrefBool});
    //   }else{
    //     try {
    //         AsyncStorage.setItem(KEY_ModePref, 'false');
    //     } catch (error) {
    //         window.alert('AsyncStorage error: ' + error.message);
    //     }
    //   }
    // }).done();
  }
  closeSelf(){
    this.props.requestModalClose("Support", false);
  }
  startPurchaseFlow(){
console.log("Upgrading...");

  }
   render() {
    const closeImage = this.props.darkModeEnabled? require("../images/close.png"):require("../images/close_black.png");
    const { isModalVisible, darkModeEnabled } = this.props;
    const versionStr = "v" + config.versionName;
    const copyrightText = "\u00A9" + thisYear + " KWish Apps";

    return(
      <AnimatePresence>
      {isModalVisible && 
        <motion.div
          initial={{ y: scrHeight }}
          animate={{ y: -2 }}
          exit={{ y: scrHeight }}
          style={{...support_styles.containerView}}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          <div style={{...support_styles.modalView, backgroundColor: darkModeEnabled ? colors.gray_4:colors.off_white}}>
            <div style={support_styles.modalHeader}>
              <div style={support_styles.tile_container}>
                <img
                  src={require("../images/heart_tile.png")}
                  style={support_styles.heart_tile_image}
                  alt={"Heart Tile"}
                />
              </div>
              <div style={support_styles.closeButtonContainer}>
                <img
                  style = {support_styles.close_image}
                  src={closeImage}
                  onClick={() => this.closeSelf()}
                  alt = {"Close Button"}
                />
              </div>
            </div>
            <div style={{...support_styles.modalBody, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
              <div style={support_styles.section}>
                <div style={{...support_styles.text, whiteSpace: 'pre-line', color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {"Thank you for playing RavL!\n\nIf you would like to support my little game, please upgrade for the cost of a coffee \u2014 special benefits include:" +
                "\n\n\u2022 COOL SETTINGS \u2014 change the app color theme and animations\n\u2022 NO ADs ever \u2014 no unsightly interruptions to your RavL play (future)" +
                "\n\u2022 MEGA RAVL \u2014 a special menu button that will dial up a monster RavL puzzle any time you feel masochistically inclined!" +
                "\n\nSo please, poke away at the button and make the jump!"
                }
                </div>
              </div>
              <div style={support_styles.button_container}>
                <div style={support_styles.button} onClick={() => this.startPurchaseFlow()} >
                  <div style={support_styles.button_text_white}>{"UPGRADE \u2022 RAVL"}</div>
                </div>
              </div>

              <div style={{...support_styles.underlinedAcme, color: darkModeEnabled ? colors.off_white:colors.off_black}}>...oh, and the fine print:</div>

              <div style={{...support_styles.text_small, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {"\u2022 The "}
              <a
                  style={{...support_styles.link_text_small, color: darkModeEnabled ? colors.bright_green:colors.dark_blue}}
                  href={'https://policies.google.com/privacy'}
                >
                  {"Google Privacy Policy"}
                </a><span style={{...support_styles.text_small, color: darkModeEnabled ? colors.off_white:colors.off_black}}>{", "}</span>
                <a
                  style={{...support_styles.link_text_small, color: darkModeEnabled ? colors.bright_green:colors.dark_blue}}
                  href={'https://policies.google.com/terms'}
                >
                  {"Google Terms of Service"}
                </a><span style={{...support_styles.text_small, color: darkModeEnabled ? colors.off_white:colors.off_black}}>{", and our "}</span>
                <a
                  style={{...support_styles.link_text_small, color: darkModeEnabled ? colors.bright_green:colors.dark_blue}}
                  href={'https://kwishnu.github.io/ravl_privacy_policy.html'}
                >
                  {"Privacy Policy"}
                </a><span style={{...support_styles.text_small, color: darkModeEnabled ? colors.off_white:colors.off_black}}>{" apply."}</span></div>
                <div style={{...support_styles.copyrightContainer, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                  <div style={{...support_styles.copyright, whiteSpace: 'pre-line', color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                    {versionStr}
                  </div>
                  <div style={{...support_styles.copyright, whiteSpace: 'pre-line', color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                    {copyrightText}
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
        }
        </AnimatePresence>
      );
  }
}

export default Support;