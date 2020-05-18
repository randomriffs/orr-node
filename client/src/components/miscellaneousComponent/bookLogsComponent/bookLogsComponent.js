import React, { Component } from 'react'
import './bookLogs.css'

export default class BookLogsComponent extends Component {
    state = {
        book: {}
    }
    componentDidMount() {
        fetch("https://randomriffs.herokuapp.com/api/random/books")
            .then(res => res.json())
            .then((result) => {
                this.setState({ book: result.data });
            },
                (error) => {
                    this.setState({ error });
                })
    }

    render() {
        return (
            <div className='book-logs'>
                <h1>Book Logs</h1>
                <h4>{this.state.book.bookName}</h4>
                <h4><a href={this.state.book.bookUrl} target='_blank'>{this.state.book.bookUrl}</a></h4>
            </div>
        )
    }
}
