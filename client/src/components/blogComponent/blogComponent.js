import React from 'react';
import './blogComponent.css'

export function BlogComponent(props){
  console.log("blogsdata", props)
  let data = null;
  if(!props.isReadMore){
    data = props && props.blogs && props.blogs.blogsData && props.blogs.blogsData.length > 0 && props.blogs.blogsData.slice(0,3);
  } else {
    data = props && props.blogs && props.blogs.blogsData && props.blogs.blogsData.length > 0 && props.blogs.blogsData
  }
  return (
    <React.Fragment>
      <div className="scew-container">
      <div class="blog-container">
        <ul>
          {data && data.length>0 && data.map((blog, index) => {
            return (
              <div>
              <div onClick={()=>props.fetchBlogDetail(blog)}>
              <li>
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
              </li>
              </div>
              <div onClick={()=>props.deletePost(blog)}>delete</div>
              </div>
            )
          }
          )}
        </ul>
        <p class="read-more" onClick={props.isReadMoreFunc}>{!props.isReadMore?'Read more':''}</p>
      </div>
      </div>
    </React.Fragment>
  )
}

