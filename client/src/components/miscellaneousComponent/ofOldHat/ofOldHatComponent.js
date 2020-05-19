import React, { Component } from 'react';
import './ofOldHatComponent.css'

export default class OfOldHatComponent extends Component {
    state = {
        verse: '',
        book: ''
    }
    componentDidMount() {
        fetch("https://randomriffs.herokuapp.com/api/random/verses")
            .then(res => res.json())
            .then((result) => {
                this.setState({ verse: result.verse, book: result.book });
            },
                (error) => {
                    this.setState({ error });
                })
    }

    render() {
        return (
            <div className='of-old-hat'>
                <h1 className='wave'>ofOldHat</h1>
                <h3>{this.state.verse}</h3>
                <h3> {this.state.book}</h3>
            </div>
        )
    }
}
