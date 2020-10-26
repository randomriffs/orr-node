import React, { Component } from 'react'
import './typewriterNews.css'

export default class TypewriterNews extends Component {
    state = {
        articleData: null,
        groupedArticle: null,
        selectedArticle: null,
       hoveredArticle:null
    }
    componentDidMount() {
        let articleResponse = null
        fetch('https://randomriffs.herokuapp.com/api/getArticle').then(response=>{
           articleResponse = response
           console.log('>>>>>>>>>>>>>>> reponse',response)
        })
        console.log('article data', articleResponse.articles)
        let group = articleResponse.articles.reduce((r, a) => {
            console.log("a", a);
            console.log('r', r);
            r[a.source.name] = [...r[a.source.name] || [], a];
            return r;
        }, {});
        //    console.log("group", group);
        this.setState({ groupedArticle: group, hoveredArticle: group && Object.keys(group)[0], selectedArticle: group && group[Object.keys(group)[0]], articleData:articleResponse})
    }
    onHoverArticle = (hoveredArticle) => {
        console.log('hovered article', hoveredArticle)
        this.setState({ selectedArticle: this.state.groupedArticle[hoveredArticle], hoveredArticle })
    }
    render() {
        console.log('grouped article ', this.state.groupedArticle)
        return (
            <div className="typewriter-container">
                <div className="typewriter-header">
                    {/* <h1>T</h1> */}
                    <h1>Typewriter News</h1>
                </div>
                {/* <h1>Typewriter News</h1> */}
                {/* Left Panel */}
                <div className="left-panel">
                    {this.state.groupedArticle && Object.keys(this.state.groupedArticle).map(eachArticleKey => {
                        return <div className={this.state.hoveredArticle === eachArticleKey ? 'selectedArticle': ''} onMouseEnter={() => this.onHoverArticle(eachArticleKey)}>{eachArticleKey}</div>
                    })}
                </div>

                {/* Right Panel */}
                <div className="right-panel">
                    <ol>
                        {this.state.selectedArticle && this.state.selectedArticle.length > 0 &&
                            this.state.selectedArticle.map(eachArticle => {
                                return (
                                    <li>
                                        <h5>{eachArticle.title}</h5>
                                        <p className="description">{eachArticle.description} <span><img src={eachArticle.urlToImage}></img></span></p>
                                        <a href={eachArticle.url} target="_blank" >{eachArticle.url}</a>
                                    </li>
                                )
                            })}
                    </ol>
                </div>

            </div>
        )
    }
}
