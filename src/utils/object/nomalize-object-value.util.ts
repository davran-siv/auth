import { ArrayAsObject } from '../../shared/generics/array-as-object';

export const normalizeObjectValue = <Dto, V>(obj: ArrayAsObject<V>, normalizer: Function): ArrayAsObject<Dto> => {
  return Object.entries(obj).reduce<ArrayAsObject<Dto>>((acc, [key, value]) => {
    acc[key] = normalizer(value);
    return acc;
  }, {});
};
