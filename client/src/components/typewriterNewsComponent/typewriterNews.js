import Axios from 'axios'
import React, { Component } from 'react'
import './typewriterNews.css'
import axios from 'axios';

export default class TypewriterNews extends Component {
    state = {
        articleData: null,
        groupedArticle: null,
        selectedArticle: null,
        hoveredArticle: null
    }
    componentDidMount() {


        let articleResponse = null
        axios.get('https://www.reddit.com/r/news.json?limit=100').then(result => {
            // debugger
            articleResponse = result.data.data.children
            //    debugger
            //    console.log('>>>>>>>>>>>>>>> reponse',response)
            let group = articleResponse.reduce((r, a) => {
                console.log("a", a);
                console.log('r', r);
                r[a.data.domain] = [...r[a.data.domain] || [], a];
                return r;
            }, {});
            // debugger
            console.log("group", group);
            this.setState({ groupedArticle: group, hoveredArticle: group && Object.keys(group)[0], selectedArticle: group && group[Object.keys(group)[0]], articleData: articleResponse })
        })
        // console.log('article data', articleResponse.articles)
        // debugger

    }
    onHoverArticle = (hoveredArticle) => {
        console.log('hovered article', hoveredArticle)
        this.setState({ selectedArticle: this.state.groupedArticle[hoveredArticle], hoveredArticle })
    }
    render() {
        return (
            <div className="typewriter-container">
                <div className="typewriter-header">
                    <h1>Typewriter News</h1>
                    <a href="https://twitter.com/typewriternews" target="_blank">@</a>
                </div>

                {/* Left Panel */}
                <div className="left-panel">
                    {this.state.groupedArticle && Object.keys(this.state.groupedArticle).map(eachArticleKey => {
                        let siteName = eachArticleKey.split('.')
                        return <div className={this.state.hoveredArticle === eachArticleKey ? 'selectedArticle' : ''} onMouseEnter={() => this.onHoverArticle(eachArticleKey)}>{siteName.length > 2 ? `${siteName[0]} ${siteName[1]}` : siteName[0]}</div>
                    })}
                </div>

                {/* Right Panel */}
                <div className="right-panel">
                    <ol>
                        {this.state.selectedArticle && this.state.selectedArticle.length > 0 &&
                            this.state.selectedArticle.map(eachArticle => {
                                let article = eachArticle.data;
                                console.log('aricle', article)
                                return (
                                    <li className="article-list">
                                        <h5>{article.title} <img src={article.thumbnail}></img></h5>

                                        {/* <p className="description">{eachArticle.description} <span><img article={eachArticle.thumbnail}></img></span></p> */}
                                        <a href={article.url} target="_blank" >{article.url}</a>
                                    </li>
                                )
                            })}
                    </ol>
                </div>

            </div>
        )
    }
}
