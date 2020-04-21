export const quicksort = (animations, array, st, dr) => {   //st = left, dr = right, mij = middle 
    if(st < dr){
        let mij = Math.floor((st+dr)/2);    //middle point
        animations.push({pivot: mij});      
        animations.push({swap: [st, mij]}); //choose the leftmost element of the partition as the value for the pivot
        swap(array, st, mij); //swap em

        let i = st, j = dr, d = 0; //2 converging pointers
        while(i < j){
            animations.push({compare:[i, j]});
            if(array[i] > array[j]){
                animations.push({swap: [i, j]});
                swap(array, i, j);
                d = 1-d; //this is for incrementing i or decrementing j, one at a time. so if d = 0, j gets decremented, 
            }             //else d can only equal 0 and i gets incremented

            i += d;
            j -= 1-d;//either increments i or decrements j
        }

        quicksort(animations, array, st, i-1);//partitions to the left side of the array
        quicksort(animations, array, i+1, dr);//partitions to the right side of the array
    }
    return array;
}
//this algorithm actually works, but I guess the animations are fucked

const swap = (array, i, j) => {
    let temp = array[i];
    array[i] = array[j];//generic swap
    array[j] = temp;
}