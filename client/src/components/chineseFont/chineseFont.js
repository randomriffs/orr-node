import React, { Component } from 'react'
import './chineseFont.css'


export default class ChineseFontComponent extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='chinese-font-container'>
                    <div className='main-text'>
                        <h1>
                            <span className='paint-two'>横看</span>成岭侧成峰 远近高低各不同
                    </h1>
                        <p className='right-text'>
                            锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦
                    </p>
                        <pre className='left-text'>
                            {
                                `关关雎鸠，在河之洲。窈窕淑女，君子好逑。
唧唧复唧唧，木兰当户织。……雄兔脚扑朔，
雌兔眼迷离，双兔傍地走，安能辨我是雄雌？
锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦
鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。
白日依山尽，黄河入海流。欲穷千里目，更上一层楼。
床前明月光，疑是地上霜。举头望明月，
低头思故乡 春眠不觉晓，处处闻啼鸟。
夜来风雨声，花落知多少。从明天起，做一个幸福的人
喂马，劈柴，周游世界 从明天起，关心粮食和蔬菜
我有一所房子，面朝大海，春暖花开`
                            }
                        </pre>

                    </div>


                </div>

                <div className='main-text1'>
                    <h1>
                        <span className='paint-two1'>横看</span>成岭侧成峰 远近高低各不同
</h1>
                    <p className='right-text1'>
                        锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦
</p>
                    <pre className='left-text1'>
                        {
                            `关关雎鸠，在河之洲。窈窕淑女，君子好逑。
唧唧复唧唧，木兰当户织。……雄兔脚扑朔，
雌兔眼迷离，双兔傍地走，安能辨我是雄雌？
锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦
鹅鹅鹅，曲项向天歌。白毛浮绿水，红掌拨清波。
白日依山尽，黄河入海流。欲穷千里目，更上一层楼。
床前明月光，疑是地上霜。举头望明月，
低头思故乡 春眠不觉晓，处处闻啼鸟。
夜来风雨声，花落知多少。从明天起，做一个幸福的人
喂马，劈柴，周游世界 从明天起，关心粮食和蔬菜
我有一所房子，面朝大海，春暖花开`
                        }
                    </pre>

                </div>
            </React.Fragment>
        )
    }
}
