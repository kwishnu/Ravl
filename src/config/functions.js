export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
export function transposeArray(sentArr) {
  return sentArr[0].map((col, i) => sentArr.map((row) => row[i]));
}
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
export function allElementsEqual(array) {
  return !array.some(function (value, index, array) {
    return value !== array[0];
  });
}
export function getRandom(arr, n) {
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
export function getColor(){//https://stackoverflow.com/questions/43193341/how-to-generate-random-pastel-or-brighter-color-in-javascript
  return "hsl(" + Math.floor(360 * Math.random()) + ',' +//hue
             Math.floor(70 + 10 * Math.random()) + '%,' +//saturation
             Math.floor(40 + 20 * Math.random()) + '%)'//lightness
}

export function randomBoolean(){
  return Math.random() < 0.5;
}
export function posOrNeg(){
  return Math.round(Math.random()) * 2 - 1;
}

export function printWordsToConsole(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9, p10){
  console.log("puzzleWords0: " + JSON.stringify(p0));
  console.log("puzzleWords1: " + JSON.stringify(p1));
  console.log("puzzleWords2: " + JSON.stringify(p2));
  console.log("puzzleWords3: " + JSON.stringify(p3));
  console.log("puzzleWords4: " + JSON.stringify(p4));
  console.log("puzzleWords5: " + JSON.stringify(p5));
  console.log("puzzleWords6: " + JSON.stringify(p6));
  console.log("puzzleWords7: " + JSON.stringify(p7));
  console.log("puzzleWords8: " + JSON.stringify(p8));
  console.log("puzzleWords9: " + JSON.stringify(p9));
  console.log("puzzleWords10: " + JSON.stringify(p10));
}
export function  printGameArrayToConsole(sentArr) {
  let rows = sentArr[0].length;
  let columns = sentArr.length;
  for (var x = 0; x < rows; x++) {
    let printArr = [];
    for (var z = 0; z < columns; z++) {
      let pushChar = "";
      pushChar = sentArr[z][x].letter === "" ? "-" : sentArr[z][x].letter;
      printArr.push(pushChar);
    }
    console.log(JSON.stringify(printArr));
  }
  console.log("\n");
  }

