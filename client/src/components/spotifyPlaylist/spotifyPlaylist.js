import React, { Component } from 'react'
import './spotifyPlaylist.css'
import axios from 'axios';
import ContentLoader, { List } from 'react-content-loader'

let spotifyList = []
export default class SpotifyPlaylistComponent extends Component {
    state = {
        data:[],
        loading:true
    } 
    componentDidMount() {
        axios.get("https://www.reddit.com/r/spotify.json")
            .then((result) => {
                let spotifyData =  result.data.data.children;
                spotifyData.map((dataList)=>{
                    let dataUrl =  dataList.data.url
                    if(dataUrl.startsWith('https://open.spotify.com') && (spotifyList.length<3)){
                        let splitUrl = dataUrl.split('/')
                        let type = splitUrl[splitUrl.length-2]
                        let code = splitUrl[splitUrl.length-1]
                        let endUrl = `https://open.spotify.com/embed/${type}/${code}`
                        spotifyList.push(endUrl)
                    }
                })
                console.log('spotify list',spotifyList)
                this.setState({ data: spotifyList , loading: false});
            },
                (error) => {
                    this.setState({ error, loading: false });
                })
    }
    render() {
        return (
            <div>
                {/* {this.state.loading ? 
                 <div>
                 <List style={{ width: '100%' }} />
                 </div> 
                 : */}
                 <div className='spotify activeFadeIn'>
                    <div className='spotifyPlaylist activeFadeIn'>
                        {this.state.data && this.state.data.map((lists)=>{
                            console.log('lists', lists)
                            return <iframe src={lists} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                        })}
                    </div>
                    </div>
                {/* } */}
                    
                    {/* <iframe width="560" height="315" src="http://www.youtube.com/embed/0vrdgDdPApQ?playlist=cbut2K6zvJY,7iw30sK2UCo,sYV5MTy0v1I" frameborder="0" allowfullscreen></iframe> */}
                 </div>
        )
    }
}
