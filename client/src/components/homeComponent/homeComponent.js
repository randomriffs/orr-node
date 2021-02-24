// React stuffs
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

// Actions
import loginAction from '../../store/actions/loginAction';
import * as homeActions from '../../store/actions/homeAction'
import * as postActions from '../../store/actions/postActions'

// Components
import { BlogComponent } from "../blogComponent/blogComponent";
import TaskComponent from "../taskComponent/taskComponent";
import ScripEchoComponent from '../miscellaneousComponent/scriptEcho/scriptEchoComponent';
import BookLogsComponent from '../miscellaneousComponent/bookLogsComponent/bookLogsComponent';
import OfOldHat from '../miscellaneousComponent/ofOldHat/ofOldHatComponent';
import DribbComponent from '../dribbComponent/dribbComponent';
import Footer from '../footer/footerComponent';
import SpotifyPlaylist from '../spotifyPlaylist/spotifyPlaylist';
import YoutubePlaylist from '../youtubePlaylist/youtubePlaylist';
import Reddit from '../reddit/reddit';
import OrangeEye from '../orangeEye/orangeEye';
import PurplePage from '../purplePage/purplePage';
import CamelPage from '../camelPage/camelPage';
import DiogoPage from '../diogoPage/diogoPage';
import ChineseFont from '../chineseFont/chineseFont';
import { BlackAComponent } from '../blackAComponent/blackAComponent';
import GooseWritings from '../gooseWritings/gooseWritings';
import FooterComponent from '../footer/footerComponent';
import TodoComponent from '../todoComponent/todoComponent';
import IntroComponent from '../introComponent/introComponent';
import TypewriterNews from '../typewriterNewsComponent/typewriterNews';
import RandomWebPage from '../randomWebPage/randomWebPage';
import SpinningHead from '../spinninghead/spinningHead';
// Assets;
import ExplocQR from '../../asset/explocqr.png';
import Fakeleghorse from '../../asset/flhbgremoved.png';

// Stylings;

import './homeComponent.css'

class HomeComponent extends Component {
    state = {
        message: '',
        blogsData: {},
        isReadMore: false,
        component: 'randomriffs' // render different component container
    }
    componentDidMount() {
        this.props.getBlogs()
        this.props.getTasks();

    }
    componentDidUpdate() {

        console.log('sss', this.props.home.blogsData)

    }
    fetchBlogDetail = (blog) => {
        console.log('fetching blog detail functioncalled', blog)
        this.props.history.push(`/blog-detail/${blog._id}`)
    }

    isReadMore = () => {
        this.setState({ isReadMore: !this.state.isReadMore }, () => {
            if (this.state.isReadMore) {
                this.props.history.push('/all-post')
            }
        })
    }
    deletePost = (blog) => {
        console.log('blog', blog)
        this.props.deletePostDispatch({ id: blog._id })
    }
    randomriffComponent = () => {
        return (<div className="home-container">
            {/* {
            this.props.home.getBlogLoading ? <div className=' content-loader'>
                <List animation={true} ></List>
            </div>
                : <BlogComponent blogs={this.props.home} fetchBlogDetail={(blog) => this.fetchBlogDetail(blog)} deletePost={(blog) => this.deletePost(blog)} isReadMoreFunc={this.isReadMore} isReadMore={this.state.isReadMore} />
        } */}
            <IntroComponent></IntroComponent>
            <div className="grey-container">
                <ScripEchoComponent />
                <BookLogsComponent />
                <OfOldHat />
            </div>
            <DribbComponent />
            <SpotifyPlaylist />
            <YoutubePlaylist />
            <div className='wave-vt'></div>
            <Reddit />
            <OrangeEye />
            <PurplePage />
            <div className='wave-vt'></div>
            <CamelPage />
            <div className='wave-vt'></div>
            <DiogoPage />
            <div className='wave-vt'></div>
            <ChineseFont />
            <div className='wave-vt'></div>
            {/* <BlackAComponent/> */}
            <GooseWritings />
            <div className='wave-vt'></div>
            {/* <TodoComponent/> */}
            <TypewriterNews />
            <div className='wave-vt'></div>
            {/* Explore local */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <h1>изучить местный</h1>
                <img src={ExplocQR}></img>
            </div>
            <div className='wave-vt'></div>
            {/* Spinning head */}
            <SpinningHead />
            <div className='wave-vt'></div>


            {/*  Random web page*/}
            <RandomWebPage />
            {/* <Footer /> */}
            <img src={Fakeleghorse} className="App-logo" alt="logo" />
        </div>)
    }
    CurrentComponentDev = () => {
        return (
            <SpinningHead />
        )
    }

    renderComponent = () => {
        let component = this.state.component;
        switch (component) {
            case 'randomriffs':
                return this.randomriffComponent();
            case 'currentComponentDev':
                return this.CurrentComponentDev();
        }
    }
    render() {
        return (
            <React.Fragment>
                {this.renderComponent()}
            </React.Fragment>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        home: state.home,
        login: state.login
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        loginDispatch: () => dispatch(loginAction()),
        getBlogs: () => dispatch(homeActions.getBlogs()),
        getTasks: () => dispatch(homeActions.getTasks()),
        deletePostDispatch: (data) => dispatch(postActions.deletePostAction(data))

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeComponent));
