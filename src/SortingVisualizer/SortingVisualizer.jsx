import React from 'react';
import "./SortingVisualizer.css";
import { bubble_sort } from '../Algorithms/bubble_sort';

export default class SortingVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            a: [],
        }
    }

    initialize_array()
    {
        let a = [];
        for(let i = 0; i < 100; i++)
            a.push(Math.floor(Math.random() * (100 - 20 + 1)) + 20);
        this.setState({a});
    }

    componentDidMount()
    {
        this.initialize_array();
    }

    bubbleSort = () => {
        let a = this.state.a.slice();
        let animations = bubble_sort(a);
        let abar = document.getElementsByClassName('array-bar');
        console.log(this.state.a);
        for(let i = 0; i < animations.length; i++)
        {
            let idx1 = animations[i][0], idx2 = animations[i][1];
            setTimeout(() => {
                let val1 = abar[idx1].style.height, val2 = abar[idx2].style.height;
                abar[idx1].style.height = `${val2}`;
                abar[idx2].style.height = `${val1}`;
            }, i * 1);
        }
    }

    render()
    {
        return(
        <>
        <div className="">
            {this.state.a.map((value, idx) => (
                <div key={idx} className="array-bar" style={{ backgroundColor: 'blue', height: `${value*5}px`}}>
                </div>
            ))}
        </div>
        <button onClick={this.bubbleSort}>Bubble Sort</button>
        </>
        );
    }
}
