import React from 'react';
import './sortingvisualizer.css';
import {Buttons} from './buttons';
import {countingSort} from '../Algorithms/countingsort';
import {quicksort} from '../Algorithms/quicksort';
import {test} from '../Algorithms/testAlgo';

export class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {array: []};
        this.shuffle = this.shuffle.bind(this);
        this.cSort = this.cSort.bind(this);
        this.qSort = this.qSort.bind(this);
    }

    shuffle(){
        let len = 100, rbound = 1000, array1 = [];
        if(window.screen.height <= 1920 
            && window.screen.width <= 1080){
                len = 50;
                rbound = 500;
        }

        for(let i = 0; i < len; i++){
            array1.push(Math.floor(Math.random()*rbound + 1));
        }

        this.setState({array: array1});
    }

    cSort(){
        let sortedArray = this.state.array;
        let arrayElements = document.getElementsByClassName('numbers');
        const length = arrayElements.length;
        sortedArray = countingSort(this.state.array);

        for(let i = 0; i < length; i++){
            setTimeout(() => {
                arrayElements[i].style.backgroundColor = 'red';
            }, i*10);
        }
        
        setTimeout(() => {
            for(let i = 0; i < length; i++){
                setTimeout(() => {
                    arrayElements[i].style.height = `${sortedArray[i]}px`;
                    arrayElements[i].style.backgroundColor = 'aquamarine';
                }, i*10);
            }
        }, length*10);
    }

    async qSort(){
        let animations = [], arrayElements = document.getElementsByClassName('numbers'); //choose the divs that represent the numbers of this.state.array, and declare an empty animations array
        let array1 = this.state.array;
        
        array1 = quicksort(animations, array1, 0, array1.length-1); //quicksort found in ../Algorithms/quicksort.js
        animations.push({pivot: 0})//to stop encountering an issue where i > animations.length in the while at line 69
        
        for(let i = 0; i < animations.length; i++){
            if(animations[i].pivot !== undefined){ //if we have a pivot
                let pivot = animations[i].pivot; //save the position for later use
                arrayElements[animations[i].pivot].style.backgroundColor = 'red'; //make it red
                i++;
                
                if(i < animations.length){
                    while(animations[i].pivot === undefined){ //until the next pivot execute the instructions for that partition
                        if(animations[i].compare !== undefined){ //if we have 2 pointers to compare, turn em red for 15ms
                            arrayElements[animations[i].compare[0]].style.backgroundColor = 'red';
                            arrayElements[animations[i].compare[1]].style.backgroundColor = 'red';
    
                            await new Promise(r => setTimeout(r, 15));
                            arrayElements[animations[i].compare[0]].style.backgroundColor = 'aquamarine';//and make em aquamarine
                            arrayElements[animations[i].compare[1]].style.backgroundColor = 'aquamarine';
                        }
                        if(animations[i].swap !== undefined){//if we need to swap 2 values, make the divs red for 15ms and swap them
                            arrayElements[animations[i].swap[0]].style.backgroundColor = 'red';
                            arrayElements[animations[i].swap[1]].style.backgroundColor = 'red';
    
                            let temp = arrayElements[animations[i].swap[0]].style.height; //generic swap with temp, should work
                            arrayElements[animations[i].swap[0]].style.height = arrayElements[animations[i].swap[1]].style.height;
                            arrayElements[animations[i].swap[1]].style.height = temp;
    
                            await new Promise(r => setTimeout(r, 15));
                            arrayElements[animations[i].swap[0]].style.backgroundColor = 'aquamarine';
                            arrayElements[animations[i].swap[1]].style.backgroundColor = 'aquamarine';
                        }
                        i++;
                    }
                }
                arrayElements[pivot].style.backgroundColor = 'aquamarine'; //make the pivot aquamarine, get ready for next parititon
            }
        }
    }

    componentDidMount(){
        this.shuffle();
    }

    render(){
        return(
            <>
                <div id="numbersdiv">
                    {   
                        this.state.array.map((value, index) => (
                            <div className="numbers"
                                key={index}
                                style={{height: value}}>
                            </div>
                        ))
                    }
                </div>
                <div className="button">
                    <Buttons onHandleShuffle={this.shuffle} cSort={this.cSort} qSort={this.qSort} /*iSort={this.iSort}*//>
                </div>
            </>
        );
    }
}