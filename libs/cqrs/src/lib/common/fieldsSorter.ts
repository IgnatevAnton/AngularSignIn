/* eslint-disable @typescript-eslint/no-explicit-any */

export const fieldsSorter = (fields: string[], data: any[]) => (a: number, b: number) => fields.map(o => {
    let dir = 1;
    if (o[0] === '-') { dir = -1; o = o.substring(1); }
    return data[a][o] > data[b][o] ? dir : data[a][o] < data[b][o] ? -(dir) : 0;
}).reduce((p, n) => p ? p : n, 0);
