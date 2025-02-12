export function isCheckPrimitiveTypeInObject<T>(data: any, cls: Object) {
    if (typeof data !== "object" || typeof cls !== "object") { return false; }
    const dataKeys = Object.keys(data) as Array<keyof typeof data> & Array<keyof typeof cls>;
    for (const key of dataKeys) {
        if (typeof data[key] === "object") { continue; }
        if (!(key in cls)) { return false; }
        if (typeof data[key] !== typeof cls[key]) { return false; }
    }
    return true;
}
