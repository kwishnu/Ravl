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
import { CircularProgress } from '@mui/material';
// import { useState } from "react";
import React, { Component } from 'react';
import formatDate from 'date-fns/format';
// import parse from 'date-fns/parse';
// import * as funcs from './config/functions';
// import {getAnimatedWordLeft} from '../config/config';
import config from './config/config';
import colors from './config/colors';
import {puzzTitle, puzzDescription,  puzzles} from './data/dailyDataHelper';//numPuzzles,
import gamePlatitudes from "./data/game_plats";
import playRavlStr from "./data/PlayRavlStr";
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
import genWordArray from "./config/genWordArray";
const scrWidth = config.SCREEN_WIDTH;
const scrHeight = config.SCREEN_HEIGHT;
const tablet = scrHeight/scrWidth > 1.77?false:true;

const tileHeight = config.TILE_HEIGHT;

// import stylesCSS from './styles/App.module.css';
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
function transposeArray(sentArr) {
  return sentArr[0].map((col, i) => sentArr.map((row) => row[i]));
}
const data = [
  {
    name: "RavL", icon: <HomeOutlined /> },
  { name: "Settings", icon: <SettingsOutlined /> },
  { name: "Help", icon: <ContactSupportOutlined /> },
  { name: "Support", icon: <QuestionAnswerOutlined /> },
  { name: "Mega RavL", icon: <DraftsOutlined /> },
];

