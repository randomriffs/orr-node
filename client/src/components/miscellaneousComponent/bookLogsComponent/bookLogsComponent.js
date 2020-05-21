import React, { Component } from 'react'
import './bookLogs.css'
import axios from 'axios';
import { List } from 'react-content-loader'

export default class BookLogsComponent extends Component {
    state = {
        book: {},
        loading: true
    }
    componentDidMount() {
        axios.get("https://randomriffs.herokuapp.com/api/random/books")
            .then((result) => {
                console.log('result', result)
                this.setState({ book: result.data.data, loading: false });
            })
    }

    render() {
        return (
            <div className='book-logs activeFadeIn'>
                {
                    this.state.loading ?
                        <List animation={true}/> :
                        <div>
                            <h1 className='wave'>Book Logs</h1>
                            <h4>{this.state.book.bookName}</h4>
                            <h4><a href={this.state.book.bookUrl} target='_blank'>{this.state.book.bookUrl}</a></h4>
                        </div>
                }

            </div>
        )
    }
}
