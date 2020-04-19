export const test = (callback, array) => {
    let sw = true;
    let sorted = array;
    sorted.sort((a, b) => a-b);
    callback(array);

    sorted.forEach((value, index) => {
        if(value !== array[index])
            sw = false;
    });

    return sw;
}