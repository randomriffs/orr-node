import React, { Component } from 'react'
import './reddit.css'
import ShowerThoughts from './showerThoughts/showerThoughts';
import WritingPrompt from './writingPrompt/writingPrompt';
import Quotes from './quotes/quotes';

export default class RedditComponent extends Component {
    render() {
        return (
            <React.Fragment>
            <h1 className='header'>Reddit</h1>
            <div className='reddit'>
                
                <ShowerThoughts/>
                <WritingPrompt/>
                <Quotes/>
            </div>
             </React.Fragment>
        )
    }
}
