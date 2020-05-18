import React, { Component } from 'react'
import './quotes.css'

let qList = []
export default class QuotesComponent extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetch("https://www.reddit.com/r/quotes.json")
            .then(res => res.json())
            .then((result) => {
                let stData = result.data.children;
                stData.map((dataList) => {
                    let dataSt= dataList.data.title;
                    if (qList.length <10) {
                        qList.push(dataSt)
                    }
                })
                console.log('ytlist', qList)
                this.setState({ data: qList.slice(5,qList.length) })

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
