import React, { Component } from 'react'
import './spinningHead.css'
import BobDylan from '../../asset/removedbg/bobdylan.png'
import BobMarley from '../../asset/removedbg/bobmarly.png'
import Jimi from '../../asset/removedbg/jimi.png'
import Morrison from '../../asset/removedbg/morison.png'
import RollingStone from '../../asset/removedbg/rollingstone.png'
import AbbeyRoad from '../../asset/removedbg/beatles.png'
import GunRoses from '../../asset/removedbg/gunroses.png'
import John from '../../asset/removedbg/john.png'
import MJ from '../../asset/removedbg/mjackson.png'
import Pink from '../../asset/removedbg/pink.png'
import Queen from '../../asset/removedbg/queen.png'
import Aerosmith from '../../asset/removedbg/aerosmith.png'
import Kurt from '../../asset/removedbg/kurt.png'
import Beatles from '../../asset/removedbg/thebeatles.png'
import DaftPunk from '../../asset/removedbg/daftpunk.png'
import Tame from '../../asset/removedbg/tame.png';
import AM from '../../asset/removedbg/am.png';
import Canberries from '../../asset/removedbg/canberries.png';
import Louis from '../../asset/removedbg/louis.png';
import Sonny from '../../asset/removedbg/sonny.png';


export default class SpinningHeadComponent extends Component {
  render() {
    return (
      <div className="spinning-container">
        <div className='rowdata'>
          <img src={BobDylan} className="spinningHead-1" alt="Bob Dylan" title='Bob Dylan' />
          <img src={BobMarley} className="spinningHead-6" alt="BobMarley" title="BobMarley" />
          <img src={Jimi} className="spinningHead-2" alt="logo" />
          <img src={Morrison} className="spinningHead-5" alt="logo" />
          <img src={DaftPunk} className="spinningHead-6" alt="logo" />

        </div>
        <div className='rowdata'>
          <img src={MJ} className="spinningHead-6" alt="logo" />
          <img src={John} className="spinningHead-2" alt="logo" />
          <img src={GunRoses} className="spinningHead-5" alt="logo" />
          <img src={Pink} className="spinningHead-1" alt="logo" />
          <img src={Queen} className="spinningHead-3" alt="logo" />
        </div>
        <div className='rowdata'>
          <img src={Aerosmith} className="spinningHead-5" alt="logo" />
          <img src={Kurt} className="spinningHead-2" alt="logo" />
          <img src={Beatles} className="spinningHead-4" alt="logo" />
          <img src={Tame} className="spinningHead-1" alt="logo" />
          <img src={RollingStone} className="spinningHead-3" alt="logo" />
        </div>
        <div className='rowdata'>
          <img src={AM} className="spinningHead-2" alt="logo" />
          <img src={Canberries} className="spinningHead-6" alt="logo" />
          <img src={Louis} className="spinningHead-3" alt="logo" />
          <img src={Sonny} className="spinningHead-1" alt="logo" />
        </div>
      </div>
    )
  }
}
