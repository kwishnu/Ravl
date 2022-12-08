
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const scrWidth = config.SCREEN_WIDTH;
const scrHeight = config.SCREEN_HEIGHT;
const tablet = scrHeight/scrWidth > 1.77?false:true;

//import { normalizeFont }  from '../config/pixelRatio';

const tut_styles = {
tut_screen: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.transparent,
},
tut_dialog1: {
  alignItems: 'center',
  justifyContent: 'center',
  width: tablet?scrWidth * 0.5:scrWidth * 0.6,
  height: scrHeight * 0.3,
  backgroundColor: colors.text_white,
  padding: scrWidth * 0.06,
  borderRadius: 8,
  marginLeft: 65,
  marginBottom: tablet?scrHeight * 0.56:scrHeight * 0.47,
  boxShadow: `10px 20px 20px ${colors.off_black}`,
},
tut_dialog2: {
  alignItems: 'center',
  justifyContent: 'center',
  width: tablet?scrWidth * 0.6:scrWidth * 0.75,
  height: scrHeight * 0.25,
  backgroundColor: colors.text_white,
  borderRadius: 8,
  marginRight: 50,
  paddingTop: 10,
  paddingLeft: scrWidth * 0.06,
  paddingRight: scrWidth * 0.06,
  marginTop: scrHeight * 0.6,
  boxShadow: `10px 20px 20px ${colors.off_black}`,
},
tut_text: {
  fontSize: convertFont(23),
  color: colors.off_black,
},
button: {
  width: tablet?scrWidth/7:scrWidth/4,
  height: 45,
  borderRadius: config.button_radius,
  justifyContent: "center",
  marginTop: 20,
  backgroundColor: colors.button_blue,
  boxShadow: `10px 20px 20px ${colors.off_black}`,
},
button_text: {
  fontFamily: "Acme",
  fontSize: convertFont(20),
  color: colors.off_white,
  textAlign: "center",
},
arrow_image: {
  width: scrWidth/6,
  height: scrWidth/4,
  position: 'absolute',
  top: scrHeight * 0.3,
  left: tablet?scrWidth * 0.22:scrWidth * 0.3,
}


}

export default tut_styles;