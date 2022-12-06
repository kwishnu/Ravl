import React, {Component} from 'react';
import help_styles from "../styles/help_styles";
import colors from '../config/colors';
// import closeImage from '../images/close.png';
// const KEY_ModePref = 'modePrefKey';

class Help extends Component {
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
    this.props.requestModalClose("Help", false);
  }
   render() {
    const row1Text1 = "\u2022  Find the hidden ";
    const row1Text2 = "horizontal ";
    const row1Text3 = "words of full puzzle width\n\u2022  Form words by moving the columns of letters";
    const row1Text4 = " up and down";
    const row1Text5 = " to align words going";
    const row1Text6 = "  across\n";
    const row2Text1 = "\u2022  Make sure that the red RavL tile is in a word formed with your ";
    const row2Text2 = "last move!\n\n";
    const row2Text3 = "Incidental words earn points, but only the puzzle words will ";
    const row2Text4 = "clear the board\n";
    const row2Text5 = "\u2022  Form a word with the RavL tile early, or\n\u2022  Run out of points "
                       + "(1 point for each move that doesn't form a word)\n   ...or the round will fail\n\n"
                       + "\u2605  Completing a game without using hints or failing as described will earn a star for your home screen!";
    const row3Text1 = "\u2022  Cost 5 points for the first, 10 thereafter";
    const row4Text1 = "\u2022  1 point earned for each letter in the word formed";
    const { isModalVisible } = this.props;
    // const xImage = this.props.darkModeEnabled? require("../images/close.png"):require("../images/close_black.png");
    let { darkModeEnabled } = this.props;
console.log("isModalVisible; " + isModalVisible);
    return(
        isModalVisible &&
        <div style={help_styles.containerView}>
          <div style={{...help_styles.modalView, backgroundColor: darkModeEnabled ? colors.gray_4:colors.off_white}}>
            <div style={help_styles.modalHeader}>
              <div style={help_styles.titleContainer}>
                <div style={{...help_styles.title, color: darkModeEnabled ? colors.off_white:colors.off_black}}>How to Play</div>
              </div>
              <div style={help_styles.closeButtonContainer}>
                <img
                  style = {help_styles.close_image}
                  source = {"../images/close.png"}
                  onClick={() => this.closeSelf()}
                  alt = {"Close Button"}
                />
              </div>
            </div>
            <div style={{...help_styles.modalBody, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
              <div style={{...help_styles.sectionHeading, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                  <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>Do:</div>
              </div>
              <div style={{...help_styles.section1_container, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row1Text1}
                <div style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row1Text2}
                </div>
                {row1Text3}
                <div style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row1Text4}
                </div>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row1Text5}
                <div style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row1Text6}
                </div>
                </div>
                {row2Text1}
                <div style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row2Text2}
                </div>
                {row2Text3}
                <div style={{...help_styles.text, fontWeight: "bold", color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row2Text4}
                </div>
                </div>
              </div>
              <div style={{...help_styles.sectionHeading, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>Do Not:</div>
              </div>
              <div style={{...help_styles.section2_container, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row2Text5}
                </div>
              </div>
              <div style={{...help_styles.sectionHeading, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>Hints:</div>
              </div>
              <div style={{...help_styles.section3_container, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row3Text1}
                </div>
              </div>
              <div style={{...help_styles.sectionHeading, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                <div style={{...help_styles.section_heading, color: darkModeEnabled ? colors.off_white:colors.off_black}}>Points:</div>
              </div>
              <div style={{...help_styles.section4_container, backgroundColor: darkModeEnabled ? colors.gray_3:colors.off_white2}}>
                <div style={{...help_styles.text, color: darkModeEnabled ? colors.off_white:colors.off_black}}>
                {row4Text1}
                </div>
              </div>
              <div style={help_styles.r_tile_container}>
                <img
                  source={require("../images/r_ravl_tile.png")}
                  style={help_styles.r_tile_image}
                  alt={"Tile"}
                />
              </div>
            </div>
          </div>
        </div>
     )
   }
}

export default Help;