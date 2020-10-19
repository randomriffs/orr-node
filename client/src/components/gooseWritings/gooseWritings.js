import React, { Component } from 'react';
import axios from 'axios';
import { List } from 'react-content-loader';
import './gooseWritings.css'
import FooterComponent from '../footer/footerComponent';
import Footer from '../footer/footerComponent';

export default class GooseWritings extends Component {
    state = {
        gooseData: '',
        gooseLoading: true
    }
    componentDidMount() {
        axios.get("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&origin=*&grnnamespace=0&prop=revisions%7Cimages&rvprop=content&grnlimit=10")
            .then((result) => {
                this.setState({ gooseData: result.data.query.pages, gooseLoading: false });
            },
                (error) => {
                    this.setState({ error });
                })
    }

    render() {
        // let gooseCommands ={};
        return (
            <div className='gooseWritings'>
                {
                    this.state.gooseLoading ?
                        <div className="gooseLoader">
                           <h1>@goosewritings...</h1>
                        </div> :
                        <div className='activeFadeIn'>
                            <h1>Goose commandment</h1>
                            <ol className="commands">
                                {

                                    Object.keys(this.state.gooseData).map((eachGoose) => {
                                        return <li><a href={`https://en.wikipedia.org/wiki/${this.state.gooseData[eachGoose].title}`} target="_blank">{this.state.gooseData[eachGoose].title}</a></li>
                                    })
                                }
                            </ol>
                            <div className="gooseFooter">
                            <a href="https://twitter.com/goosewritings" target="_blank">@goosewritings</a><br></br>
                            {/* <a href="https://twitter.com/orejeods/" target="_blank">@orejeods</a> */}
                            </div>
                            <hr className="gooseHr"></hr>
                        </div>
                }

            </div>
        )
    }
}
