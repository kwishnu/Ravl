import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const tablet = scrHeight/scrWidth > 1.77?false:true;
let modalHeight = scrHeight * 0.9;
let line = tablet?config.LINE_HEIGHT * 0.85:config.LINE_HEIGHT;

 const help_styles = {

containerView: {
  display: 'flex',
  flex: 1,
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalView: {
  display: 'flex',
  flexDirection: 'column',
  height: "90%",
  width: config.isPC?scrHeight * 9/16:scrWidth * 0.95,
  borderRadius: 5,
  padding: 10,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
    borderColor: 'red', borderWidth: 2, borderStyle: 'solid'

  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 10,
  zIndex: 100
},
modalHeader: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "center",
  height: line * 5,
  alignSelf: "stretch",
  paddingLeft: tablet?scrWidth * 0.01:0,
  borderColor: 'red', borderWidth: 2, borderStyle: 'solid'
},
titleContainer: {
  display: 'flex',
  flex: 1,
  justifyContent: "flex-start",
  alignItems: "flex-start",
  borderColor: 'yellow', borderWidth: 2, borderStyle: 'solid'
},
r_tile_container: {
  position: "absolute",
  top: tablet?-scrHeight * 0.05:-scrWidth * 0.15,
  left: scrWidth * 0.5,
  height: 80,
  width: 80,
},
r_tile_image: {
  height: tablet?scrWidth * 0.13:80,
  width: tablet?scrWidth * 0.13:80
},
closeButtonContainer: {
  display: 'flex',
  justifyContent: "flex-end",
  alignItems: "flex-end",
  flex: 1,
  borderColor: 'red', borderWidth: 2, borderStyle: 'solid'
},
modalBody: {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  alignSelf: 'stretch',
  padding: 12,
  //width: config.isPC?scrHeight * 9/16 - 30:scrWidth * 0.9,
  borderRadius: 10,
  borderColor: 'blue', borderWidth: 2, borderStyle: 'solid'

},
sectionHeading: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "flex-start",
  height: line * 1.3,
  alignItems: "flex-start",
  marginTop: 4,
},
section1_container: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: line * 10,
  borderColor: 'pink', borderWidth: 2, borderStyle: 'solid'
},
section2_container: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: line * 8,
  borderColor: 'yellow', borderWidth: 2, borderStyle: 'solid'
},
section3_container: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: line * 1,
  borderColor: 'black', borderWidth: 2, borderStyle: 'solid'
},
section4_container: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "flex-start",
  alignItems: "flex-start",
  height: line * 2,
  borderColor: 'green', borderWidth: 2, borderStyle: 'solid'
},
button: {
  width: scrWidth/4,
  height: 45,
  borderRadius: config.button_radius,
  justifyContent: "center",
  marginTop: 20,
  backgroundColor: colors.button_blue,
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 6,
},
button_text: {
  fontFamily: "Acme",
  fontSize: 18,
  color: colors.off_white,
  textAlign: "center",
},
board_image: {
  height: modalHeight * 0.25,
  width: scrWidth * 0.25,
  marginLeft: 14,
  resizeMode: 'contain',
},
arrow_image: {
  height: modalHeight * 0.25,
  width: 60,
  marginLeft: 10,
  resizeMode: 'contain',
},
close_image: {
  height: 35,
  width: 35,
  marginRight: 10
},
title: {
  fontSize: convertFont(38),
  fontFamily: "Acme",
},
section_heading: {
  fontSize: convertFont(26),
  fontFamily: "Acme",
  textDecorationLine: "underline"
},
text: {
  fontSize: config.isPC?convertFont(16):convertFont(21),
  lineHeight: line
},
text_small: {
  fontSize: 14,
},


}

export default help_styles;