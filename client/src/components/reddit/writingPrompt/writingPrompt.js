import React, { Component } from 'react'
import './writingPrompt.css'

let wpList = []
export default class WritingPromptComponent extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetch("https://www.reddit.com/r/WritingPrompts.json")
            .then(res => res.json())
            .then((result) => {
                let stData = result.data.children;
                stData.map((dataList) => {
                    let dataSt= dataList.data.title;
                    if (wpList.length <10) {
                        wpList.push(dataSt)
                    }
                })
                console.log('ytlist', wpList)
                this.setState({ data: wpList.slice(7,wpList.length) })

            },
                (error) => {
                    this.setState({ error });
                })
    }
    render() {
        return (
            <div className='sub-reddit wp'>
                {this.state.data && this.state.data.map((data)=>{
                    return <p>{data}</p>
                })}
                {/* <div className='seventyfive'>753</div> */}
            </div>
        )
    }
}
