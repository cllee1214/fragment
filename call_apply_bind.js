
/*
  1. this如果为null的话执行window
  2. call 和 apply可能有返回值
*/


Function.prototype._call = function(context){
  context = context || window
  context.fun = this
  var argStr = ''
  var funStr = ''
  var exeFun = null
  for(var i = 1; i < arguments.length; i++){
    argStr += 'args[' + i + ']'
    if(i != arguments.length - 1){
      argStr += ','
    }
  }
  funStr = 'return context.fun('+ argStr +')'
  exeFun = new Function('context', 'args', funStr)
  return exeFun(context, arguments)
  delete context.fun
}


Function.prototype._apply = function(context){
  context = context || window
  context.fun = this
  var argStr = ''
  var funStr = ''
  var exeFun = null
  var type = Object.prototype.toString.call(arguments[1])
  if(type != "[object Arguments]" && type != "[object Array]"){
    throw 'parameter must be arguments or array'
  }
  for(var i = 0; i < arguments[1].length; i++){
    argStr += 'args[' + i + ']'
    if(i != arguments[1].length - 1){
      argStr += ','
    }
  }
  funStr = 'return context.fun('+ argStr +')'
  exeFun = new Function('context', 'args', funStr)
  return exeFun(context, arguments[1])
  delete context.fun
}




// var obj = {
//   value: 1
// }

// function a (num,num1){
//   return this.value + num
// }

// var aa = a._apply(obj,[12,334])
// a.apply(obj, [3,23])

// console.log(aa)

