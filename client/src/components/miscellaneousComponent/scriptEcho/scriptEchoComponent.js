import React, { Component } from 'react';
import './scriptEchoComponent.css'
import axios from 'axios';
import { List } from 'react-content-loader'

export default class ScriptEchoComponent extends Component {
    state = {
        sayings: '',
        film: '',
        loading: true
    }
    componentDidMount() {
        axios.get("https://randomriffs.herokuapp.com/api/random")
            .then((result) => {
                this.setState({ saying: result.data.sayings, film: result.data.film, loading: false });
            },
                (error) => {
                    this.setState({ error });
                })
    }

    render() {
        return (
            <div className='script-echo activeFadeIn'>
                {
                    this.state.loading ?
                        <List /> :
                        <div>
                            <h1 className='wave'>Script Echo</h1>
                            <h3>{this.state.saying}</h3>
                            <h3> {this.state.film.replace(/-/g, ' ')}</h3>
                        </div>
                }

            </div>
        )
    }
}
