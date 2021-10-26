import compose from "./compose"
function applyMiddleware(...middleware) {
    return (createStore)=>(...args)=>{
        console.log(...args)
      const store = createStore(...args)
      let   dispatch=()=>{
          new Error("dispatch 正在构造，稍后调用")
      }
      const middlewareAPI={
        getState: store.getState,
        dispatch: (...args) =>  dispatch(...args)
      }
      const chain = middleware.map(item=>item(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)
      return{
        ...store,
        dispatch
      }
    }
}
export default applyMiddleware