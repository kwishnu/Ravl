import colors from '../config/colors';
import config from '../config/config';
// const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;

function Footer(props) {
  return(
    <div style={footerStyles.container}>
      <div style={footerStyles.left_div}>
      </div>
      <div style={footerStyles.center_div}>
      </div>
      <div style={footerStyles.right_div}>
      </div>
    </div>
  )

}

const footerStyles = {
  container: {
    display: "flex",
    flexDirection: "row",
    position: 'absolute',
    top: scrHeight * 0.89,
    bottom: 0,
    right: 0, 
    left: 0,
    width: config.scrWidth,
    alignSelf: 'stretch',
    backgroundColor: colors.dark_purple,

  },
  left_div: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: 'red', borderWidth: 2, borderStyle: 'solid'

  },
  center_div: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: 'yellow', borderWidth: 2, borderStyle: 'solid'

  },
  right_div: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderColor: 'green', borderWidth: 2, borderStyle: 'solid'

  },

}

export default Footer;