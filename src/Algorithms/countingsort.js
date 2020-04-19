export const countingSort = (arr) => {
    const count = {};
    let Max = 0, Min = 20000;
    arr.map((value) => {
        if(value > Max)
            Max = value;
        if(value < Min)
            Min = value;
    });
    
    for (let i = Min; i <= Max; i++) {
        count[i] = 0;
    }
    for (let i = 0; i < arr.length; i++) {
        count[arr[i]] += 1;
    }
    
    const sortedArr = [];
    for (let i = Min; i <= Max; i++) {
        while (count[i] > 0) {
            sortedArr.push(i);
            count[i]--;
        }
    }
    return sortedArr;
} 