import styled, { keyframes } from 'styled-components';
 
export const slideRightToLeft = keyframes`
from {

    margin-left: 2%;
}

to {

    margin-left: 0%;
}
  `
export const slideLeftToRight = keyframes`
from {
    opacity: 0.3;
    margin-right: 5%;
}
to {
    opacity: 1;
    margin-right: 0%;
}
  `