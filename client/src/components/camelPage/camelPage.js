import React, { Component } from 'react'
import './camelPage.css'
import candc from '../../asset/coffee-and-cigarettes.jpg'


export default class CamelPageComponent extends Component {
    render() {
        return (
            <div className='camel-page-container'>
                <div className='image-div'>
                    <img src={candc}></img>
                    <p>コーヒーを一杯</p>
                    <p>タバコを一服</p>
                    <p>会話を楽しむ</p>
                    <p>人生を楽しむ</p>
                </div>
                <div className='row-text-one'>
                    <h1>コーヒー<span className='red-and'>&amp;</span></h1>
                <span className='candc-mini'>
                    COFFEE<br/>
                    AND<br/>
                    CIGARETTES </span>
                </div>
                <div className='row-text-two'>
                    <h1>シガレッツ</h1>
                </div>
                <div className='row-text-three'>
                    <h3>
                    ジムジャームッシュ監督作品
                    </h3>
                </div>
                <div className='black-container'>
                    <h3>
                    ロベルトベニーニ <span className='red-cross'>+</span> スティーヴン・ライト <br/>
                    ジョイ・リー <span className='red-cross'>+</span> サンキ·リー <span className='red-cross'>+</span> スティーヴブシェミ<br/>
                    イギーポップ<span className='red-cross'>+</span> トム・ウェイツ<br/>
                    ジョー・リガーノ<span className='red-cross'>+</span> ヴィニー・ヴェラ <span className='red-cross'>+</span> ヴィニーヴェラ・ジュニア <br/>
                    ルネフレンチ <span className='red-cross'>+</span> E.J.ロドリゲス<br/>
                    アレックスデスカス <span className='red-cross'>+</span> イザックド·バンコレ<br/>
                    ケイトブランシェット  <span className='red-cross'>+</span> ?<br/>
                    メグホワイト <span className='red-cross'>+</span>ジャック・ホワイト<br/>
                    アルフレッド・モリーナ<span className='red-cross'>+</span>スティーヴ・クーガン<br/>
                    GZA<span className='red-cross'>+</span> RZA <span className='red-cross'>+</span> ビル・マーレイ <br/>
                    ビルルイス<span className='red-cross'>+</span>テイラー・ミード<br/>
                    </h3>
                </div>
            </div>
        )
    }
}
