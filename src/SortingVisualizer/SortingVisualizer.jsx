import React from 'react';
import './SortingVisualizer.css'
import * as sortingAlgorithms from './../sortingAlgorithms/sortingAlgorithms.js'

let WINDOW_HEIGHT = window.innerHeight;
let WINDOW_WIDTH = window.innerWidth;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };

        this.resetArray = this.resetArray.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.heapSort = this.heapSort.bind(this);
    }

    componentDidMount() {
        this.resetArray();
    }
    
    resetArray() {
        const array = [];
        for(let i = 0; i < 90; i++){
            array.push(randomIntFromInterval(5, WINDOW_HEIGHT - 30));
        }
        this.setState({array});
        console.log(array);
    }

    mergeSort() {
        const [animations, sortArray] = sortingAlgorithms.getMergeSortAnimations(this.state.array);
        console.log(sortArray);
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i][0] === "compare1") {
                const idx1 = animations[i][1];
                const idx2 = animations[i][2];
                setTimeout(() => {     
                    arrayBars[idx1].style.backgroundColor = 'red';
                    arrayBars[idx2].style.backgroundColor = 'red';
                }, i * 20);
            } else if(animations[i][0] === "compare2") {
                const idx1 = animations[i][1];
                const idx2 = animations[i][2];
                setTimeout(() => {     
                    arrayBars[idx1].style.backgroundColor = 'turquoise';
                    arrayBars[idx2].style.backgroundColor = 'turquoise';
                }, i * 20);
            } else {
                setTimeout(() => {
                    const [overwrite, idx, newHeight] = animations[i];
                    arrayBars[idx].style.height = `${newHeight}px`;
                }, i * 20);
            }
        }
    }

    quickSort() {
        let [animations, array] = sortingAlgorithms.getQuickSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i][0] === "compare1") {
                const idx1 = animations[i][1];
                const idx2 = animations[i][2];
                setTimeout(() => {     
                    arrayBars[idx1].style.backgroundColor = 'red';
                    arrayBars[idx2].style.backgroundColor = 'red';
                }, i * 20);
            } else if(animations[i][0] === "compare2") {
                const idx1 = animations[i][1];
                const idx2 = animations[i][2];
                setTimeout(() => {     
                    arrayBars[idx1].style.backgroundColor = 'turquoise';
                    arrayBars[idx2].style.backgroundColor = 'turquoise';
                }, i * 20);
            } else {
                const idx1 = animations[i][1];
                const idx2 = animations[i][2];
                setTimeout(() => {
                    let temp = arrayBars[idx1].style.height; 
                    arrayBars[idx1].style.height = arrayBars[idx2].style.height;
                    arrayBars[idx2].style.height = temp;
                }, i * 20);
            }
        }
    }

    bubbleSort() {
        const animations = sortingAlgorithms.getBubbleSortAnimations(this.state.array);
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i][0] === "compare1") {
                const idx1 = animations[i][1];
                setTimeout(() => {     
                    arrayBars[idx1].style.backgroundColor = 'red';
                    arrayBars[idx1 + 1].style.backgroundColor = 'red';
                }, i * 20);
            } else if(animations[i][0] === "compare2") {
                const idx1 = animations[i][1];
                setTimeout(() => {     
                    arrayBars[idx1].style.backgroundColor = 'turquoise';
                    arrayBars[idx1 + 1].style.backgroundColor = 'turquoise';
                }, i * 20);
            } else {
                const idx1 = animations[i][1];
                setTimeout(() => {
                    let temp = arrayBars[idx1].style.height; 
                    arrayBars[idx1].style.height = arrayBars[idx1 + 1].style.height;
                    arrayBars[idx1 + 1].style.height = temp;
                }, i * 20);
            }
        }
    }

    heapSort() {
        let [animations, sortedArray] = sortingAlgorithms.getHeapSortAnimations(this.state.array);
        console.log(animations);
        for(let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if(animations[i][0] === "compare1") {
                const idx1 = animations[i][1];
                const idx2 = animations[i][2];
                setTimeout(() => {     
                    arrayBars[idx1].style.backgroundColor = 'red';
                    arrayBars[idx2].style.backgroundColor = 'red';
                }, i * 20);
            } else if(animations[i][0] === "compare2") {
                const idx1 = animations[i][1];
                const idx2 = animations[i][2];
                setTimeout(() => {     
                    arrayBars[idx1].style.backgroundColor = 'turquoise';
                    arrayBars[idx2].style.backgroundColor = 'turquoise';
                }, i * 20);
            } else {
                const idx1 = animations[i][1];
                const idx2 = animations[i][2];
                setTimeout(() => {
                    let temp = arrayBars[idx1].style.height; 
                    arrayBars[idx1].style.height = arrayBars[idx2].style.height;
                    arrayBars[idx2].style.height = temp;
                }, i * 20);
            }
        }
        console.log(sortedArray);
    }

    render() {
        const {array} = this.state;

        return (
            <>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                        className="array-bar" 
                        key={idx} 
                        style={{height: `${value}px`}}>
                    </div>
                ))}
            </div>
            <div className="buttons">
            <button onClick={this.resetArray}>Generate New Array</button>
                <button onClick={this.mergeSort}>Merge Sort</button>
                <button onClick={this.quickSort}>Quick Sort</button>
                <button onClick={this.bubbleSort}>Bubble Sort</button>
                <button onClick={this.heapSort}>Heap Sort</button>
            </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}