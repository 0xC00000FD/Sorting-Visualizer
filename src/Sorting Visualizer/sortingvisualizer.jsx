import React from 'react';
import './sortingvisualizer.css';
import {Buttons} from './buttons';
import {countingSort} from '../Algorithms/countingsort';
import {quicksort} from '../Algorithms/quicksort';
import {bubblesort} from '../Algorithms/bubblesort';
import {test} from '../Algorithms/testAlgo';

export class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {array: []};
        this.shuffle = this.shuffle.bind(this);
        this.cSort = this.cSort.bind(this);
        this.qSort = this.qSort.bind(this);
        this.bSort = this.bSort.bind(this);
    }

    shuffle(){
        let len = document.getElementById('range').value, rbound = 10000, array1 = [];
        for(let i = 0; i < len; i++){
            array1.push(Math.floor(Math.random()*rbound + 1));
        }

        this.setState({array: array1});
    }

    async cSort(){
        let sortedArray = this.state.array;
        let arrayElements = document.getElementsByClassName('numbers');
        const length = arrayElements.length;
        sortedArray = countingSort(this.state.array);

        for(let i = 0; i < length; i++){
            await new Promise(r => setTimeout(r, 10));
            arrayElements[i].style.backgroundColor = 'red';
        }
        
        for(let i = 0; i < length; i++){
            await new Promise(r => setTimeout(r, 10));
            arrayElements[i].style.height = `${sortedArray[i]/10}px`;
            arrayElements[i].style.backgroundColor = 'aquamarine';    
        }

        await new Promise(r => setTimeout(r, 10))
        this.setState({array: sortedArray});
    }

    async qSort(){
        let animations = [], arrayElements = document.getElementsByClassName('numbers');
        //let speed = document.getElementById('speed')
        let array1 = this.state.array;
        
        array1 = quicksort(animations, array1, 0, array1.length-1);
        
        for(let i = 0; i < animations.length; i++){
            if(animations[i].compare !== undefined){
                arrayElements[animations[i].compare[0]].style.backgroundColor = 'red';
                arrayElements[animations[i].compare[1]].style.backgroundColor = 'red';

                await new Promise(r => setTimeout(r, 10));
                arrayElements[animations[i].compare[0]].style.backgroundColor = 'aquamarine';
                arrayElements[animations[i].compare[1]].style.backgroundColor = 'aquamarine';
            }
            if(animations[i].swap !== undefined){
                arrayElements[animations[i].swap[0]].style.backgroundColor = 'red';
                arrayElements[animations[i].swap[1]].style.backgroundColor = 'red';

                let temp = arrayElements[animations[i].swap[0]].style.height; 
                arrayElements[animations[i].swap[0]].style.height = arrayElements[animations[i].swap[1]].style.height;
                arrayElements[animations[i].swap[1]].style.height = temp;

                await new Promise(r => setTimeout(r, 10));
                arrayElements[animations[i].swap[0]].style.backgroundColor = 'aquamarine';
                arrayElements[animations[i].swap[1]].style.backgroundColor = 'aquamarine';
            }
        }

        this.setState({array: array1});
    }

    async bSort(){
        let animations = [], sortedArray = this.state.array;
        let arrayElements = document.getElementsByClassName('numbers');
        sortedArray = bubblesort(animations, sortedArray);

        for(let i = 0; i < animations.length; i++){
            if(animations[i].compare !== undefined){
                arrayElements[animations[i].compare].style.backgroundColor = 'red';

                await new Promise(r => setTimeout(r, 10));
                arrayElements[animations[i].compare].style.backgroundColor = 'aquamarine';
            }

            if(animations[i].swap !== undefined){
                arrayElements[animations[i].swap[0]].style.backgroundColor = 'red';
                arrayElements[animations[i].swap[1]].style.backgroundColor = 'red';

                let temp = arrayElements[animations[i].swap[0]].style.height; 
                arrayElements[animations[i].swap[0]].style.height = arrayElements[animations[i].swap[1]].style.height;
                arrayElements[animations[i].swap[1]].style.height = temp;

                await new Promise(r => setTimeout(r, 10));
                arrayElements[animations[i].swap[0]].style.backgroundColor = 'aquamarine';
                arrayElements[animations[i].swap[1]].style.backgroundColor = 'aquamarine';
            }
        }
        this.setState({array: sortedArray});
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
                                style={{height: value/10}}>
                            </div>
                        ))
                    }
                </div>
                <div id="button">
                    <input type="range" min="5" max="200" id="range" onChange={this.shuffle} />
                    <Buttons onHandleShuffle={this.shuffle} cSort={this.cSort} qSort={this.qSort} bSort={this.bSort} /*iSort={this.iSort}*//>
                </div>
            </>
        );
    }
}