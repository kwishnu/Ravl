import colors from '../config/colors';
import config from '../config/config';
import MenuImage from '../images/menu.png';
import SupportImage from '../images/close.png';
import HelpImage from '../images/question.png';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const marLeftOrRight = (scrWidth - scrHeight * 9/16)/2;

function Header(props) {
  return(
    <div style={headerStyles.container}>
      <div style={headerStyles.left_div}>
      <img src={MenuImage} alt={"Menu"} style={headerStyles.menuImageStyle} onClick={() => props.clickMenu("Menu")} />          
      </div>
      <div style={headerStyles.center_div}>
        <div style={headerStyles.titleText}>
          RavL          
        </div>
      </div>
      <div style={headerStyles.right_div}>
        <img src={SupportImage} alt={"Support"} style={headerStyles.supportImageStyle} onClick={() => props.showModal("Support")} />          
        <img src={HelpImage} alt={"Help"} style={headerStyles.helpImageStyle} onClick={() => props.showModal("Help")} />          
      </div>
    </div>
  )
}

const headerStyles = {
  container: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    top: 0,
    left: 0,
    width: config.scrWidth,
    height: 60,
    backgroundColor: colors.dark_purple,

  },
  left_div: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",

  },
  center_div: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  right_div: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"

  },
  menuImageStyle: {
    width: config.isPC || config.isTablet?scrHeight * 0.03:scrWidth * 0.08,
    height: config.isPC || config.isTablet?scrHeight * 0.03:scrWidth * 0.08,
    marginLeft: config.isPC || config.isTablet?marLeftOrRight:10,
  },
  supportImageStyle: {
    width: config.isPC || config.isTablet?scrHeight * 0.03:scrWidth * 0.08,
    height: config.isPC || config.isTablet?scrHeight * 0.03:scrWidth * 0.08,
  },
  helpImageStyle: {
    width: config.isPC || config.isTablet?scrHeight * 0.03:scrWidth * 0.08,
    height: config.isPC || config.isTablet?scrHeight * 0.03:scrWidth * 0.08,
    marginRight: config.isPC || config.isTablet?marLeftOrRight:10,
  },
  titleText: {
    fontFamily: "Acme",
    fontSize: 30,
    color: colors.off_white,
    textAlign: "center",
    marginTop: 8
  },

}

export default Header;