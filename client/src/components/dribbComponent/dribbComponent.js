import React, { Component } from 'react';
import './dribbComponent.css'
import ReactPlayer from 'react-player'

export default class DribbComponent extends Component {
    state = {
        gif: '',
        fyodor: '',
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
                this.setState({ fyodor: result.data });
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
                       {this.state.fyodor}
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
