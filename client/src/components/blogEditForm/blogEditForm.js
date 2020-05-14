import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/postActions'
import { withRouter } from 'react-router';
import { BlogComponent } from '../blogComponent/blogComponent';
import './blogEditForm.css'

class BlogEditForm extends Component {
    state = {
        title: '',
        content: ''
    }
    savePost = (e) => {
        e.preventDefault();
        let data = {
            title: this.state.title,
            content: this.state.content
        }
        this.props.savePostDispatch(data)
    }
    setData = (e) => {
        e.preventDefault();
        this.setState({ [e.target.id]: e.target.value })
    }
    componentDidUpdate(prevProps, prevState) {
        // if(prevProps.someValue!==this.props.someValue){

        // }
        console.log('preprob', prevProps)
        console.log('prevstate', prevState)
        console.log('this.prps', this.props)
        if (prevProps.home !== this.props.home) {
            console.log('redirect to home')
            this.props.history.push('./')
        }
    }

    fetchBlogDetail = (blog) => {
        console.log('fetching blog detail functioncalled', blog)
        this.props.history.push(`/blog-detail/${blog._id}`)
    }
    render() {
        return (
            <div className="boot-container blogEdit-container">
                <form>
                    <h1>Title</h1>
                    <input type='text' id='title' onChange={(e) => this.setData(e)}></input>
                    <h1>Content</h1>
                    <textarea onChange={(e) => this.setData(e)} id='content'></textarea>
                    <div class="save-btn">
                        <button onClick={this.savePost}>save </button>
                    </div>
                </form>
                {/* <BlogComponent blogs={this.props.home} fetchBlogDetail={(blog) => this.fetchBlogDetail(blog)} isReadMore={false}/> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        home: state.home
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        savePostDispatch: (data) => dispatch(actions.savePostAction(data))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BlogEditForm));
