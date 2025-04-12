export function isCheckPrimitiveTypeInObject<T extends object>(data: T, cls: object) {
  if (typeof data !== 'object' || typeof cls !== 'object') {
    return false;
  }
  const clsKayes = Object.keys(cls) as (keyof typeof data)[] & (keyof typeof cls)[];
  for (const key of clsKayes) {
    if (typeof clsKayes[key] === 'object') { continue; }
    if (!(key in data)) { return false; }
    if (typeof data[key] !== typeof cls[key]) { return false; }
  }
  return true;
}
