import React, {useState} from "react"
import styled from "styled-components"
import {PlayIcon, ArrowRight, ArrowLeft} from "style/Icons"
import ReactPlayer from 'react-player'

const RightVideoSelector = () => {

    const [open, setOpen] = useState(true)

 return ( <>
            {
                    open ? 
                    <Wrapper>
                    <Header> 
                        <Close onClick={() => setOpen(false)}/>
                         PlayList
                    </Header>
                     <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing />
                        <Video selected={true}>
                            <Column>
                                <VideoTitle >I eat</VideoTitle>
                                <VideoDuration>Ben McLoughlin - 3:46</VideoDuration>
                            </Column>
                            <Play  selected={true}/>
                        </Video>
                        <Video>
                            <Column>
                                <VideoTitle> Why am I doing this? </VideoTitle>
                                <VideoDuration>Ben McLoughlin - 3:46</VideoDuration>
                            </Column>
                            <Play/>
                        </Video>
                        <Video>
                            <Column>
                                <VideoTitle> Why am I doing this? </VideoTitle>
                                <VideoDuration>Ben McLoughlin - 3:46</VideoDuration>
                            </Column>
                            <Play/>
                        </Video>
                </Wrapper>
                :
                <Open onClick={() => setOpen(true)}/>
            }
     </>
       
    )
}

export default RightVideoSelector


const Wrapper = styled.div`
    background: #2e3438;
    opacity: 0.9;
    width: 31rem;
    height: 70rem;
    position: absolute;
    top: 10rem;
    right: 0;
    cursor: pointer;
    color: #e8e9e9;
    z-index: 1000;
    border-radius: 3px;

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

const Video = styled.div`
    padding: 0.3rem 1rem 0.3rem 1rem;
    height: 6rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
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
    color: #73abfc;
    opacity: ${props => props.selected ? 0 : 1};
    font-weight: bold;
    &:hover {
        color: #62aaff;
    }
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
`
const Open = styled(ArrowLeft)`
    position: absolute;
    top: 10rem;
    right: 0;
    width: 3.5rem;
    height: 3.5rem;
    color:  #2e3438;
    cursor: pointer;
`