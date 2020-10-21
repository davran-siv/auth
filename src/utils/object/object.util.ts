import { BadRequestException } from '@nestjs/common'
import { isArray, isKeyIterable, isNullOrUndefined, isNumber, isString } from '..'
import { ArrayAsObject } from '../../shared/generics/array-as-object';

/**
 *
 * @param arr
 * @param key. To get value from child objects provide path to property adding dot. Ex: product.id
 * @param arrayValue If true then value will be in array format and pushed to existing value
 */
export const arrayToObject = <T>(arr: any[], key: string = 'id', arrayValue: boolean = false): ArrayAsObject<T> => {
  const keyParts = key.split('.')

  if (isNullOrUndefined(arr)) {
    throw new BadRequestException(`Unable to convert array to object`)
  }

  return arr.reduce((acc, cur) => {
    let value
    if (keyParts.length === 1) {
      value = cur[key]
    } else {
      let keyValue = null
      for (const keyPart of keyParts) {
        keyValue = keyValue ? keyValue[keyPart] : cur[keyPart]
      }
      value = keyValue
    }

    if (value) {
      if (arrayValue) {
        acc[value] ? acc[value].push(cur) : acc[value] = [cur]
      } else {
        acc[value] = cur
      }
    }
    return acc
  }, {} as ArrayAsObject<T>)
}

export const listToDictionaryWithoutExcludeProperty = <T, K extends keyof T>(array: T[], key: K, normalizer?: Function): { [key in number | string]: T } => {
  return array.reduce((acc, cur) => {
    const value = cur[key]
    if (!(isNumber(value) || isString(value))) {
      throw new BadRequestException('Key should be ether number or string')
    }
    const keyValue: number | string = value
    if (isArray(cur)) {
      // @ts-ignore
      acc[keyValue] = cur.map(it => normalizer ? normalizer(it) : it)
      return acc
    }

    acc[keyValue] = normalizer ? normalizer(cur) : cur
    return acc
  }, {} as { [key in number | string]: T })
}

export const listToArrayDictionary = <T, K extends keyof T>(array: T[], key: K, normalizer?: Function): { [key in number | string]: Omit<T, K>[] } => {
  return array.reduce((acc, cur) => {
    const value = cur[key]
    if (!(isNumber(value) || isString(value))) {
      throw new BadRequestException('Key should be ether number or string')
    }
    const keyValue: number | string = value
    const { [key]: deletedKey, ...exceptKey } = cur

    const normalized = isArray(exceptKey)
      ? exceptKey.map(it => normalizer ? normalizer(it) : it)
      : normalizer ? normalizer(exceptKey) : exceptKey

    acc[keyValue] = acc[keyValue] ? [...acc[keyValue], normalized] : [normalized]
    return acc
  }, {} as { [key in number | string]: Omit<T, K>[] })
}

export const listToDictionary = <T, K extends keyof T, V extends keyof T>(
  array: T[],
  key: K,
  value: V,
  normalizer?: Function,
): { [key in number | string]: T[V] } => {
  return array.reduce((acc, cur) => {
    const keyValue = cur[key]
    if (!isKeyIterable(keyValue)) {
      throw new BadRequestException('Key should be ether number or string')
    }
    const validatedKey: number | string = keyValue
    const pickedValue = cur[value]

    acc[validatedKey] = normalizer ? normalizer(pickedValue) : pickedValue
    return acc
  }, {} as { [key in number | string]: T[V] })
}
