const height = window.innerHeight;
const width = window.innerWidth;
const TILE_HEIGHT = parseInt((height/17).toPrecision(2));
const deviceType = width > 800?"PC":height/width > 1.77?"phone":"tablet";
const isPC = deviceType === "PC"?true:false;
const isTablet = deviceType === "tablet"?true:false;
const isPhone = deviceType === "phone"?true:false;
const SLIDER_WIDTH = width * 0.66;
const LINE_HEIGHT = isPC?Math.floor(height/80):isTablet?Math.floor(width/22):Math.floor(width/18);



export const config = {
  versionCode: 12,
  versionName: '1.2.2',
  button_radius: 5,
  scrHeight: height,
  scrWidth: width,
  deviceType: deviceType,
  isPC: isPC,
  isPhone: isPhone,
  isTablet: isTablet,
  TILE_HEIGHT: TILE_HEIGHT,
  LINE_HEIGHT: LINE_HEIGHT,
  SLIDER_WIDTH: SLIDER_WIDTH
};

export const getAnimatedWordLeft = (length) => {
  switch(length){
    case 3: return 0.34 * width;
    case 4: return 0.32 * width;
    case 5: return 0.30 * width;
    case 6: return 0.28 * width;
    case 7: return 0.26 * width;
    case 8: return 0.24 * width;
    case 9: return 0.22 * width;
    case 10: return 0.20 * width;
    default: return 0.34 * width;
  }
}

export const convertFont = (inputFontSize) => isTablet || isPC?inputFontSize * height/1200:inputFontSize * width/460;

export default config;
