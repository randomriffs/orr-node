import React, { useState } from 'react'
import { connect } from 'react-redux'
import './blogDetailsComponent.css'
import * as postActions from '../../store/actions/postActions'

function BlogDetailsComponent(props) {
    console.log('props', props)
    let renderDetails = false;
    let detailData = null;
    const isDataAvailable = props && props.home && props.home.blogsData && props.home.blogsData.length > 0 ? true : false;
    if (isDataAvailable) {
        renderDetails = true;
        detailData = props.home.blogsData.find(blog => blog._id === props.match.params.id)
        console.log('detailData', detailData)
    }

    const [isEditable, setIsEditalbe] = useState(false);
    const [title, setTitle] = useState(detailData.title);
    const [content, setContent] = useState(detailData.content);
    const editPost = (data) => {
        setIsEditalbe(true)
    }

    const updatePost=(d)=>{
        d.preventDefault();
        console.log('detaildat',detailData)
        const data ={
            title,
            content,
            id:detailData._id
        }
        props.editPostDispatch(data)
    }

    return (
        <div className="boot-container">
            {isEditable ?
      
                    <div className="boot-container blogEdit-container">
                        <form>
                            <h1>Title</h1>
                            <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
                            <h1>Content</h1>
                            <textarea onChange={(e) => setContent(e.target.value)} value={content} id='content'></textarea>
                            <div class="save-btn">
                                <button onClick={updatePost}>Update </button>
                            </div>
                        </form>
                        {/* <BlogComponent blogs={this.props.home} fetchBlogDetail={(blog) => this.fetchBlogDetail(blog)} isReadMore={false}/> */}
                    </div>
                
                :

                <div>
                    <h1>{detailData.title}</h1>
                    <p>{detailData.content}</p>
                    <div className='edit-btn'>
                        <p onClick={() => editPost(detailData)}>Edit</p>
                        <p onClick={() => props.history.goBack()}>Back</p>
                    </div>
                </div>}

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        home: state.home,
    }

}
const mapDispatchToProps=(dispatch)=>{
    return{
        editPostDispatch:(data)=>dispatch(postActions.editPostAction(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetailsComponent)

