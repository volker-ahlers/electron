// copy objects without reference
export const copyObject = (obj: any) => {
    return JSON.parse(JSON.stringify(obj));
}