/* eslint-disable @typescript-eslint/no-explicit-any */

export const filterIndeces = (fields: Map<string, any>, data: any[]): number[] => {
  const result: number[] = [];
  for (let i = 0; i < data.length; i++) {
    let isValid = true;
    for (const [key, value] of fields) {
      if (data[i][key] === value) { continue; }
      isValid = false; break;
    }
    if (!isValid) { continue; }
    result.push(i);
  }
  return result;
};
