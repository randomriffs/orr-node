import React, { Component } from 'react'
import './writingPrompt.css'
import axios from 'axios';
import { List } from 'react-content-loader'

let wpList = []
export default class WritingPromptComponent extends Component {
    state = {
        data: [],
        loading:true
    }
    componentDidMount() {
        axios.get("https://www.reddit.com/r/WritingPrompts.json")
            .then((result) => {
                let stData = result.data.data.children;
                stData.map((dataList) => {
                    let dataSt= dataList.data.title;
                    if (wpList.length <12) {
                        wpList.push(dataSt)
                    }
                })
                console.log('ytlist', wpList)
                this.setState({ data: wpList.slice(7,wpList.length), loading:false })

            },
                (error) => {
                    this.setState({ error });
                })
    }
    render() {
        return (
            <div>
                {
                    this.state.loading ?
                    <div>
                    <List style={{ width: '100%' }} />
                </div> :
                      <div className='sub-reddit wp activeFadeIn'>
                      {this.state.data && this.state.data.map((data)=>{
                          return <p>{data}</p>
                      })}
                      {/* <div className='seventyfive'>七十五</div> */}
                  </div>
                }
            </div>
      
        )
    }
}
