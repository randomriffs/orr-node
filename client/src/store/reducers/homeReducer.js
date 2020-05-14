const intialState = {
    blogsData:{},
    message:'',
    tasksData:{}
}
const homeReducer=(state=intialState, action)=> {
    switch(action.type){
        case 'SUCCESS':
            console.log('home reducer state change from success case')

            return {
                ...state,
                message:action.payload
            }
        case 'GETBLOGSUCCESS':
            return {
                ...state,
                blogsData:action.payload
            }
        case 'GETTASKSSUCCESS':
            return {
                ...state,
                tasksData:action.payload
            }
            
        default:
            return state;
    }
}
export default homeReducer;