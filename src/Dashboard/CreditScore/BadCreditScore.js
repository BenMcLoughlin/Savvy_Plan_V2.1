import React from "react";

const BadCreditScore = props => {
  if (props.Score >= 693 && props.Score <= 742) {
    return <div> You have a Average Credit of {props.Score}</div>;
  } else if (props.Score >= 300 && props.Score <= 692) {
    return <div> YOu have a Poor Credit</div>;
  }
};

export default BadCreditScore;