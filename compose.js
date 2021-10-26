function  compose(...list) {
    if (list.length === 0) {
      return (arg) => arg
    }
  
    if (list.length === 1) {
      return list[0]
    }
     return list.reduce((pre,cur)=>(...arg)=>{
      return pre(cur(...arg))
     })
  }
  export default compose