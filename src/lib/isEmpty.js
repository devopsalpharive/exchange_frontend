export const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);


export const ObjectIsempty = (Obj) => {
    try {
        let objectArr = Object.values(Obj);
        console.log("objectArr", objectArr);
        for (let i = 0; i < objectArr.length; i++) {
            let emptyKey = [];
            if (!isEmpty(objectArr[i])) {
                console.log("if");
                return false;
            } else {
                // console.log("else");
                // return true;
                emptyKey.push(i);
                if (emptyKey.length - 1 == objectArr.length - 1) {
                    console.log("else");
                    return true;
                }
            }
        }
        console.log("outofthefun");
        return true;
    } catch (err) {
        console.log(err, "ObjectIsempty_err");
    }
}