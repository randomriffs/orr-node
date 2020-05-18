import React, { Component } from 'react';
import './dribbComponent.css'
import ReactPlayer from 'react-player'

export default class DribbComponent extends Component {
    state = {
        gif: '',
        fyodorOne: '',
        fyodorTwo: '',
        fyodorThree: '',
    }
    componentDidMount() {
        fetch("https://randomriffs.herokuapp.com/api/random/gifs")
            .then(res => res.json())
            .then((result) => {
                let data = result.data;
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
                this.setState({ gif: gifs });
            },
                (error) => {
                    this.setState({ error });
                })

        // fyodor
        fetch("https://randomriffs.herokuapp.com/api/random/fyodor")
            .then(res => res.json())
            .then((result) => {
                let totalLen =  result.data.length;
                let first = result.data.slice(0,(((result.data.length)/2)-12))
                let second = result.data.slice((((result.data.length)/2)-12),(((result.data.length)/2)+12))
                let third = result.data.slice((((result.data.length)/2)+12),result.data.length);
                // console.log('fyodo acutal', result.data)
                // console.log('splided fyood', `${first}${second}${third}`)
                this.setState({ fyodorOne: first, fyodorTwo: second, fyodorThree: third});
            },
                (error) => {
                    this.setState({ error });
                })
    }

    render() {
        return (
            <div className='dribb'>
                <div className='flex-bs'>
                    <h3 className='some-text'>
        <p>{this.state.fyodorOne}<span className='typewriter'>{this.state.fyodorTwo}</span>{this.state.fyodorThree}</p>
                    </h3>
                </div>
                {/* <h3>{this.state.gif}</h3><br></br> */}
                <div className='flex-bs'>
                    {this.state.gif.endsWith("gif") ?
                        <img width="400" src={this.state.gif}>
                        </img>
                        :
                        <ReactPlayer url={this.state.gif} playing={true} loop={true} volume={0} muted />
                    }
                </div>
            </div>
        )
    }
}
