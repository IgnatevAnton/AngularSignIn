/* eslint-disable @typescript-eslint/no-explicit-any */
export const permutator = (inputArr: any[]): any[][] => {
  const result: any[][] = [];

  const permute = (arr: any[], m: any[] = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};
