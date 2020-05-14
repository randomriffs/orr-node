import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginComponent from './components/loginComponent/loginComponent';
import HomeComponent from './components/homeComponent/homeComponent';
import NavbarComponent from './components/navbarComponent/navBarComponent'
import loginAction from '../src/store/actions/loginAction';
import { connect } from 'react-redux';
import BlogDetailsComponent from './components/blogDetailsComponent/blogDetailsComponent';
import BlogEditForm from './components/blogEditForm/blogEditForm';
import AllPostComponent from './components/allPostComponent/allPostComponent';

class App extends Component {
  // componentDidMount(){
  //   this.props.loginDispatch();
  // }
  render(){
    return(
      <React.Fragment>
        
       <BrowserRouter>
       <NavbarComponent/>
          <Switch>
            <Route exact path='/' component={HomeComponent}/>  
            <Route path='/login' component={LoginComponent}/>
            <Route path='/home' component={LoginComponent}/>
            <Route path='/blog-detail/:id' component={BlogDetailsComponent}/>
            <Route path='/addpostrn' component={BlogEditForm}/>
            <Route path='/all-post' component={AllPostComponent}/>
          </Switch>
       </BrowserRouter>
      </React.Fragment>
    )
  }
}
const mapDispatchToProps = (dispatch)=> {
  return {
    loginDispatch: ()=>dispatch(loginAction())
  }
}
export default connect(null,mapDispatchToProps)(App);
