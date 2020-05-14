import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import loginAction from '../../store/actions/loginAction';
import * as homeActions from '../../store/actions/homeAction'
import * as postActions from '../../store/actions/postActions'
import { BlogComponent } from "../blogComponent/blogComponent";
import TaskComponent from "../taskComponent/taskComponent";
import GypsyAxiomComponent from '../miscellaneousComponent/gypsyAxiom/gypsyAxiomComponent';
import BookLogsComponent from '../miscellaneousComponent/bookLogsComponent/bookLogsComponent'
import './homeComponent.css'

class HomeComponent extends Component {
    state = {
        message: '',
        blogsData: {},
        isReadMore: false
    }
    componentDidMount() {
        // if(this.props.login.isLoggedIn){
        //     console.log('user is logged in')
        // }else {
        //     console.log('no user found')
        //     this.props.history.push('/login')
        // }
        this.props.getBlogs();
        this.props.getTasks();
    }
    handleClick = () => {
        // this.props.loginDispatch()

    }
    componentDidUpdate() {
        console.log('sss', this.props.home.blogsData)
        // this.setState({blogsData:this.props.home.blogsData})
        // this.props.getBlogs();

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

                <h1 className="title-right blog-text" onClick={() => this.props.history.push('/addpostrn')}>Blog</h1>
                <BlogComponent blogs={this.props.home} fetchBlogDetail={(blog) => this.fetchBlogDetail(blog)} deletePost={(blog) => this.deletePost(blog)} isReadMoreFunc={this.isReadMore} isReadMore={this.state.isReadMore} />
                <h1 className="title-right task-text">Tasks</h1>
                <TaskComponent tasks={this.props.home.tasksData} />
                <div className="grey-container">
                    <GypsyAxiomComponent />
                    <BookLogsComponent />
                </div>
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
