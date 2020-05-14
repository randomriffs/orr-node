const intialState = {
    blogsData: {},
    message: '',
    tasksData: {},
    loading: false
}
const homeReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SUCCESS':
            console.log('home reducer state change from success case')

            return {
                ...state,
                message: action.payload
            }
        case 'GETBLOGSUCCESS':
            return {
                ...state,
                blogsData: action.payload
            }
        case 'GETTASKSSUCCESS':
            return {
                ...state,
                tasksData: action.payload
            }
        case 'LOADINGON':
            return {
                ...state,
                loading: true
            }
        case 'LOADINGOFF':
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}
export default homeReducer;