import React from "react";

const GoodCreditScore = props => {
  if (props.Score > 832 && props.Score <= 900) {
    return <div> YOu have Excellent Credit</div>;
  } else if (props.Score >= 790 && props.Score <= 832) {
    return <div>You have a Very Good Credit </div>;
  } else if (props.Score >= 743 && props.Score <= 789) {
    return <div> You have a Good Credit</div>;
  }
};

export default GoodCreditScore;