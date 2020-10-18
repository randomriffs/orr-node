import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import loginAction from '../../store/actions/loginAction';
import * as homeActions from '../../store/actions/homeAction'
import * as postActions from '../../store/actions/postActions'
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
import ContentLoader, { List } from 'react-content-loader'

import './homeComponent.css'
import { BlackAComponent } from '../blackAComponent/blackAComponent';


class HomeComponent extends Component {
    state = {
        message: '',
        blogsData: {},
        isReadMore: false,
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
    render() {
        console.log('home reducer', this.props.home)
        return (
            <div className="home-container">
                {
                    this.props.home.getBlogLoading ? <div className=' content-loader'>
                        <List animation={true} ></List>
                    </div>
                        : <BlogComponent blogs={this.props.home} fetchBlogDetail={(blog) => this.fetchBlogDetail(blog)} deletePost={(blog) => this.deletePost(blog)} isReadMoreFunc={this.isReadMore} isReadMore={this.state.isReadMore} />
                }
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
                <Footer />
            </div>

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
