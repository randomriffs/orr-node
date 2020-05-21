import React, { Component } from 'react'
import './quotes.css'
import axios from 'axios';
import { List } from 'react-content-loader'

let qList = []
export default class QuotesComponent extends Component {
    state = {
        data: [],
        loading:true
    }
    componentDidMount() {
        axios.get("https://www.reddit.com/r/quotes.json")
            .then((result) => {
                console.log('result quote', result)
                let stData = result.data.data.children;
                stData.map((dataList) => {
                    let dataSt= dataList.data.title;
                    if (qList.length <10) {
                        qList.push(dataSt)
                    }
                })
                console.log('ytlist', qList)
                this.setState({ data: qList.slice(5,qList.length), loading:false })

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
                    <List style={{ width: '100%' }} />
                    :
                    <div className='sub-reddit q activeFadeIn'>
                    {this.state.data && this.state.data.map((data)=>{
                        return <p>{data}</p>
                    })}
                    <div className='three'>375</div>
                </div>
                }
            </div>
         
        )
    }
}
