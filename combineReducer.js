import Action from './uitls/actions'
function verifyReducer(realReducerObj){
    Reflect.ownKeys(realReducerObj).forEach(item=>{
        if(realReducerObj[item](undefined,{type:Action.Replace})===undefined){
            new Error("reducer 必须要有默认返回值")
        }
    })
}
function  combineReducer(reducerObj) {
    const realReducerObj = {}
    Reflect.ownKeys(reducerObj).forEach(item=>{
        if(typeof reducerObj[item] =="function"){
            realReducerObj[item] = reducerObj[item]
        }
    })
    verifyReducer(realReducerObj)
    function reducer(state={},action){
        const objState = {}
        let hasChanged = false
        Reflect.ownKeys(realReducerObj).forEach(item=>{
            let predState = state[item]
            let newState = realReducerObj[item](predState,action)
            objState[item] = newState
            if(predState!=newState){
                hasChanged = hasChanged|| predState !==newState
            }
        })
        return hasChanged?objState:state
    }
    return reducer
}
export default combineReducer