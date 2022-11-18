import {
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  // Button,
} from "@material-ui/core";
import {
  QuestionAnswerOutlined,
  DraftsOutlined,
  HomeOutlined,
  SettingsOutlined,
  ContactSupportOutlined,
} from "@material-ui/icons";
// import { useState } from "react";
import React, { Component } from 'react';
import colors from './config/colors';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
// import Settings from "../screens/settings";
// import Help from "../screens/help";
// import Support from "../screens/support";
// import Words from "./modal/WordsModal";
// import EndGame from "./modal/EndGameModal";
// import ThankYou from "./modal/ThankYouModal";
import HintNag from "./modal/HintNagModal";
import TileSet from './components/TileSet';
import styles from './styles/appStyles.js';
// import stylesCSS from './styles/App.module.css';


const data = [
  {
    name: "RavL",
    icon: <HomeOutlined />,
  },
  { name: "Settings", icon: <SettingsOutlined /> },
  { name: "Help", icon: <ContactSupportOutlined /> },
  { name: "Support", icon: <QuestionAnswerOutlined /> },
  { name: "Mega RavL", icon: <DraftsOutlined /> },
];

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleViewRef = ref => this.view = ref;
    // this.handleTileRef = ref2 => this.view = ref2;
    this.state = {
      text: this.props.text,
      tileHeight: this.props.tileHeight,
      yOffset: 0,
      intervalID: 0,
      bgColor: colors.text_white,
      textColor: colors.off_black,
      darkModeEnabled: this.props.dark,
      showHintNagModal: false,
      isOpen: false
      // xValue: posOrNeg() * getRandomInt(20, 100)
    };
  }
  getList(){
    return(
    <div onClick={() => this.toggleDrawer()}>
      {data.map((item, index) => (
        <ListItem button key={index}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      ))}
    </div>
    )
}  
  // const [open, setOpen] = useState(false);
toggleDrawer(which){
  this.setState({isOpen: !this.state.isOpen});
  console.log("which: " + which);
}
transitionToGame(daily){
  console.log("transition to game...");
  this.setState({showHintNagModal: true});
}
closeModal(){
  this.setState({
    // showSettingsModal: false,
    // showHelpModal: false,
    // showSupportModal: false,
    // showWordsModal: false,
    // showEndGameModal: false,
    // showThankYouModal: false,
    showHintNagModal: false,
    // modalCall: "None"
  });
}


  render() {
    return (
      <div>

        <div style={styles.container}>
          <div style={styles.AppLeftBox}>

          </div>

          <div style={styles.appContainer}>
            <div id="messageHeader" style={styles.messageHeader}>
            </div>
            <div id="gameContainer" style={styles.gameContainer}>
              <TileSet tilesInColumn={4} tileHeight={60} />
              <TileSet tilesInColumn={4} tileHeight={60}/>
              <TileSet tilesInColumn={4} tileHeight={60}/>
            </div>
            <div  id="footerContainer" style={styles.footerContainer}>
            </div>
          </div>

            <Drawer anchor={"left"} open={this.state.isOpen} onClose={() => this.setState({isOpen: false})}>
              {this.getList()}
            </Drawer>
            <Header 
              clickMenu={(which) => this.toggleDrawer(which)}
            />
              <Footer puzzleStreak={'3'} startGame={(daily) => this.transitionToGame(daily)}/>

          <div style={styles.AppRightBox}>

          </div>
        </div>
        {this.state.showHintNagModal &&
          <div>
            <HintNag isModalVisible={this.state.showHintNagModal} isDarkModeEnabled={this.state.darkModeEnabled} requestModalClose={()=>{this.closeModal()}}/>
          </div>
        }
        </div>
    );
  }
}

export default App;
