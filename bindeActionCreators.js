function createActioncreator(actioncreator,dispatch){
    return function(){
        return  dispatch(actioncreator.apply(this,arguments))
    }
}
export default function bindeActionCreators(actioncreators,dispatch){
    if(typeof actioncreators == 'function'){
       return createActioncreator(actioncreators,dispatch)
    }
    const actioncreatorsObj = {}
    Reflect.ownKeys(actioncreator).forEach(item=>{
        if(typeof actioncreator[item] =="function"){
            actioncreatorsObj[item] =  createActioncreator(actioncreator[item],dispatch)
        }
    })
    return actioncreatorsObj
}