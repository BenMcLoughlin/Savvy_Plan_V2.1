import React, {useState} from "react"
import styled from "styled-components"
//import {PlayIcon, ArrowRight, ArrowLeft} from "style/Icons"
import ReactPlayer from "react-player"
import {connect} from "react-redux"
import {videos} from "layout/navigation/data/videos_data"
import {setKeyValue_action} from "redux/actions"
import Video from "layout/navigation/Video"
import {ArrowRight, PlayIcon, ArrowLeft} from "style/Icons"


const VideoNav = ({ui_reducer, setKeyValue_action}) => {

 const {videoUrl} = ui_reducer

 return ( <>
            {
                    videoUrl ? 
                    <>
                    <Video/> 
                    <Wrapper>
                    <Header> 
                        <Close  onClick={() => setKeyValue_action("videoUrl", "ui_reducer", false)}/>
                         PlayList
                    </Header>
                    {
                        videos.map(d =><VideoSelect selected={videoUrl === d.url} onClick={() => setKeyValue_action("videoUrl", "ui_reducer", d.url)}>
                                            <Column>
                                                <VideoTitle >{d.title}</VideoTitle>
                                                <VideoDuration>Ben McLoughlin - {d.duration}</VideoDuration>
                                            </Column>
                                            <Play selected={videoUrl === d.url}/>
                                        </VideoSelect>

                            )
                            
                    }
                </Wrapper>
                </>

                :
                <Open onClick={() => setKeyValue_action("videoUrl", "ui_reducer", true)}/>
            }
     </>
       
    )
}

const mapStateToProps = (state) => ({
    ui_reducer: state.ui_reducer,
})

export default connect(mapStateToProps,{ setKeyValue_action})(VideoNav)




const Wrapper = styled.div`
    background: #485056;
    width: 31rem;
    height: 70rem;
    position: absolute;
    top: 10rem;
    right: 0;
    cursor: pointer;
    color: #e8e9e9;
    z-index: 1000;
    border-radius: 3px;
    opacity: 0.96;

`
const Header = styled.div`
    font-size: 1.6rem;
    height: 4rem;
    width: 100%;
    text-align: center;
    padding: 1rem;
    position: relative;
    text-transform: uppercase;
    border-bottom: 1px solid #73abfc;
`

const VideoSelect = styled.div`
    padding: 0.3rem 1rem 0.3rem 1rem;
    height: 6rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    background: ${props => props.selected ? "black" : null};
    border-bottom: ${props => props.theme.border.primary};
`
const VideoTitle = styled.div`
    height: 2rem;
    width: 100%;
    font-weight: bold;
    font-size: 1.3rem;
    &:hover {
        color: white;
    }
  
`
const VideoDuration = styled.div`
    height: 2rem;
    width: 15rem;
    font-size: 1rem;
`
const Play = styled(PlayIcon)`
    width: 3.5rem;
    height: 3.5rem;
    color: #8CB8B7;
    opacity: ${props => props.selected ? 0 : 1};

`
const Column = styled.div`
    display: flex;
    flex-direction: column;
`
const Close = styled(ArrowRight)`
    width: 3.5rem;
    height: 3.5rem;
    color: #e8e9e9;
    position: absolute;
    top: .4rem;
    left: 1rem;
    cursor: pointer;
`
const Open = styled(PlayIcon)`
    position: absolute;
    top: 10rem;
    right: 2rem;
    width: 5rem;
    height: 5rem;
    color:  ${props => props.theme.color.lightGrey};
    cursor: pointer;
`

