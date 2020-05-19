import React, { Component } from 'react'
import './purplePage.css'
import facemirror from '../../asset/facemirro.png'


export default class PurpseComponent extends Component {
    state = {
        data: []
    }

    render() {
        return (
            <div className='page-container'>
                <div className='purple-page'>
                    <div className="wave-vt pp">75</div>
                    <h1>
                        What<br />
                        <span className="is">is</span><br />
                    </h1>

                </div>
                <div className="red-page">
                    <h1>
                        going<br />
                         on<span className='qq'>?</span><br />
                    </h1>
                    <img className="facemirror" src={facemirror}></img>
                </div>
            </div>
        )
    }
}
