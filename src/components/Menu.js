import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import colors from '../config/colors';
import config from '../config/config';
import MenuHeader from '../components/MenuHeader';
import MenuItem from '../components/MenuItem';
import closeImage from '../images/close.png';
import settingsImage from '../images/settings.png';
import helpImage from '../images/question.png';
import supportImage from '../images/heart.png';
import gameImage from '../images/ravl_menu_icon.png';
// const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  closeMenu(){
    this.props.closeMenu();
  }
  showModal(which){
    this.props.showModal(which, true);
  }
      
  render() {
    const { showMenu } = this.props;
    return (
      <AnimatePresence>
        {showMenu && 
          <motion.div
            initial={{ x: -scrHeight * 0.2 }}
            animate={{ x: -2 }}
            exit={{ x: -scrHeight * 0.2 }}
            style={{...menu_styles.menu}}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <div style={{...menu_styles.text, fontSize: 16, color: 'black'}}>
              <MenuHeader text={"RavL"} imageUrl={closeImage} altText={"RavL - Close Menu Link"} closeMenu={() => this.closeMenu()}/>
              <MenuItem text={"RavL Start"} imageUrl={gameImage} altText={"RavL Start Link"} showModal={(which) => this.showModal(which, true)}/>
              <div style={menu_styles.divider}></div>
              <MenuItem text={"Settings"} imageUrl={settingsImage} altText={"Settings Link"} showModal={(which) => this.showModal(which, true)}/>
              <MenuItem text={"Help"} imageUrl={helpImage} altText={"Help Link"} showModal={(which) => this.showModal(which, true)}/>
              <MenuItem text={"Support"} imageUrl={supportImage} altText={"Support Link"} showModal={(which) => this.showModal(which, true)}/>
              <MenuItem text={"Mega RavL"} imageUrl={gameImage} altText={"Mega RavL Link"} showModal={(which) => this.showModal(which, true)}/>
            </div>
            </motion.div>
        }
      </AnimatePresence>
    );
  }
}

const menu_styles = {
  menu: {
    display: "flex",
    position: 'absolute',
    margin: 1,
    height: scrHeight,
    width: scrHeight * 0.2,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: colors.gray_3,
    borderWidth: 1,
    borderColor: colors.off_black, 
    borderStyle: 'solid',
    padding: 10,
    zIndex: 20
  },
  divider: {
    display: "flex",
    alignSelf: 'center',
    height: '6px',
    width: scrHeight * 0.1,
    marginLeft: scrHeight * 0.05,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: colors.off_black,
    borderColor: colors.ravl_purple,
    borderWidth: 1,
    borderStyle: 'solid',

  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
  }
}

export default Menu;