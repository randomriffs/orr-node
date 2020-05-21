import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios'
const isDev = false;
const URL = isDev ? 'http://localhost:3000' : 'https://randomriffs.herokuapp.com'

function* getBlogs(){
  yield put({type:'GETBLOGLOADINGON'})
  const result = yield axios.get(URL+'/api/blogs')
  .then(response=>{
    return response.data
  })

  yield put({type:'GETBLOGSUCCESS',payload:result})
  yield put({type:'GETBLOGLOADINGOFF'})
}

function* getTasks(){
  yield put({type:'LOADINGON'})
  const result = yield axios.get(URL+'/api/tasks')
  .then(response=>{
    return response.data
  })

  yield put({type:'GETTASKSSUCCESS',payload:result})
  yield put({type:'LOADINGOFF'})
}

function* getBlogsSaga(){
  yield takeLatest('GETBLOGS',getBlogs)
}

function* getTaskSaga(){
    yield takeLatest('GETTASKS',getTasks)
}


function* postLoginData(data) {
  console.log('get loign from  saga')
  // yield put({type:'LOADINGON'})
  const json = yield axios.post(URL+'/api/login',data.payload).
  then(response => {
   return response.data
  });    

  yield put({ type: "LOGINDATARECEIVED", payload: json });
  // yield put({type:'LOADINGOFF'})
}

function* postBlogData(data) {
  console.log('posting blog new post to server',data)
  const json = yield axios.post(URL+'/api/add-post',data.payload).
  then(response => {
   return response.data
  });    
  console.log('json', json)
  
  yield put({ type: "GETBLOGSUCCESS", payload: json });

}
function* addNewTask(data) {
  console.log('posting blog new post to server',data)
  const json = yield axios.post(URL+'/api/add-task',data.payload).
  then(response => {
   return response.data
  });    
  console.log('json', json)
  
  yield put({ type: "GETTASKSSUCCESS", payload: json });

}
function* deletedPost(data) {
  console.log('posting blog new post to server',data)
  const json = yield axios.post(URL+'/api/delete-post',data.payload).
  then(response => {
   return response.data
  });    
  console.log('json', json)
  
  yield put({ type: "GETBLOGSUCCESS", payload: json });

}
function* editPost(data) {
  console.log('posting blog new post to server',data)
  const json = yield axios.post(URL+'/api/edit-post',data.payload).
  then(response => {
   return response.data
  });    
  console.log('json', json)
  
  yield put({ type: "GETBLOGSUCCESS", payload: json });

}
function* removeTask(data) {
  console.log('posting blog new post to server',data)
  const json = yield axios.post(URL+'/api/delete-task',data.payload).
  then(response => {
   return response.data
  });    
  console.log('json', json)
  
  yield put({ type: "GETTASKSSUCCESS", payload: json });

}


function* postBlogDataSaga(){
    yield takeLatest('POSTBLOGPOST',postBlogData)
}


function* actionWatcher() {
  yield takeLatest('POSTLOGINSAGA', postLoginData)
}
function* addNewTaskSaga() {
  yield takeLatest('ADDNEWTASK', addNewTask)
}
function* deletePostSage() {
  yield takeLatest('DELETEPOST', deletedPost)
}
function* editPostSage() {
  yield takeLatest('EDITPOST', editPost)
}
function* removeTaskSaga() {
  yield takeLatest('REMOVEPOST', removeTask)
}


export default function* rootSaga() {
  yield all([
  actionWatcher(),
  getBlogsSaga(),
  getTaskSaga(),
  postBlogDataSaga(),
  addNewTaskSaga(),
  deletePostSage(),
  editPostSage(),
  removeTaskSaga()
  ]);
}