let dateToday = formatDate(new Date(), "MM-dd-yyyy");
let title = "";
let description = "";
let dailyPuzzlesArr = [];
let puzzleWords0 = genWordArray(3);
let puzzleWords1 = genWordArray(4);
let puzzleWords2 = genWordArray(5);
let puzzleWords3 = genWordArray(6);
let puzzleWords4 = genWordArray(7);
let puzzleWords5 = genWordArray(8);
let puzzleWords6 = genWordArray(9);
let puzzleWords7 = genWordArray(10);
let megaPuzzleArr = [];
let puzzleWords8 = [];
let puzzleWords9 = [];
let puzzleWords10 = [];
let solvedWords = [];
let bonusWords = [];

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleViewRef = ref => this.view = ref;
    // this.handleTileRef = ref2 => this.view = ref2;
    this.state = {
      level0Saved: [],
      gameArray0: [],
      gameArray1: [],
      gameArray2: [],
      gameArray3: [],
      gameArray4: [],
      gameArray5: [],
      gameArray6: [],
      gameArray7: [],
      gameArray8: [],
      gameArray9: [],
      gameArray10: [],
      puzzleWords: [],
      gameWords0: [],
      gameWords1: [],
      gameWords2: [],
      gameWords3: [],
      gameWords4: [],
      gameWords5: [],
      gameWords6: [],
      gameWords7: [],
      gameWords8: [],
      gameWords9: [],
      gameWords10: [],
      ravlTiles: [],
      megaWords: [],
      currentHintsArray: [],
      animationTimerIDs: [],
      starColorArray: ['#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333','#333333'],
      currentStarColor: '#FFD700',
      bonusWords: this.props.bonusWords,
      solvedWords: this.props.solvedWords,
      showPlayRavl: false,
      showStars: true,
      isDailyGame: false,
      dailyPuzzleCompleted: false,
      showGame0: false,
      showGame1: false,
      showGame2: false,
      showGame3: false,
      showGame4: false,
      showGame5: false,
      showGame6: false,
      showGame7: false,
      showGame8: false,
      showGame9: false,
      showGame10: false,
      showedTutScreen1: false,
      showedTutScreen2: true,
      gameStarted: false,
      gameDone: false,
      clearedLevel: true,
      showActionButton: false,
      showPuzzWordsModal: false,
      showHeaderComment: false,
      showSolvedWord: false,
      showSolvedWords: false,
      modalVisible: false,
      puzzleDisplayed: false,
      darkModeEnabled: false,
      newHighScore: false,
      eligibleForStar: true,
      animationStyle: "Leave",
      currentGameIndex: this.props.currentGameIndex,
      lastIndexInGame: 0,
      initialArrayHeight: 0,
      solvedWordsRowOffset: 0,
      solvedAnimX: 0,
      solvedAnimY: 0,
      progressSavedLevel: 0,
      rowsInPuzzle: 0,
      onRow: 0,
      score: this.props.score,
      highScore: 0,
      hintsGiven: 0,
      hintPenalty: 5,
      points: 0,
      solvedPadding: 0,
      playRavlIntervalID: 0,
      lettersetContainerWidth: null,
      lettersetContainerHeight: null,
      starsContainerWidth: 0,
      starsContainerHeight: 0,
      numberOfStars: 0,
      megaRavlRef: "",
      keyIDFragment: "",
      solvedWord: "",
      headerText: "",
      endMessage: "",
      endMessageFail: "Try Again!",
      headerComment: "",
      dailyGameDescription: "",
      nextBtnText: "NEXT",
      solvedModalMessage: "",
      bonusModalMessage: "",
      puzzleStreak: "0,01-01-2001",
      dailyStreak: "0,01-01-2001",
      lastPuzzleDay: "01-01-2001",
      lastDailyDay: "01-01-2001",
      lastOpenedDate: "01-01-2001",
      nextButtonEnabled: false,
      showHelpModal: false,
      showSupportModal: false,
      showWordsModal: false,
      showSettingsModal: false,
      showEndGameModal: false,
      showThankYouModal: false,
      showHintNagModal: false,
      dividerString: "",
      playedGameOnce: false,
      lockScreenInput: false,
      modalCall: this.props.modalCall,
      megaPuzzle: false,

      isOpen: false
      // xValue: posOrNeg() * getRandomInt(20, 100)
    };
    this.colRefs = [];
    this.lettersetContainer = React.createRef();
  }

  componentDidMount() {
    dateToday = formatDate(new Date(), "MM-dd-yyyy");
    title = puzzTitle(dateToday);
    description = puzzDescription(dateToday);
    dailyPuzzlesArr = puzzles(dateToday);
    this.setState({
      lettersetContainerHeight: this.lettersetContainer.current.getBoundingClientRect().height,
      lettersetContainerWidth: this.lettersetContainer.current.getBoundingClientRect().width
   });
    this.init(
      puzzleWords0,
      puzzleWords1,
      puzzleWords2,
      puzzleWords3,
      puzzleWords4,
      puzzleWords5,
      puzzleWords6,
      puzzleWords7,
      [[],[],[],[],[],[],[],[],[],[],[]],// this.props.solvedWords,
      [[],[],[],[],[],[],[],[],[],[],[]],// this.props.bonusWords,
      15,// this.props.score,
      -1,// this.props.currentGameIndex,
      true//eligibility for star
    )
  }
  init(
    p0,
    p1,
    p2,
    p3,
    p4,
    p5,
    p6,
    p7,
    sw,
    bw,
    sc,
    cgi,
    eligibility
  )
  {
    puzzleWords0 = p0;//['FIG','BAD','SAP'];
    puzzleWords1 = p1;
    puzzleWords2 = p2;
    puzzleWords3 = p3;
    puzzleWords4 = p4;
    puzzleWords5 = p5;
    puzzleWords6 = p6;
    puzzleWords7 = p7;
    dateToday = formatDate(new Date(), "MM-dd-yyyy");
    const dateTodayNice = formatDate(new Date(), "EEEE, MMM d");
    title = title === ""?puzzTitle(dateToday):title;
    description = description === ""?puzzDescription(dateToday):description;
    dailyPuzzlesArr = !dailyPuzzlesArr.length > 0?puzzles(dateToday):dailyPuzzlesArr;
    puzzleWords8 = dailyPuzzlesArr[0];
    puzzleWords9 = dailyPuzzlesArr[1];
    puzzleWords10 = dailyPuzzlesArr[2];
    solvedWords = sw;
    bonusWords = bw;
    // let swArray = [];
    let ravlArr = [];
    let dailyRavlArr = [];
    let colCount = 0;
    let rowCount = 0;
    let ravlRef = "";
    let straightArray0 = this.buildStraightArray(puzzleWords7);
    let gameArr0 = this.buildGameArray(straightArray0);
    colCount = gameArr0.length;
    rowCount = straightArray0.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr0 = gameArr0.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray1 = this.buildStraightArray(puzzleWords6);
    let gameArr1 = this.buildGameArray(straightArray1);
    colCount = gameArr1.length;
    rowCount = straightArray1.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr1 = gameArr1.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray2 = this.buildStraightArray(puzzleWords5);
    let gameArr2 = this.buildGameArray(straightArray2);
    colCount = gameArr2.length;
    rowCount = straightArray2.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr2 = gameArr2.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray3 = this.buildStraightArray(puzzleWords4);
    let gameArr3 = this.buildGameArray(straightArray3);
    colCount = gameArr3.length;
    rowCount = straightArray3.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr3 = gameArr3.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray4 = this.buildStraightArray(puzzleWords3);
    let gameArr4 = this.buildGameArray(straightArray4);
    colCount = gameArr4.length;
    rowCount = straightArray4.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr4 = gameArr4.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray5 = this.buildStraightArray(puzzleWords2);
    let gameArr5 = this.buildGameArray(straightArray5);
    colCount = gameArr5.length;
    rowCount = straightArray5.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr5 = gameArr5.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray6 = this.buildStraightArray(puzzleWords1);
    let gameArr6 = this.buildGameArray(straightArray6);
    colCount = gameArr6.length;
    rowCount = straightArray6.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr6 = gameArr6.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let straightArray7 = this.buildStraightArray(puzzleWords0);
    let gameArr7 = this.buildGameArray(straightArray7);
    colCount = gameArr7.length;
    rowCount = straightArray7.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    ravlArr.unshift(ravlRef);
    gameArr7 = gameArr7.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    let gameArr8 = [];
    if(puzzleWords10 && puzzleWords10.length){
      let straightArray8 = this.buildDailyArray(puzzleWords10);
      gameArr8 = this.buildGameArray(straightArray8);
      colCount = gameArr8.length;
      rowCount = straightArray8.length;
      ravlRef = this.makeRavlTileRef(rowCount, colCount);
      dailyRavlArr.unshift(ravlRef);
      gameArr8 = gameArr8.map((row, i) => {
        return row.map((letter, j) => ({
          letter,
          ref: "col" + i + ",row" + j,
        }));
      });
    }
    let gameArr9 = [];
    if(puzzleWords9 && puzzleWords9.length){
      let straightArray9 = this.buildDailyArray(puzzleWords9);
      gameArr9 = this.buildGameArray(straightArray9);
      colCount = gameArr9.length;
      rowCount = straightArray9.length;
      ravlRef = this.makeRavlTileRef(rowCount, colCount);
      dailyRavlArr.unshift(ravlRef);
      gameArr9 = gameArr9.map((row, i) => {
        return row.map((letter, j) => ({
          letter,
          ref: "col" + i + ",row" + j,
        }));
      });
    }
    let straightArray10 = this.buildDailyArray(puzzleWords8);
    let gameArr10 = this.buildGameArray(straightArray10);
    colCount = gameArr10.length;
    rowCount = straightArray10.length;
    ravlRef = this.makeRavlTileRef(rowCount, colCount);
    dailyRavlArr.unshift(ravlRef);
    gameArr10 = gameArr10.map((row, i) => {
      return row.map((letter, j) => ({
        letter,
        ref: "col" + i + ",row" + j,
      }));
    });
    // if(this.state.megaPuzzle){
    //   let straightArrayMega = this.buildStraightArray(this.state.megaWords);
    //   megaPuzzleArr = this.buildGameArray(straightArrayMega);
    //   const ravlRefMega = this.makeRavlTileRef(5, 9);
    //   this.setState({megaRavlRef: ravlRefMega});
    //   megaPuzzleArr = megaPuzzleArr.map((row, i) => {
    //     return row.map((letter, j) => ({
    //       letter,
    //       ref: "col" + i + ",row" + j,
    //     }));
    //   });
    // }
    for (var i = 0; i < 3; i++) {
      ravlArr.push(dailyRavlArr[i]);
    }

    let showPR = (cgi === -1)?true:false;//show "Play RavL" animation
    let showSW = (cgi === -1)?false:true;//show solved words
    // let showG0 = (cgi === 0)?true:false;
    let showG1 = (cgi === 1)?true:false;
    let showG2 = (cgi === 2)?true:false;
    let showG3 = (cgi === 3)?true:false;
    let showG4 = (cgi === 4)?true:false;
    let showG5 = (cgi === 5)?true:false;
    let showG6 = (cgi === 6)?true:false;
    let showG7 = (cgi === 7)?true:false;
    let showG8 = (cgi === 8 || cgi === 100)?true:false;
    let showG9 = (cgi === 9)?true:false;
    let showG10 = (cgi === 10)?true:false;
    let arrayToUse = [];
    let saveLevel = 0;
    let offset = 0
    let baseScore = (cgi < 8)?10:15;
    let scoreToUse = (cgi === 100)?20:(sc < baseScore)?baseScore:sc;
    let gameEndMsg = getRandom(gamePlatitudes, 1);
    let gameStartedBool = true;
    const isDaily = cgi > 7?true:false;
    const headerTxt = (cgi === 100)? "\u2605\u2605 Mega \u2605\u2605": cgi === -1? dateTodayNice + ` \u2022 ` + title : isDaily?description:"Level  " + (cgi + 1) + "  of  8";

    switch(cgi){
      case 0:
        arrayToUse = gameArr7;
        saveLevel = 0;
        offset = 0;
        break;
      case 1:
        arrayToUse = gameArr6;
        saveLevel = 0;
        offset = 0;
        break;
      case 2:
        arrayToUse = gameArr5;
        saveLevel = 2;
        offset = 0;
        break;
      case 3:
        arrayToUse = gameArr4;
        saveLevel = 2;
        offset = 0;
        break;
      case 4:
        arrayToUse = gameArr3;
        saveLevel = 4;
        offset = 1;
        break;
      case 5:
        arrayToUse = gameArr2;
        saveLevel = 4;
        offset = 2;
        break;
      case 6:
        arrayToUse = gameArr1;
        saveLevel = 6;
        offset = 3;
        break;
      case 7:
        arrayToUse = gameArr0;
        saveLevel = 6;
        offset = 4;
        break;
      case 8:
        arrayToUse = gameArr10;
        saveLevel = 8;
        offset = 8;
        break;
      case 9:
        arrayToUse = gameArr9;
        saveLevel = 8;
        offset = 9;
        break;
      case 10:
        arrayToUse = gameArr8;
        saveLevel = 8;
        offset = 10;
        break;
      case 100://mega
        arrayToUse = megaPuzzleArr;
        saveLevel = 8;
        offset = 0;
        break;
      default:
        arrayToUse = playRavlStr;
        saveLevel = 0;
        offset = 0;
        scoreToUse = null;
        gameStartedBool = false;
        break;
    }
    const rowsInPuzz = (arrayToUse[0].length + 2)/3;//rows in puzzle
    const lastInd = !isDaily? 7 : !puzzleWords9[0] || cgi === 100 ? 8 : !puzzleWords10[0] ? 9 : 10;//last index in game
    const initAH = arrayToUse[0].length;
    cgi = cgi === 100?8:cgi;

    this.setState({
      currentGameIndex: cgi,
      onRow: 0,
      hintPenalty: 5,
      gameArray0: arrayToUse,
      level0Saved: gameArr7,
      gameArray1: gameArr6,
      gameArray2: gameArr5,
      gameArray3: gameArr4,
      gameArray4: gameArr3,
      gameArray5: gameArr2,
      gameArray6: gameArr1,
      gameArray7: gameArr0,
      gameArray8: gameArr10,
      gameArray9: gameArr9,
      gameArray10: gameArr8,
      rowsInPuzzle: rowsInPuzz,
      initialArrayHeight: initAH,
      lastIndexInGame: lastInd,
      score: scoreToUse,
      solvedWords: solvedWords,
      bonusWords: bonusWords,
      showPlayRavl: showPR,
      showGame0: true,//showG0,
      showGame1: showG1,
      showGame2: showG2,
      showGame3: showG3,
      showGame4: showG4,
      showGame5: showG5,
      showGame6: showG6,
      showGame7: showG7,
      showGame8: showG8,
      showGame9: showG9,
      showGame10: showG10,
      progressSavedLevel: saveLevel,
      solvedWordsRowOffset: offset,
      showSolvedWords: showSW,
      ravlTiles: ravlArr,
      modalCall: 'None',
      nextButtonEnabled: false,
      gameStarted: gameStartedBool,
      headerText: headerTxt,
      dailyGameDescription: description,
      endMessage: gameEndMsg,
      gameDone: false,
      eligibleForStar: eligibility,
      // keyIDFragment: keyIDFrag
    });
  }

  buildStraightArray(wordsSent) {
    const rows = wordsSent.length;
    let cols = 0;
    cols = wordsSent[0]?wordsSent[0].length : 0;
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr.push([]);
      arr[i].push(new Array(cols));
      for (var j = 0; j < cols; j++) {
        arr[i][j] = wordsSent[i].substr(j, 1);
      }
    }
    return arr;
  }
  buildDailyArray(wordsSnt) {
    const rows = wordsSnt.length;
    let cols = 0;
    cols = wordsSnt[0]?wordsSnt[0].length : 0;
    var arr = [];
    for (var i = 0; i < rows; i++) {
      arr.push([]);
      arr[i].push(new Array(cols));
      for (var j = 0; j < cols; j++) {
        arr[i][j] = wordsSnt[i].substr(j, 1);
      }
    }
    return arr;
  }
  buildGameArray(sa) {
    let transposed = null;
    let containsUnscrambledWord = true;
    while (containsUnscrambledWord) {
      containsUnscrambledWord = false;
      transposed = transposeArray(sa);
      for (var i = 0; i < transposed.length; i++) {
        transposed[i] = shuffleArray(transposed[i]);
      }
      for (var j = 0; j < transposed[0].length; j++) {
        let testWord = "";
        for (var k = 0; k < transposed.length; k++) {
          testWord += transposed[k][j];
        }
        switch (sa[0].length) {
          case 3:
            if (puzzleWords0.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 4:
            if (puzzleWords1.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 5:
            if (puzzleWords2.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 6:
            if (puzzleWords3.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 7:
            if (puzzleWords4.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 8:
            if (puzzleWords5.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 9:
            if (puzzleWords6.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          case 10:
            if (puzzleWords7.includes(testWord) || puzzleWords8.includes(testWord) || puzzleWords9.includes(testWord) || puzzleWords10.includes(testWord)) containsUnscrambledWord = true;
            break;
          default:
            containsUnscrambledWord = false;
        }
      }
    }
    const cols = transposed.length;
    const rows = transposed[0].length;
    for (var jj = 0; jj < cols; jj++) {
      for (var kk = 0; kk < rows - 1; kk++) {
        transposed[jj].unshift("");
      }
    }
    for (var m = 0; m < cols; m++) {
      for (var n = 0; n < rows - 1; n++) {
        transposed[m].push("");
      }
    }
    return transposed;
  }
  makeRavlTileRef(rows, columns) {
    const val1 = getRandomInt(0, columns);
    const val2 = getRandomInt((rows - 1), (2 * rows - 1));
    return "col" + val1 + ",row" + val2;
  }
  getMenuItems(){
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
  toggleDrawer(which){
    this.setState({isOpen: !this.state.isOpen});
    console.log("which: " + which);
  }
  testAnimation(which){

    //this.colRefs["col0"].setPosition(-2);
    this.colRefs["col0"].sendCellOut("row2");
    // this.colRefs["col0"].pulseCell("row1", which);

  }
  transitionToGame(daily){
    if(daily){
      this.testAnimation('pulse');

    }else{
      this.testAnimation('tada');
      
    }
    // console.log("colRefs..." + this.colRefs);
    this.testAnimation();
    //this.setState({showHintNagModal: true});
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
  getDimensions(node) {
    if (node && !this.state.height) {
      this.setState({
          lettersetContainerHeight: node.clientHeight,
          lettersetContainerWidth: node.clientWidth
      });
    }
}
  renderCol(col, i, anim, idFrag){
    const numC = this.state.gameArray0.length;
    const numR = 3 * this.state.rowsInPuzzle - 2;
    let cWidth = this.state.lettersetContainerWidth;
    let cHeight = this.state.lettersetContainerHeight;
    const th1 = tileHeight * (1.1 - (this.state.gameArray0.length - 3) * 0.06);
    const th2 = tablet?650/this.state.initialArrayHeight:520/this.state.initialArrayHeight;
    const scrDividedWidth = cWidth/(numC + 1);
    const scrDividedHeight = cHeight/(numR + 2);
    const th = Math.min(th1, th2, scrDividedWidth, scrDividedHeight);
    console.log("th: " + th);
    const le = (cWidth - numC * (th + 2))/2;
    if(this.state.lettersetContainerWidth > 0){
      return (
        <TileSet
          key={idFrag + i}
          letterArray={col}
          ref={"col" + i}
          colIndex={i}
          tileHeight={th}
          left={le}
          animate={anim}
          dark={this.state.darkModeEnabled}
          numColumns={numC}
          sendColToGame={(indexArr) => {this.updateGameArray(indexArr)}}
          checkForWordsAtStart={() => {this.updateGameArray([])}}
        />
      );
    }
    
    
    // return(
    //   <TileSet key={"key" + i} ref={(ref) => this.colRefs[col] = ref} tilesInColumn={4} tileHeight={60}/>
    //   )
  }


  render() {
    if (this.state.lettersetContainerHeight === 0) {
      return (
        <div style={styles.loading_container}>
          <CircularProgress colors={colors.off_white} />
        </div>
      );

    } else {
      let {
        gameArray0,
        // gameArray1,
        // gameArray2,
        // gameArray3,
        // gameArray4,
        // gameArray5,
        // gameArray6,
        // gameArray7,
        // gameArray8,
        // gameArray9,
        // gameArray10,
        // solvedWords,
        // modalVisible,
        // showPuzzWordsModal,
        // solvedModalMessage,
        // bonusModalMessage,
        // dividerString,
        // keyIDFragment
      } = this.state;
      return (
        <div>

          <div style={styles.container}>
            <div style={styles.AppLeftBox}>

            </div>

            <div style={styles.appContainer}>
              <div id="messageHeader" style={styles.messageHeader}>
              </div>
              <div id="gameContainer" style={styles.gameContainer} ref={this.lettersetContainer}>
              {this.state.showGame0 &&
                gameArray0.map((column, index) => this.renderCol(column, index, true, ""))}
                
                {/* {
                arr.map((column, index) => this.renderCol(column, index))
                } */}

                {/* <TileSet ref={this.col0} tilesInColumn={4} tileHeight={60}/>
                <TileSet ref={this.col1} tilesInColumn={4} tileHeight={60}/>
                <TileSet ref={this.col2} tilesInColumn={4} tileHeight={60} /> */}
              </div>
              <div  id="footerContainer" style={styles.footerContainer}>
              </div>
            </div>

              <Drawer anchor={"left"} open={this.state.isOpen} onClose={() => this.setState({isOpen: false})}>
                {this.getMenuItems()}
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
}

export default App;
