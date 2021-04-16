export const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];

export function isNullOrEmpty(param: string | object | [] = '' || {} || []): boolean {
   let isNullOrEmpty = false;

   if (typeof param === 'string') {
      isNullOrEmpty = !param.trim().length;
   } else if (Array.isArray(param)) {
      isNullOrEmpty = !param.length;
   } else if (typeof param === 'object') {
      isNullOrEmpty = !Object.keys(param).length;
   }

   return isNullOrEmpty;
}
