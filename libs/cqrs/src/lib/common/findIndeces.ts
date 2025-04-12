/* eslint-disable @typescript-eslint/no-explicit-any */

export const findIndeces = (fields: string[], search: any, data: any[]): number[] => {
    const result: number[] = [];
    for (let i = 0; i < data.length; i++) {
        let isValide = false;
        for (const key of fields) {
            if (`${data[i][key]}`.toLocaleLowerCase().includes(`${search}`)) { isValide = true; break; }
        }
        if (!isValide) { continue; }
        result.push(i);
    }
    return result;
};
