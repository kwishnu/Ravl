import dailyDataJSON from '../data/dailyDataJSON.json';

export function puzzTitle(date) {
  return dailyDataJSON[date].title?dailyDataJSON[date].title:"Sorry, no daily puzzles available";
}
export function puzzDescription(date) {
  return dailyDataJSON[date].description?dailyDataJSON[date].description:"Sorry, no daily puzzles available";
}
export function numPuzzles(date) {
  return dailyDataJSON[date].words?dailyDataJSON[date].words.length:0;
}
export function puzzles(date) {
  return dailyDataJSON[date].words?dailyDataJSON[date].words:[[],[],[]];
}