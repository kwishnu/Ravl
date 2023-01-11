import colors from '../config/colors';
import config from '../config/config';
// import {convertFont} from '../config/config';
// const scrWidth = config.scrWidth;
// const scrHeight = config.scrHeight;
const tablet = config.isTablet;
const pc = config.isPC;
const phone = config.isPhone;

// const phone = config.isPhone;
const appStyles = ({ scrWidth, scrHeight }) => {
  const widthLeftOrRight = (scrWidth - scrHeight * 9/16)/2 + 20;
  const convertFont = (inputFontSize) => tablet || pc?inputFontSize * scrHeight/1200:inputFontSize * scrWidth/460;

  return {
    loading_container: {
      display: 'flex',
      flex: 1,
      height: scrHeight,
      width: scrWidth,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      height: "100%",
      width: "100%",
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
    adBox: {
      display: "flex",
      flexDirection: "row",
      position: "absolute",
      top: 0,
      bottom: 0,
      width: pc ? widthLeftOrRight - 40 : 0,
      borderStyle: "solid",
      borderWidth: 2,
      zIndex: 1000,
    },
    screen_lock: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: colors.transparent,
    },
    messageOuterContainer: {
      display: "flex",
      flex: 1,
      width: pc ? scrWidth - (widthLeftOrRight - 20) * 2 : scrWidth,
      marginTop: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.gray_4,
      borderWidth: 3,
      borderStyle: "none none solid none",
    },
    messageContainer: {
      display: "flex",
      flex: 1,
      width: pc || tablet ? scrHeight * 9 / 16 : scrWidth,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginLeft: pc || tablet ?30:14,
      backgroundColor: colors.transparent,
    },
    scoreContainer: {
      display: "flex",
      flexDirection: "row",
      flex: 3,
      position: "relative",
      width: pc || tablet ? scrHeight * 9 / 16 : scrWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.off_black,
      marginStart: 5,
      marginEnd: 5,
      border: colors.dark_green,
      borderRadius: 5,
      borderWidth: 2,
      borderStyle: "none solid solid solid",
      zIndex: 10
    },
    stars_container: {
      display: "flex",
      flexDirection: 'column',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 4,
      alignItems: 'flex-start',
      justifyContent: 'center',
      backgroundColor: colors.off_black,
      zIndex: 101
    },
    stars100_container: {
      display: "flex",
      flexDirection: 'row',
      position: 'absolute',
      top: 2,
      right: 0,
      left: 0,
      height: convertFont(30),
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: colors.gray_4,
      borderRadius: config.button_radius,
      borderWidth: 2,
      borderStyle: 'solid'
    },
    star_row: {
      display: "flex",
      flexDirection: 'row',
    },
    star: {
      fontSize: convertFont(24),
      marginTop: -8,
      marginRight: pc ? 0 : 1
    },
    star100: {
      fontSize: pc || tablet ? convertFont(32) : convertFont(24),
      marginTop: pc || tablet ? -6 : -4
    },
    solved_words_inner_container: {
      display: "flex",
      flex: 10,
      flexDirection: 'column',
      position: "relative",
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignSelf: 'stretch',
      marginStart: 8,
      marginTop: 3,
    },
    counter_inner_container: {
      display: "flex",
      flex: 2,
      flexDirection: 'column',
      height: scrHeight / 17,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
      backgroundColor: colors.button_blue,
      margin: 8,
    },
    solved_words: {
      display: "flex",
      flexDirection: 'column',
      alignSelf: 'stretch',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    solved_words_row: {
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      height: scrHeight * 0.025,
      zIndex: 101,
      textAlign: "center",
    },
    solved_words_slot: {
      display: "flex",
      height: scrHeight * 0.025,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: "center",
      marginRight: 2,
      marginLeft: 7,
    },
    animated_solved_word: {
      position: 'absolute',
      top: 50,
      left: 100,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 4,
      borderColor: colors.bright_green,
      borderWidth: 1,
      borderStyle: "solid",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.off_black,
      zIndex: 200
    },
    gameContainer: {
      display: "flex",
      flexDirection: "row",
      position: "relative",
      flex: pc ? 24 : 18,
      width: pc || tablet ? scrHeight * 9 / 16 : scrWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.transparent,
    },
    footerContainer: {
      display: "flex",
      flexDirection: "row",
      flex: 2,
      width: pc || tablet ? scrHeight * 9 / 16 : scrWidth,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: colors.black,
      borderWidth: 2,
      borderStyle: "solid none none none"
    },
    thumb_view: {
      display: "flex",
      flexDirection: "row",
      position: 'absolute',
      top: scrHeight * 0.3,
      bottom: scrHeight * 0.44,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.transparent,
      zIndex: 1000
    },
    game_over_button_view: {
      display: "flex",
      flexDirection: "row",
      position: 'absolute',
      top: scrHeight * 0.65,
      bottom: scrHeight * 0.2,
      left: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.transparent,
    },
    done_container: {
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: scrHeight / 11,
    },
    game_over_button: {
      width: tablet ? scrWidth / 6 : pc ? scrHeight / 14 : scrWidth / 4.8,
      height: tablet ? scrWidth / 6 : pc ? scrHeight / 14 : scrWidth / 4.8,
      borderRadius: config.button_radius,
      justifyContent: "center",
      alignItems: 'center',
      marginLeft: convertFont(18),
      marginRight: convertFont(18),
      marginTop: phone ? 100 : 0,
      backgroundColor: colors.button_blue,
      boxShadow: `10px 10px 28px ${colors.off_black}`,
    },
    button: {
      borderRadius: config.button_radius,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.button_blue,
      justifyContent: "center",
      marginLeft: 15,
      marginRight: 15,
      backgroundColor: colors.button_blue,
      boxShadow: `8px 8px 28px ${colors.off_black}`,
    },
    header_text: {
      fontSize: tablet || pc ? convertFont(20) : convertFont(19),
      fontFamily: "system-ui",
      color: colors.text_white,
      marginRight: 15,
      alignSelf: "center",
      userSelect: 'none'
    },
    counter_text: {
      fontSize: pc ? convertFont(34) : convertFont(31),
      fontFamily: 'system-ui',
      color: colors.text_white,
      userSelect: 'none'
    },
    done_text: {
      fontSize: pc || tablet ? convertFont(29) : convertFont(25),
      fontFamily: 'system-ui',
      margin: 10,
      textAlign: 'center',
      userSelect: 'none'
    },
    button_text: {
      fontFamily: "Acme",
      fontSize: convertFont(22),
      color: colors.off_white,
      textAlign: "center",
      userSelect: 'none'
    },
    button_text_white: {
      fontFamily: "Acme",
      fontSize: convertFont(22),
      color: colors.off_white,
      textAlign: "center",
      userSelect: 'none'
    },
    debug_text: {
      fontSize: convertFont(16),
      fontFamily: 'system-ui',
      color: colors.bright_green,
      userSelect: 'none'
    },
    solved_text: {
      fontSize: convertFont(25),
      fontFamily: 'system-ui',
      color: colors.bright_green,
      userSelect: 'none'
    },
  };
};

export default appStyles;