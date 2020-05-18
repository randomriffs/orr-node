import React, { Component } from 'react';
import './scriptEchoComponent.css'

export default class ScriptEchoComponent extends Component {
    state = {
        sayings: '',
        film: ''
    }
    componentDidMount() {
        fetch("https://randomriffs.herokuapp.com/api/random")
            .then(res => res.json())
            .then((result) => {
                this.setState({ saying: result.sayings, film: result.film });
            },
                (error) => {
                    this.setState({ error });
                })
    }

    render() {
        return (
            <div className='script-echo'>
                <h1 className='wave'>Script Echo</h1>
                <h3>{this.state.saying}</h3>
                <h3> {this.state.film.replace(/-/g,' ')}</h3>
             </div>
        )
    }
}
