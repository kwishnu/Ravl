import colors from '../config/colors';
import config from '../config/config';
import {convertFont} from '../config/config';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const tablet = config.isTablet;
const pc = config.isPC;
// const phone = config.isPhone;
const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2;

const appStyles = {


  loading_container: {
    display: 'flex',
    flex: 1,
    height: scrHeight,
    width: scrWidth,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.dark_purple,
  },
  container: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray_4,
  },
  appContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    height: scrHeight,
    width: scrWidth,
    maxWidth: scrWidth,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.transparent,
  },
  screen_lock: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colors.transparent,
  },
  AppLeftBox: {
    height:"100%",
    width: config.isPC || config.isTablet?widthLeftOrRight:0,
    textAlign: "center"
  },
  AppRightBox: {
    height:"100%",
    width: config.isPC || config.isTablet?widthLeftOrRight:0,
    textAlign: "center"
  },
  messageHeader: {
    flex: 1,
    display: "flex",
    width: config.isPC || config.isTablet?scrHeight * 9/16:scrWidth,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderTop: 'yellow', 
    borderWidth: 2, 
    borderStyle: "solid none none none"
  },
  scoreContainer: {
    flexDirection: "row",
    display: "flex",
    flex: 4,
    width: config.isPC || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderTop: 'blue', 
    borderWidth: 2, 
    borderStyle: "solid none none none"
  },
  gameContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 18,
    width: config.isPC || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderTop: 'pink', 
    borderWidth: 2, 
    borderStyle: "solid none none none"
  },
  footerContainer: {
    flexDirection: "row",
    display: "flex",
    flex: 2,
    width: config.isPC || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark_purple,
    borderColor: colors.black, 
    borderWidth: 2, 
    borderStyle: "solid none none none"
  },
   button: {
    height: tablet? scrHeight * 0.06:pc? scrHeight * 0.04:scrWidth * 0.1,
    width: tablet? scrHeight * 0.12:pc? scrHeight * 0.1:scrWidth/4,
    borderRadius: config.button_radius,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.button_blue,
    justifyContent: "center",
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: colors.button_blue,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,
  },
  counter_text: {
    fontSize: convertFont(30),
    color: colors.text_white,
  },
  done_text: {
    fontSize: convertFont(29),
    margin: 10,
    textAlign: 'center'
  },
  button_text: {
    fontFamily: "Acme",
    fontSize: convertFont(22),
    color: colors.off_white,
    textAlign: "center",
  },
  button_text_white: {
    fontFamily: "Acme",
    fontSize: convertFont(22),
    color: colors.off_white,
    textAlign: "center",
  },
 


}

export default appStyles;