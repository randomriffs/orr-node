const intialState = {
    isLoggedIn:false
}
const loginReducer=(state=intialState, action)=> {
    switch(action.type){
        case 'LOGINDATARECEIVED':
            console.log('LOGINDATARECEIVED',action.payload)
            return {
                ...state,
                isLoggedIn:action.payload.status
            }
        default:
            return state;
    }
}
export default loginReducer;