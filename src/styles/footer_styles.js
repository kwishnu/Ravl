import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const scrWidth = config.SCREEN_WIDTH;
const scrHeight = config.SCREEN_HEIGHT;
const tablet = scrHeight/scrWidth > 1.77?false:true;

//import { normalizeFont }  from '../config/pixelRatio';

const footer_styles = {

footer_start_buttons: {
  flexDirection: 'column',
  position: 'absolute',
  top: scrHeight * 0.80,
  bottom: 0,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderColor: colors.dark_blue,
  borderTopWidth: 3
},
start_buttons_row: {
  flexDirection: 'row',
  flex: 4,
  width: scrWidth,
  alignItems: 'flex-end',
  justifyContent: 'center',
},
start_button: {
  flex: tablet?1:2,
  height: tablet? scrHeight * 0.06:scrWidth * 0.13,
  borderRadius: config.button_radius + 10,
  justifyContent: "center",
  backgroundColor: colors.button_blue,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 10,
  borderColor: colors.transparent,
  borderLeftWidth: tablet?10:8,
  borderRightWidth:  tablet?10:8
},
footer_spacer: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
streak_row: {
  flexDirection: 'row',
  flex: 3,
  width: scrWidth,
  alignItems: 'flex-start',
  justifyContent: 'center',
  marginTop: scrHeight * .008,
},
streak_cell1: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-start',
  alignSelf: 'stretch',
},
streak_cell2: {
  flex: 4,
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'center',
  alignSelf: 'stretch',
},
streak_cell3: {
  flex: 2,
  alignItems: 'center',
  justifyContent: 'flex-start',
  alignSelf: 'stretch',
},
streak_text: {
  fontSize: convertFont(18),
  color: colors.off_white,
  marginBottom: 12,
},
streak_text_bubble: {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: colors.off_black,
  borderColor: colors.gray_2,
  borderWidth: 1,
  borderRadius: 20,
  marginTop: 6,
  paddingLeft: 16,
  paddingRight: 16
},
streak_number_text: {
  fontSize: convertFont(20),
  color: colors.bright_green,
},
}

export default footer_styles;