import React, { Component } from "react";
import styled from "styled-components";
import GoodCreditScore from "./GoodCreditScore";
import BadCreditScore from "./BadCreditScore";
import ProgressArc from "./ProgressArc";
import LineGraph from "./LineGraph";

export default class CreditScore extends Component {
  state = {
    Score: 742,
    date: "",
    nextDate: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentDidMount() {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var nextm = new Date().getMonth() + 2;

    this.setState({
      //Setting the value of the date time
      date: date + "/" + month + "/" + year,
      nextDate: date + "/" + nextm + "/" + year
    });
  }

  renderSection() {
    if (this.state.Score >= 743 && this.state.Score <= 900) {
      return <GoodCreditScore Score={this.state.Score} />;
    } else if (this.state.Score >= 300 && this.state.Score <= 742) {
      return <BadCreditScore Score={this.state.Score} />;
    }
  }
  render() {
    return (
      <CreditScoreWrapper>
        <SectionsWrapper>
          <DonutChartWrapper>
            <ProgressArc Score={this.state.Score} />
            <span>
              As of {this.state.date}.Based on Credit Vision Risk. Next update
              available on {this.state.nextDate}{" "}
            </span>
          </DonutChartWrapper>
          <Vertical></Vertical>
          <ProgressContainer>
            <h1>Where You Stand Today</h1>
            <ProgressBarContainer>
              <BarLines color="#56bc7b" width="80%">
                833-900
              </BarLines>
              <BarLines color="#ffbf58" width="80%">
                790-832
              </BarLines>
              <BarLines color="#ff7a00" width="60%">
                <em></em> 749 743-789
              </BarLines>
              <BarLines color="#ff4500" width="80%">
                693-742
              </BarLines>
              <BarLines color="#b33000" width="80%">
                300-692
              </BarLines>
            </ProgressBarContainer>
          </ProgressContainer>
        </SectionsWrapper>
        <Horizontal></Horizontal>
        <SectionsWrapper>
          <LineGraph></LineGraph>
        </SectionsWrapper>
      </CreditScoreWrapper>
    );
  }
}

//-----------------------------------------------style-----------------------------------------------//

const CreditScoreWrapper = styled.div`
  justify-content: space-around;
  text-align: center;
`;

const SectionsWrapper = styled.div`
  margin: 0rem auto;
  padding: 3rem;
  width: 100rem;
  display: flex;
  font-size: ${props => props.theme.fontSize.medium};
  color: ${props => props.theme.color.contrastText1};
  font-weight: 300;
`;

const DonutChartWrapper = styled.div`
  flex-direction: column;
  & h1 {
    font-size: ${props => props.theme.fontSize.medium};
    font-weight: normal;
  }
  & span {
    font-size: ${props => props.theme.fontSize.small};
  }
  > img {
    display: flex;
    flex: 1 1 250px;
  }
`;
const Vertical = styled.div`
  border-left: 2px solid #72929b;
  height: 350px;
  position: absolute;
  left: 50%;
`;
const Horizontal = styled.div`
  margin:auto
width: 80%;
border-top: 2px solid #72929b;
`;

const ProgressContainer = styled(DonutChartWrapper)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /*   border-bottom: 2px solid #f16335;
 */
`;
const ProgressBarContainer = styled(ProgressContainer)`
  margin: 1rem 0px 0px 80px;
`;

const BarLines = styled(ProgressBarContainer)`
  background-color: ${props => props.color};
  color: ${props => props.theme.color.text2}
  width: ${props => props.width};
  height: 50%;
  margin: 5px;
  padding:1rem;
  border-radius: 3px;
  position: relative;
`;