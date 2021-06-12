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
import { LiquidDistortionText } from 'react-text-fun'

// Assets;
import ExplocQR from '../../asset/explocqr.png';
import Fakeleghorse from '../../asset/flhbgremoved.png';
import SimpsOpen from '../../asset/removedbg/simps.png'

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
    randomBartQuote = () => {
        let bartQuotes = [
            ' I will not carve gods.',
            'I will not spank others.',
            'I will not aim for the head.',
            "I will not barf unless I'm sick",
            'I will not expose the ignorance of the faculty.',
            "I saw nothing unusual in the teacher's lounge.",
            "I will not conduct my own fire drills.",
            "Funny noises are not funny.",
            "I will not snap bras.",
            "I will not fake seizures.",
            "This punishment is not boring and pointless.",
            "My name is not Dr. Death.",
            "I will not defame New Orleans.",
            "I will not prescribe medication.",
            "I will not bury the new kid.",
            "I will not teach others to fly.",
            "I will not bring sheep to class.",
            "A burp is not an answer.",
            "Teacher is not a leper.",
            "Coffee is not for kids.",
            "I will not eat things for money.",
            "The principal's toupee is not a Frisbee.",
            'I will not call the principal "spud head".',
            "Goldfish don't bounce.",
            "Mud is not one of the 4 food groups.",
            "No one is interested in my underpants.",
            "I will not sell miracle cures.",
            "I will return the seeing-eye dog.",
            "I do not have diplomatic immunity.",
            "I will not charge admission to the bathroom.",
            "The cafeteria deep fryer is not a toy.",
            "All work and no play makes Bart a dull boy.",
            'I will not say "Springfield" just to get applause.',
            "I am not authorized to fire substitute teachers.",
            "My homework was not stolen by a one-armed man.",
            "I will not go near the kindergarten turtle.",
            "I am not deliciously saucy.",
            "Organ transplants are best left to professionals.",
            'The Pledge of Allegiance does not end with "Hail Satan".',
            "I will not celebrate meaningless milestones.",
            "There are plenty of businesses like show business.",
            "Five days is not too long to wait for a gun.",
            "I will not waste chalk.",
            "I will not skateboard in the halls.",
            "Underwear should be worn on the inside.",
            "I will never win an Emmy.",
            "I will not torment the emotionally frail.",
            "I am not a 33 year-old woman.",
        ]

        return bartQuotes[Math.floor(Math.random() * bartQuotes.length - 1)];
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
            {/* <marqjess simpg/> */}
            <div className='marqueeSimps'>
                <marquee width="70%" direction="left" height="100px">
                    <LiquidDistortionText
                        text={this.randomBartQuote()}
                        //   fontSize={120}
                        speed={0.6}
                        volatility={0.02}
                    />
                </marquee>
                <img className='simps-img' src={SimpsOpen}></img>
            </div>
            <div className='wave-vt'></div>
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
