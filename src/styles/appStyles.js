import colors from '../config/colors';
import config from '../config/config';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2;

const appStyles = {


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
  AppLeftBox: {
    height:"100%",
    width: config.isPC || config.isTablet?widthLeftOrRight:0,
    textAlign: "center"
  },
  AppLRightBox: {
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
    flexDirection: "column",
    display: "flex",
    flex: 2,
    width: config.isPC || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'stretch',
    justifyContent: 'stretch',
    backgroundColor: colors.transparent,
    borderColor: 'red', 
    borderWidth: 2, 
    borderStyle: "solid none none none"
  },



}

export default appStyles;