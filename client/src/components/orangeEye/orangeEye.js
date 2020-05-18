import React, { Component } from 'react'
import './orangeEye.css'
import amelie from '../../asset/amelie.png'
import eva from '../../asset/eva.png'
import facemirror from '../../asset/facemirro.png'
import halfface from '../../asset/halfface.png'
import square from '../../asset/square.png'
import triangle from '../../asset/triangle.png'
import circle from '../../asset/circle.png'
import star from '../../asset/star.png'
import poo from '../../asset/poo.jpg'
import textone from '../../asset/textone.png'
import texttwo from '../../asset/texttwo.png'
import textthree from '../../asset/textthree.png'
import textfour from '../../asset/textfour.png'

export default class YoutubePlaylistComponent extends Component {
    state = {
        data: []
    }

    render() {
        return (
            <div className='orange-eye'>
            <div className='container'>
<img className='amelie' src={amelie}></img>
<img className='eva' src={eva}></img>
<img className='square' src={square}></img>
<img className='triangle' src={triangle}></img>
<img className='circle' src={circle}></img>
<img className='star' src={star}></img>
<img className='textone' src={textone}></img>
<img className='texttwo' src={texttwo}></img>
<img className='textthree' src={textthree}></img>
<img className='textfour' src={textfour}></img>
{/* <img className='poo' src={poo}></img> */}
{/* <img className='facemirror' src={facemirror}></img> */}
{/* <img className='halfface' src={halfface}></img> */}
            </div>
            </div>
        )
    }
}
