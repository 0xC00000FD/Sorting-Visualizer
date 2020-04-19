import React from 'react';
import './sortingvisualizer.css';
import {Buttons} from './buttons';
import {countingSort} from '../Algorithms/countingsort';
import {test} from '../Algorithms/testAlgo';

export class SortingVisualizer extends React.Component{
    constructor(props){
        super(props);

        this.state = {array: []};
        this.shuffle = this.shuffle.bind(this);
        this.cSort = this.cSort.bind(this);
    }

    shuffle(){
        let len = 100, rbound = 1000, array1 = [];
        if(window.screen.height <= 1920 
            && window.screen.width <= 1080){
                len = 50;
                rbound = 500;
        }

        let poz = Math.floor(Math.random()*100);
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
                    <Buttons onHandleShuffle={this.shuffle} cSort={this.cSort}/>
                </div>
            </>
        );
    }
}