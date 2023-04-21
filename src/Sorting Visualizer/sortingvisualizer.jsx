import React from 'react';
import './sortingvisualizer.css';
import {Buttons} from './buttons';
import {countingSort} from '../Algorithms/countingsort';
import {quicksort} from '../Algorithms/quicksort';
import {bubblesort} from '../Algorithms/bubblesort';
import {mergeSort} from '../Algorithms/mergesort';
import {test} from '../Algorithms/testAlgo';

export class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {array: []};
        this.shuffle = this.shuffle.bind(this);
        this.cSort = this.cSort.bind(this);
        this.qSort = this.qSort.bind(this);
        this.bSort = this.bSort.bind(this);
        this.mSort = this.mSort.bind(this);
    }

    shuffle(){
        let len = document.getElementById('range').value, rbound = 3/4 * visualViewport.height, array1 = [];

        for(let i = 0; i < len; i++){
            array1.push(Math.floor(Math.random()*rbound + 1));
        }

        this.setState({array: array1});
    }

    async cSort(){
        this.toggleButtons(true)
        let speed = document.getElementById("speed").value;
        await new Promise(r => setTimeout(r, 10));

        let sortedArray = this.state.array;
        let arrayElements = document.getElementsByClassName('numbers');
        const length = arrayElements.length;
        sortedArray = countingSort(this.state.array);

        for(let i = 0; i < length; i++){
            await new Promise(r => setTimeout(r, speed));
            arrayElements[i].style.backgroundColor = 'red';  
        }
        
        for(let i = 0; i < length; i++){
            await new Promise(r => setTimeout(r, speed));
            arrayElements[i].style.height = `${sortedArray[i]}px`;
            arrayElements[i].style.backgroundColor = 'aquamarine';    
        }

        this.setState({array: sortedArray});
        this.toggleButtons(false)
    }

    async qSort(){
        this.toggleButtons(true)
        let speed = document.getElementById("speed").value;
        await new Promise(r => setTimeout(r, 50));

        let animations = [], arrayElements = document.getElementsByClassName('numbers');
        let array1 = this.state.array;
        
        array1 = quicksort(animations, array1, 0, array1.length-1);
        
        for(let i = 0; i < animations.length; i++){
            if(animations[i].compare !== undefined){
                arrayElements[animations[i].compare[0]].style.backgroundColor = 'red';
                arrayElements[animations[i].compare[1]].style.backgroundColor = 'red';

                await new Promise(r => setTimeout(r, speed));
                arrayElements[animations[i].compare[0]].style.backgroundColor = 'aquamarine';
                arrayElements[animations[i].compare[1]].style.backgroundColor = 'aquamarine';
            }
            if(animations[i].swap !== undefined){
                arrayElements[animations[i].swap[0]].style.backgroundColor = 'red';
                arrayElements[animations[i].swap[1]].style.backgroundColor = 'red';

                let temp = arrayElements[animations[i].swap[0]].style.height; 
                arrayElements[animations[i].swap[0]].style.height = arrayElements[animations[i].swap[1]].style.height;
                arrayElements[animations[i].swap[1]].style.height = temp;

                await new Promise(r => setTimeout(r, speed));
                arrayElements[animations[i].swap[0]].style.backgroundColor = 'aquamarine';
                arrayElements[animations[i].swap[1]].style.backgroundColor = 'aquamarine';
            }
        }

        this.setState({array: array1});
        this.toggleButtons(false)
    }

    async bSort(){
        this.toggleButtons(true)
        await new Promise(r => setTimeout(r, 10))

        let animations = [], sortedArray = this.state.array;
        let speed = document.getElementById("speed").value;
        let arrayElements = document.getElementsByClassName('numbers');
        sortedArray = bubblesort(animations, sortedArray);

        for(let i = 0; i < animations.length; i++){
            if(animations[i].compare !== undefined){
                arrayElements[animations[i].compare].style.backgroundColor = 'red';

                await new Promise(r => setTimeout(r, speed));
                arrayElements[animations[i].compare].style.backgroundColor = 'aquamarine';
            }

            if(animations[i].swap !== undefined){
                arrayElements[animations[i].swap[0]].style.backgroundColor = 'red';
                arrayElements[animations[i].swap[1]].style.backgroundColor = 'red';

                let temp = arrayElements[animations[i].swap[0]].style.height; 
                arrayElements[animations[i].swap[0]].style.height = arrayElements[animations[i].swap[1]].style.height;
                arrayElements[animations[i].swap[1]].style.height = temp;

                await new Promise(r => setTimeout(r, speed));
                arrayElements[animations[i].swap[0]].style.backgroundColor = 'aquamarine';
                arrayElements[animations[i].swap[1]].style.backgroundColor = 'aquamarine';
            }
        }
        
        this.setState({array: sortedArray});
        this.toggleButtons(false)
    }

    async mSort(){
        this.toggleButtons(true)
        await new Promise(r => setTimeout(r, 10))
    
        let animations = [], sortedArray = this.state.array;
        let arrayElements = document.getElementsByClassName('numbers');
        let speed = document.getElementById("speed").value;
        mergeSort(animations, sortedArray, 0, sortedArray.length-1);
        console.log(animations);

        for(let i = 0; i < animations.length; i++){
            if(animations[i].compare !== undefined){
                arrayElements[animations[i].compare[0]].style.backgroundColor = 'red';
                if(animations[i].compare[1] !== undefined){
                    arrayElements[animations[i].compare[1]].style.backgroundColor = 'red';
                }

                await new Promise(r => setTimeout(r, speed));
                arrayElements[animations[i].compare[0]].style.backgroundColor = 'aquamarine';
                if(animations[i].compare[1] !== undefined){
                    arrayElements[animations[i].compare[1]].style.backgroundColor = 'aquamarine';
                }
            }
            if(animations[i].merge !== undefined){
                const dr = animations[i].merge[0] + animations[i].merge[1].length, st = animations[i].merge[0];
                let k = 0;
                for(let j = st; j < dr; j++){
                    arrayElements[j].style.height = `${animations[i].merge[1][k++]}px`;
                    await new Promise(r => setTimeout(r, speed));
                }
            }
        }

        sortedArray.sort(function(a, b){return a-b});
        this.setState({array: sortedArray});
        this.toggleButtons(false);
    }

    toggleButtons(disable) {
        let buttons = document.getElementsByClassName("buttons");
        
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = disable;
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
                                style={{height: value, backgroundColor: 'aquamarine'}}>
                            </div>
                        ))
                    }
                </div>

                <div id="button">
                    <input type="range" className="range" min="5" max="500" id="range" onChange={this.shuffle} />
                    <Buttons onHandleShuffle={this.shuffle} cSort={this.cSort} qSort={this.qSort} bSort={this.bSort} mSort={this.mSort} />
                    <input type="range" className="range" min="1" max="50" id="speed"/>
                </div>
            </>
        );
    }
}