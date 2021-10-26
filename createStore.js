import { type } from "os"
import { listenerCount, listeners } from "process"
import Action from  "./uitls/actions"
function createStore(reducer,prestore,enhancers) {
    let currentState = prestore
    let currentlensitonList = []
    let nextLensitonList = []
    if(typeof prestore === "function"&&enhancers===undefined){
        enhancers = prestore
        prestore = undefined
    }
    if(typeof prestore === "function"&&typeof enhancers==="function"){
        throw new Error('看起来你把几个store增强器传递给了createStore(这是不支持的。相反，把它们写成一起到一个单一的功能')
    }
    if(typeof enhancers !== undefined){
        if(typeof enhancers=== "function"){
            return enhancers(createStore)(reducer, prestore)
        }
    }
    let isDispatch = false
    let currentReducer = reducer
    function ensureCanMutateNextListeners(){
        if(nextLensitonList===listenerCount){
            nextLensitonList = listeners.slice()
        }
    }
    function dispatch (action){
        if(isDispatch){
            new Error("正在dispatch 中")
        }
        try{
            isDispatch = true
            currentState = currentReducer(currentState,action)
        }finally{
            isDispatch = false
        }
        const listeners = currentlensitonList = nextLensitonList
        listeners.forEach(item=>item(currentState))
        return action
    }
    function getState(){
        return currentState
    }
    function subscribe(fun){
         /*
            subscribe(() => {
            console.log('1')
            subscribe(() => {
                console.log('2')
            })
            })
            在跟 发布的时候，在订阅的内容会影响 发布内容
         */
        ensureCanMutateNextListeners()
        nextLensitonList.push(fun)
        return function removeSubscribe (){
           
            ensureCanMutateNextListeners()
            nextLensitonList.splice(lensitonList.indexOf(fun),1)
            currentlensitonList = null
        }
    }
    function replaceReducer(reducer){
        currentReducer = reducer;
        dispatch({type:Action.replace})
    }
    // 对应 reducer 中的deatult 值，默认会把defult 值存入
    dispatch({type:Action.Init})
    return{
        dispatch,
        getState,
        subscribe,
        replaceReducer
    }
}
export default createStore