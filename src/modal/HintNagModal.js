import React, { Component } from 'react';
// import Modal from 'react-modal';
import config from '../config/config';
import {convertFont} from '../config/config';
import colors from '../config/colors';
const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;
const line = config.LINE_HEIGHT;

class HintNagModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkModeEnabled: this.props.isDarkModeEnabled,
    };
  }
  componentDidMount() {
  }
  closeSelf(){
    this.props.requestModalClose();
  }
  goToStart(){
    this.props.requestGoToStart();
  }

  render() {
    const { 
            isDarkModeEnabled,//isModalVisible
          } = this.props;
    // let modalVisible = isModalVisible;
console.log("rendering...");
    return(

<div style={hn_modal_styles.centereddiv}>
          <div style={{...hn_modal_styles.modaldiv, backgroundColor: isDarkModeEnabled ? colors.off_black:colors.off_white}}>
            <div style={hn_modal_styles.text_container}>
              <div style={{...hn_modal_styles.modal_title, color: isDarkModeEnabled ? colors.gray_1:colors.off_black}}>Nice Try!</div>
              <div style={{...hn_modal_styles.modal_text, color: isDarkModeEnabled ? colors.gray_2:colors.off_black}}>{"You'll have to get that last one by yourself!"}</div>
            </div>
            <div style={hn_modal_styles.button_container}>
              <button
                style={hn_modal_styles.button}
                onClick={() => this.closeSelf()}
              >
                <div style={hn_modal_styles.button_text}>OK</div>
              </button>
            </div>
          </div>
        </div>

    );
  }
}

const hn_modal_styles = {
  centereddiv: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: scrWidth,
  },
  modaldiv: {
    flexDirection: 'column',
    width: config.isPC?scrHeight * 0.2:config.isTablet?scrWidth * 0.5:scrWidth * 0.7,
    padding: 25,
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  button_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  text_container: {
    alignSelf: 'stretch',
  },
  button: {
    borderRadius: 7,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: line,
    paddingBottom: line,
    paddingLeft: line * 2,
    paddingRight: line * 2,
    backgroundColor: colors.button_blue,
  },
  button_text: {
    color: "white",
    fontSize: convertFont(23),
    fontWeight: 'bold',
    textAlign: "center"
  },
  modal_title: {
    fontSize: convertFont(30),
    fontFamily: 'Acme',
    marginBottom: 15,
    textAlign: "left"
  },
  modal_text: {
    fontSize: convertFont(22),
    marginBottom: 30,
    marginTop: 15,
    textAlign: "left"
  },
}

export default HintNagModal;