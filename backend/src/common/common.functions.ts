export async function asyncMap(array: any[], cb: (item) => any) {
    const result =[];
    for (let i = 0; i < array.length; i++) {
        result.push(await cb(array[i]));
    }
    return result;
}