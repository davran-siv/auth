import { isDate as isDateValidator } from 'class-validator'

const isObject = (arg: any): arg is object => Object.prototype.toString.call(arg) === '[object Object]'
const isArray = (arg: any): arg is any[] => Object.prototype.toString.call(arg) === '[object Array]'
const isString = (arg: any): arg is string => Object.prototype.toString.call(arg) === '[object String]'
const isFunction = (arg: any): arg is Function => Object.prototype.toString.call(arg) === '[object Function]'
const isNumber = (arg: any): arg is number => !isNaN(arg) && Object.prototype.toString.call(arg) === '[object Number]'
const isDate = (arg: any): arg is Date => isDateValidator(arg)
const isType = <T extends unknown>(item: any, keys: string[]): item is T => {
  return keys.every(key => (item as T)[key] !== undefined)
}

const isKeyIterable = (arg: any): arg is number | string => isNumber(arg) || isString(arg)
export {
  isObject,
  isArray,
  isString,
  isNumber,
  isType,
  isDate,
  isFunction,
  isKeyIterable,
}
