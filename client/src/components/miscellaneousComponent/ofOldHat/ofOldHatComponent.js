import React, { Component } from 'react';
import './ofOldHatComponent.css'
import axios from 'axios';
import { List } from 'react-content-loader'

export default class OfOldHatComponent extends Component {
    state = {
        verse: '',
        book: '',
        loading: true
    }
    componentDidMount() {
        axios.get("https://randomriffs.herokuapp.com/api/random/verses")
            .then((result) => {
                console.log('result of old hat', result)
                this.setState({ verse: result.data.verse, book: result.data.book, loading: false });
            },
                (error) => {
                    this.setState({ error });
                })
    }

    render() {
        return (
            <div className='of-old-hat activeFadeIn'>
                {
                    this.state.loading ?
                        <List /> :
                        <div>
                            <h1 className='wave'>ofOldHat</h1>
                            <h3>{this.state.verse}</h3>
                            <h3> {this.state.book}</h3>
                        </div>
                }

            </div>
        )
    }
}
