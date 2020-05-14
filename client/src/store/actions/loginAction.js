import axios from 'axios';

const loginAction=(data)=> {
    console.log('loginaction')
return{
    type:'POSTLOGINSAGA',
    payload:data
}
   
}
export default loginAction