import React from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import {lightTheme } from "style/Themes";
import CreditScore from "./CreditScore";

const CreditScoreApp = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <CreditScoreAppWrapper>
        <CreditScore />
      </CreditScoreAppWrapper>
    </ThemeProvider>
  );
};


export default CreditScoreApp;

//-----------------------------------------------style-----------------------------------------------/
export const CreditScoreAppWrapper = styled.div`
  grid-area: m;
  background-color: ${props => props.theme.color.background1};
  /*   display: grid;
  grid-template: repeat() (2, 50px) / 1fr 1fr 1fr;
  grid-gap: 3px; */
`;

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_FILE DETAILS-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_//
//blank slate