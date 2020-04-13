import React, {useState} from "react"
import styled from "styled-components"
import ReactPlayer from "react-player"
import {connect} from "react-redux"
import {setKeyValue_action} from "redux/actions"
import {Close} from "style/Icons"

const Video = ({ui_reducer, setKeyValue_action}) => {

    const {videoUrl} = ui_reducer
console.log(videoUrl);
 return (
     <>
     {
         videoUrl ? 
         <Wrapper>
         <Background/>
         <VideoWrapper>
              <Exit onClick={() => setKeyValue_action("videoUrl", "ui_reducer", false)}/>
              <ReactPlayer height="100%" width="100%" url={videoUrl} controls={true}/>
         </VideoWrapper>
        </Wrapper>
 : null
     }
     </>

 )        
}

const mapStateToProps = (state) => ({
    ui_reducer: state.ui_reducer,
})

export default connect(mapStateToProps,{ setKeyValue_action})(Video)

{/* <Popup>
<Exit/>
<Background/>
  <Video controls={true} width="90rem" height="55rem"url="videoUrl"/>
</Popup> */}

const Wrapper = styled.div`
    position: absolute;
    z-index: 800;
    top: 6rem;
    height: 105vh;
    width: 100vw;
    display: flex;
`
// const Video = styled(ReactPlayer)`
//     z-index: 1500;
//     margin-right: 10rem;
//     margin-top: -11rem;
// `
const Exit = styled(Close)`
    width: 3rem;
    height: 3rem;
    position: absolute; 
    top: 3%;
    left: 12%;
    z-index: 1501;
    cursor: pointer;
`
const Background = styled.div`
    background: black;
    opacity: .7;
    height: 100%;
    width: 100%;
    position: absolute; 
`
const VideoWrapper = styled.div`
    width: 60%;
    height: 50%;
    margin-top: 4rem;
    margin-left: 20rem;
    z-index: 1200;
`