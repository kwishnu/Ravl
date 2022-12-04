import React, { Component } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import colors from '../config/colors';
import config from '../config/config';
// const scrWidth = config.scrWidth;
const scrHeight = config.scrHeight;


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.menuRefs = [];

  }
  // componentDidMount() {

    
  // }
  render() {
    const { showMenu } = this.props;
    return (
      <AnimatePresence>
        {showMenu && 
          <motion.div
            initial={{ x: -scrHeight * 0.2 }}
            animate={{ x: -2 }}
            exit={{ x: -scrHeight * 0.2 }}
            onAnimationComplete={() => console.log("done")}
            style={{...menu_styles.menu}}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            <div style={{...menu_styles.text, fontSize: 16, color: 'black'}}>
              Hi!
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
    alignItems: 'center',
    backgroundColor: colors.gray_3,
    borderWidth: 1,
    borderColor: colors.off_black, 
    borderStyle: 'solid',
    padding: 0,
    zIndex: 20
  },
  text: {
    fontFamily: 'system-ui',
    fontWeight: 'bold',
  }
}

export default Menu;