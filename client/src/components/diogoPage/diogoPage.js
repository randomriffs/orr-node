import React, { Component } from 'react'
import './diogoPage.css'
import lopes from '../../asset/lopes.jpg'


export default class DiogoPageComponent extends Component {
    render() {
        return (
            <div className='diogo-page-container'>
                <div className='white-container'>
                    <div className='lopes-image'>
                        <img src={lopes}></img>
                        <p>
                            Diogo<br />
                    Seixas<br />
                    Lopes<br />
                        </p>

                    </div>
                    <div className='manda-div'>
                        <h1>
                            Melancholy <br />
                            &amp; <br />
                            Architecture
                        </h1>
                        <p>On Aldo Rossi</p>
                        <h3>PARK BOOKS</h3>
                    </div>
                </div>


            </div>
        )
    }
}
