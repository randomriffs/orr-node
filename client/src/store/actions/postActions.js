export const savePostAction=(data)=>{
    return {
        type:'POSTBLOGPOST',
        payload:data
    }
}

export const addTaskAction=(data)=>{
    return {
        type:'ADDNEWTASK',
        payload:data

    }
}

export const deletePostAction=(data)=>{
    return {
        type:'DELETEPOST',
        payload:data
        
    }
}
export const editPostAction=(data)=>{
    return {
        type:'EDITPOST',
        payload:data
        
    }
}
export const removeTaskAction=(data)=>{
    return {
        type:'REMOVEPOST',
        payload:data
        
    }
}
