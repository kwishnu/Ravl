import colors from '../config/colors';
import config from '../config/config';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2;

const appStyles = {


  container: {
    display: "flex",
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
    padding: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.transparent,
    borderColor: 'green', borderWidth: 2, borderStyle: "solid"
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
    borderColor: 'yellow', borderWidth: 2, borderStyle: "solid"
  },
  scoreContainer: {
    flexDirection: "row",
    display: "flex",
    flex: 4,
    width: config.isPC || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderColor: 'blue', borderWidth: 2, borderStyle: "solid"
  },
  gameContainer: {
    flexDirection: "column",
    display: "flex",
    flex: 15,
    width: config.isPC || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderColor: 'pink', borderWidth: 2, borderStyle: "solid"
  },
  footerContainer: {
    flexDirection: "column",
    display: "flex",
    flex: 4,
    width: config.isPC || config.isTablet?scrHeight * 9/16:scrWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderColor: 'red', borderWidth: 2, borderStyle: "solid"
  },



}

export default appStyles;