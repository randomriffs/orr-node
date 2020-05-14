import React, { Component } from 'react';
import loginAction from '../../store/actions/loginAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './loginComponent.css'

class LoginComponent extends Component {
    state={
        email:'',
        password:''
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        console.log('login handle submit')
        this.props.loginDispatch(this.state);
    }
    handleChange=(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    componentDidUpdate(prevProps,prevState){
        console.log('asdf',prevProps.login.isLoggedIn)
        console.log('asdf this.prop',this.props.login.isLoggedIn)
        // if(this.props.login.isLoggedIn){
        //     this.props.history.push('./home')
        // }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit} className='login-container'>
                <lable>email</lable>
                <input type="email" id='email' onChange={this.handleChange}></input> <br/>
                <lable>password</lable>
                <input type="password" id='password' onChange={this.handleChange}></input>
               <button onClick={this.handleSubmit}>login</button>
            </form>
        )
    }
  

}

const mapStateToPoprs = (state) =>{
    return {
        login: state.login
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        loginDispatch: (data)=>dispatch(loginAction(data))
    }
}

export default withRouter(connect(mapStateToPoprs,mapDispatchToProps)(LoginComponent));
