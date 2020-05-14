import React, { Component } from 'react';
import './dribbComponent.css'
import ReactPlayer from 'react-player'

export default class DribbComponent extends Component {
    state = {
        gif: '',
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
    }

    render() {
        return (
            <div className='dribb'>
                <div className='flex-bs'>
                    <h3 className='some-text'>
                        “If you wish to glimpse inside a human soul and get to know a man, don't bother analyzing his ways of being silent, of talking, of weeping, of seeing how much he is moved by noble ideas; you will get better results if you just watch him laugh. If he laughs well, he's a good man.”
                </h3>
                </div>
                {/* <h3>{this.state.gif}</h3><br></br> */}
                <div className='flex-bs'>
                {this.state.gif.endsWith("gif") ?
                    <img width="400" src={this.state.gif}>
                    </img>
                    :
                    <ReactPlayer url={this.state.gif} playing loop />
                }
                </div>

            </div>
        )
    }
}
