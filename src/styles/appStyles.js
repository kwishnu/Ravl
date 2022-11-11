import colors from '../config/colors';
const scrHeight = window.innerHeight;
//const scrWidth = window.innerWidth;

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
    width: scrHeight * 9/16,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.transparent,
    borderColor: 'green', borderWidth: 2, borderStyle: "solid"
  },
  messageHeader: {
    flex: 1,
    display: "flex",
    width: scrHeight * 9/16,
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
    width: scrHeight * 9/16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderColor: 'blue', borderWidth: 2, borderStyle: "solid"
  },
  gameContainer: {
    flexDirection: "column",
    display: "flex",
    flex: 15,
    width: scrHeight * 9/16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderColor: 'pink', borderWidth: 2, borderStyle: "solid"
  },
  footerContainer: {
    flexDirection: "column",
    display: "flex",
    flex: 4,
    width: scrHeight * 9/16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.transparent,
    borderColor: 'red', borderWidth: 2, borderStyle: "solid"
  },



}

export default appStyles;