import React, { Component } from 'react'
import './youtubePlaylist.css'

let ytList = []
export default class YoutubePlaylistComponent extends Component {
    state = {
        data: []
    }
    componentDidMount() {
        fetch("https://www.reddit.com/r/youtubehaiku.json")
            .then(res => res.json())
            .then((result) => {
                let ytData = result.data.children;
                ytData.map((dataList) => {
                    let dataUrl = dataList.data.url
                    if (dataUrl.startsWith('https://youtu.be') && (ytList.length <20    )) {
                        let splitUrl = dataUrl.split('/')
                        // let type = splitUrl[splitUrl.length-2]
                        let code = splitUrl[splitUrl.length - 1]
                        code = code.split('?')[0];
                        // let endUrl = `https://open.spotify.com/embed/${type}/${code}`
                        ytList.push(code)
                    }
                })
                console.log('ytlist', ytList)
                // this.setState({ data: spotifyList });
                let endUrl = '';
                if (ytList.length > 0) {
                    let ytUrl = "https://www.youtube.com/embed/" + ytList[0] + "?playlist="
                    var i;
                    for (i = 2; i < ytList.length; i++) {
                        ytUrl += ytList[i] + ","
                    }
                    endUrl = ytUrl.slice(0, endUrl.length - 1);
                }

                this.setState({ data: endUrl })

            },
                (error) => {
                    this.setState({ error });
                })
    }
    render() {
        return (
            <div className='youtube'>
                {/* <h1>Youtube</h1>
                <div className='wave wave-div-yt'></div> */}
                <iframe width="1000"height="500"src={this.state.data} frameborder="0" allowfullscreen></iframe>
                {/* <div className='spotifyPlaylist'>
                        {this.state.data && this.state.data.map((lists)=>{
                            console.log('lists', lists)
                            return <iframe src={lists} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        })}
                    </div>
                   */}
            </div>
        )
    }
}
