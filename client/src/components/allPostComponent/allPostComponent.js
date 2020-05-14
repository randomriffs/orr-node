import React from 'react'
import { BlogComponent } from '../blogComponent/blogComponent';
import { connect } from 'react-redux';

function AllPostComponent(props) {
    function fetchBlogDetail(blog) {
        console.log('fetching blog detail functioncalled', blog)
        this.props.history.push(`/blog-detail/${blog._id}`)
    }

    return (

        <BlogComponent blogs={props.home} fetchBlogDetail={(blog) => fetchBlogDetail(blog)} isReadMore={true} />

    )
}

const mapStateToProps = (state) => {
    return {
        home: state.home,
    }

}

export default connect(mapStateToProps)(AllPostComponent);