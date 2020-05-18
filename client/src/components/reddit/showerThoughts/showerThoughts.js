import React, { Component } from 'react'
import './showerThoughts.css'

let stList = []
export default class ShowThoughtsComponent extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetch("https://www.reddit.com/r/Showerthoughts.json")
            .then(res => res.json())
            .then((result) => {
                let stData = result.data.children;
                stData.map((dataList) => {
                    let dataSt= dataList.data.title;
                    if (stList.length <8) {
                        stList.push(dataSt)
                    }
                })
                console.log('ytlist', stList)
                this.setState({ data: stList.slice(3,stList.length) })

            },
                (error) => {
                    this.setState({ error });
                })
    }
    render() {
        return (
            <div className='sub-reddit'>
                {this.state.data && this.state.data.map((data)=>{
                    return <p>{data}</p>
                })}
            </div>
        )
    }
}
