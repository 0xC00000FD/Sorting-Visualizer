export const test = (callback, array) => {
    let sw = true, animations = [];
    let sorted = array, sorted2 = array;

    sorted.sort((a, b) => a-b);
    sorted2 = callback(animations, sorted2, 0, sorted2.length-1);;

    sorted.forEach((value, index) => {
        if(value !== sorted2[index])
            sw = false;
    });

    return sw;
}