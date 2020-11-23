import axios from 'axios'
import React, { Component } from 'react'
import './randomWebPage.css'
import logo from '../../asset/sitelogo.png'
// theradio.surge.sh

export default class RandomWebPage extends Component {
    // constructor(){
    state = {
        webpageData: [],
        webPage: null,
        currentPage: 0,
        loading: true
    }
    // }
    componentDidMount() {
        this.getWebPageSet()
    }
    nextPage = () => {
        console.log('current page', this.state.currentPage)
        let lastPage = this.state.webpageData.length - 5;
        if (this.state.currentPage === lastPage) {
            let finalPage = this.state.currentPage + 1;
            this.setState({
                currentPage: 0,
                webPage: this.state.webpageData[finalPage],
                loading: true
            })
            this.getWebPageSet()
        } else {
            let nextPage = this.state.currentPage + 1;
            this.setState({
                currentPage: nextPage,
                webPage: this.state.webpageData[nextPage],
                loading: true
            })

        }
        setTimeout(()=>{
            this.setState({loading:false})
        },25000)
    }

    getWebPageSet = () => {
        axios.get("https://randomriffs.herokuapp.com/api/random/webpage")
            .then((result) => {
                let webpageData = result.data.dataList.data;
                console.log('webpageDaga', webpageData)
                this.setState({ webpageData, webPage: webpageData && webpageData.length > 0 && webpageData[0], currentPage: 0, loading: false });
            },
                (error) => {
                    this.setState({ error, loading: false });
                })

    }
    mask = () => {
        return (
            <React.Fragment>
                <div className='mask'>
                    loading...
                </div>
            </React.Fragment>
        )
    }
    loadListener = () => {
        console.log('on load')
        this.setState({ loading: false })
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    {/* {this.state.loading ? this.mask() : ''}
                    <header><img src={logo} width="20px" onClick={this.nextPage} ></img></header> */}
                    <iframe key={this.state.currentPage} onLoad={this.loadListener} src={this.state.webPage && this.state.webPage.siteUrl} frameBorder="0" className="iframe"></iframe>
                </div>

            </React.Fragment>
        )
    }
}
