import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/postActions';
import './taskComponent.css'

class TaskComponent extends Component {
  state={
    task:'',
  }
  addTask=(e)=>{
    e.preventDefault();
    let data = {
      task:this.state.task,
      isDone:false
    }
    this.props.addTaskDipatch(data);
    this.setState({task:''})
  }
  setNewTaskData=(e)=>{
    e.preventDefault();
    this.setState({[e.target.id]:e.target.value})
  }
  removeTask=(e,data)=>{
    e.preventDefault();
    console.log('data', data)
    this.props.removeTaskDispatch({id:data._id});
  }
  render() {
    return (
      <React.Fragment>
        <div className="task-container">
        {this.props && this.props.tasks && this.props.tasks.length > 0 && this.props.tasks.map((tasks, index) => {
          return (
           
              <p onClick={(e)=>this.removeTask(e,tasks)} id="task-list">{tasks.task}</p>
          )
        })
        }
        <form className="addtask-form">
          <input type='text' id='task' onChange={this.setNewTaskData} value={this.state.task} placeholder='   Add taks'></input>
          <button onClick={this.addTask}>Add</button>
        </form>
        </div>
      </React.Fragment>
    )


  }
}

const mapStateToProps = (state) => {
  return {
      home: state.home,
      login: state.login
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    addTaskDipatch:(data)=>dispatch(actions.addTaskAction(data)),
    removeTaskDispatch:(data)=>dispatch(actions.removeTaskAction(data))

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskComponent);