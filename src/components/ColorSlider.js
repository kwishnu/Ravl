import React from "react";
import ReactSlider from "react-slider";
import styled from "styled-components";

const ColorSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`;

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  background-color: #fff;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
`;

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
);

const StyledTrack = styled.div`
  position: "relative",
  top: 0;
  left: 0;
  alignSelf: "stretch";
  background: "#f00";
  color: "#000";
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;
// eslint-disable-next-line
export default () => (
  <ColorSlider
    renderTrack={Track}
    renderThumb={Thumb}
  />
);