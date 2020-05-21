import React, { Component } from 'react'
import './showerThoughts.css'
import axios from 'axios';
import { List } from 'react-content-loader'

let stList = []
export default class ShowThoughtsComponent extends Component {
    state = {
        data: [],
        loading: true
    }
    componentDidMount() {
        axios.get("https://www.reddit.com/r/Showerthoughts.json")
            .then((result) => {
                let stData = result.data.data.children;
                stData.map((dataList) => {
                    let dataSt = dataList.data.title;
                    if (stList.length < 12) {
                        stList.push(dataSt)
                    }
                })
                console.log('ytlist', stList)
                this.setState({ data: stList.slice(3, stList.length), loading: false })

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
                        <div className='sub-reddit shower-thoughts activeFadeIn'>
                            {this.state.data && this.state.data.map((data) => {
                                return <p>{data}</p>
                            })}
                        </div>
                } 
            </div>

        )
    }
}
