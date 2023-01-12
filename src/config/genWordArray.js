import words3letter from '../words/3letter';
import words4letter from '../words/4letter';
import words5letter from '../words/5letter';
import words6letter from '../words/6letter';
import words7letter from '../words/7letter';
import words8letter from '../words/8letter';
import words9letter from '../words/9letter';
import words10letter from '../words/10letter';
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

export function genWordArray(which, easy){
  const wordsNum = easy? 3:4;
  switch (which){
    case 0://mega
      return getRandom(words9letter, 5).map(element => element.toUpperCase());
    case 3:
      return getRandom(words3letter, 3).map(element => element.toUpperCase());//['CAT','DOG','APE'];
    case 4:
      return getRandom(words4letter, 3).map(element => element.toUpperCase());
    case 5:
      return getRandom(words5letter, wordsNum).map(element => element.toUpperCase());//['BUILD','STRIP','FLOOD','BRINE'];
    case 6:
      return getRandom(words6letter, wordsNum).map(element => element.toUpperCase());//['BECOME', 'SLIGHT', 'RESCUE', 'CHERRY'];
    case 7:
      return getRandom(words7letter, 3).map(element => element.toUpperCase());
    case 8:
      return getRandom(words8letter, 3).map(element => element.toUpperCase());
    case 9:
      return getRandom(words9letter, 3).map(element => element.toUpperCase());
    case 10:
      return getRandom(words10letter, 3).map(element => element.toUpperCase());//['ABOMINABLE', 'FOREGROUND', 'PLEASANTLY'];
    default:
      return getRandom(words3letter, 3).map(element => element.toUpperCase());//['CAT','DOG','APE'];
  }
}

export default genWordArray;