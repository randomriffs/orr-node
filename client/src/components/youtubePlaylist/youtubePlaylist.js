import React, { Component } from 'react'
import './youtubePlaylist.css'
import axios from 'axios';
import { List } from 'react-content-loader'

let ytList = []
export default class YoutubePlaylistComponent extends Component {
    state = {
        data: [],
        loading: true
    }
    componentDidMount() {
        axios.get("https://www.reddit.com/r/youtubehaiku.json")
            .then((result) => {
                let ytData = result.data.data.children;
                console.log('ytDAta', ytData)
                ytData.map((dataList) => {
                    let dataUrl = dataList.data.url
                    if (dataUrl.startsWith('https://youtu.be') && (ytList.length < 20)) {
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

                this.setState({ data: endUrl, loading: false })

            },
                (error) => {
                    this.setState({ error });
                })
    }
    render() {
        return (
            <div className='youtube'>
                {
                    this.state.loading ?
                        <div>
                             <List style={{ width: '100%' }} />
                        </div> :
                        <div className='activeFadeIn'>
                            <iframe width="1000" height="500" src={this.state.data} frameborder="0" allowfullscreen></iframe>
                        </div>
                }
                
            </div>
        )
    }
}
