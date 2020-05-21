import React, { Component } from 'react';
import './dribbComponent.css'
import ReactPlayer from 'react-player'
import axios from 'axios';
import ContentLoader, { List } from 'react-content-loader'

export default class DribbComponent extends Component {
    state = {
        gif: '',
        fyodorOne: '',
        fyodorTwo: '',
        fyodorThree: '',
        fyLoading: true,
        gifLoading: true
    }
    componentDidMount() {
        axios.get("https://randomriffs.herokuapp.com/api/random/gifs")
            .then((result) => {
                let data = result.data.data;
                console.log('data', data)
                let dataLen = data.length;
                console.log('dataLeng', dataLen)
                let randomGif = Math.floor(Math.random() * dataLen)
                console.log('randomGif', randomGif)
                console.log('gif', data[randomGif])
                let gifs = ''
                // while (data[randomGif].endsWith("?vid=1")){
                //     gifs = data[randomGif]
                // }
                if (data[randomGif].endsWith("?vid=1")) {
                    gifs = data[randomGif].substr(0, data[randomGif].length - 6)
                } else {
                    gifs = data[randomGif]
                }
                this.setState({ gif: gifs, gifLoading: false });
            },
                (error) => {
                    this.setState({ error });
                })

        // fyodor
        axios.get("https://randomriffs.herokuapp.com/api/random/fyodor")
            .then((result) => {
                let totalLen = result.data.data.length;
                let first = result.data.data.slice(0, (((result.data.data.length) / 2) - 12))
                let second = result.data.data.slice((((result.data.data.length) / 2) - 12), (((result.data.data.length) / 2) + 12))
                let third = result.data.data.slice((((result.data.data.length) / 2) + 12), result.data.data.length);
                // console.log('fyodo acutal', result.data)
                // console.log('splided fyood', `${first}${second}${third}`)
                this.setState({ fyodorOne: first, fyodorTwo: second, fyodorThree: third, fyLoading: false });
            },
                (error) => {
                    this.setState({ error });
                })
    }

    render() {
        return (
            <div className='dribb'>
                {
                    this.state.fyLoading ?
                        <div>
                        <List style={{ width: '100%' }} />
                        </div> :
                        <div className='flex-bs activeFadeIn'>
                            <h3 className='some-text'>
                                <p>{this.state.fyodorOne}<span className='typewriter'>{this.state.fyodorTwo}</span>{this.state.fyodorThree}</p>
                            </h3>
                        </div>
                }

                {
                    this.state.gifLoading ?
                    <List style={{ width: '100%' }} />:
                        <div className='flex-bs'>
                            {this.state.gif.endsWith("gif") ?
                                <img width="400" src={this.state.gif}>
                                </img>
                                :
                                <ReactPlayer url={this.state.gif} playing={true} loop={true} volume={0} muted />
                            }
                        </div>
                }

            </div>
        )
    }
}
