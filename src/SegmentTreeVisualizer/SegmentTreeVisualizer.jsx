import React from 'react';

import './SegmentTreeVisualizer.css';
import { tree } from 'd3';
import clone from "clone";


export default class SegmentTreeVisualizer extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            a: [],
            tree: [],
            update_idx: '',
            update_val: '',
        }
    }
    
    initialize_array()
    {
        let a = [];
        for(let i = 0; i < 16; i++)
            a.push(Math.floor(Math.random() * (100 - 20 + 1)) + 20);
        this.setState({a});
    }

    update_tree = () => {
        let n = this.state.a.length;
        let tree = clone(this.state.tree);
        let i = 1;
        let h = 0;
        while(n != i)
        {
            let level = [];
            for(let j= 0; j < i; j++)
                level.push(0);
            tree.push(level);
            i = i * 2;
            h++;
        }
        let level = [];
        for(let j = 0; j < i; j++)
            level.push(this.state.a[j]);
        tree.push(level);

        for(let i = h - 1; i >= 0; i--)
        {
            for(let j = 0; j < 2**i; j++)
            {
                tree[i][j] = tree[i+1][2 * j] + tree[i+1][2 * j + 1];
            }
        }
        
        this.setState({tree: tree});

    }

    segment_tree = () => {
        let n = this.state.a.length;
        let tree = clone(this.state.tree);
        let i = 1;
        let h = 0;
        while(n != i)
        {
            let level = [];
            for(let j= 0; j < i; j++)
                level.push(0);
            tree.push(level);
            i = i * 2;
            h++;
        }
        let level = [];
        for(let j = 0; j < i; j++)
            level.push(this.state.a[j]);
        tree.push(level);

        for(let i = h - 1; i >= 0; i--)
        {
            for(let j = 0; j < 2**i; j++)
            {
                tree[i][j] = tree[i+1][2 * j] + tree[i+1][2 * j + 1];
            }
        }
        
        this.setState({tree: tree});
    }

    componentDidMount()
    {
        this.initialize_array();
    }

    changeUpdateIdxHandler = (event) => {
        this.setState({update_idx: event.target.value});
    }
    changeUpdateValHandler = (event) => {
        this.setState({update_val: event.target.value});
    }

    submitUpdateHandler = (event) => {
        event.preventDefault();
        this.update_tree();
    }
    

    render()
    {
        return (
            <>
            <div className="">
                <div>
                {this.state.tree.map((level, level_id) => (
                            <div key={level_id}>
                            {
                                level.map((value, node_id) => {
                                    return (
                                        <div key={node_id} className="array-box" style={{ backgroundColor: 'yellow', textAlign: 'center', width: `${ 2 ** (5 - level_id) * 25}px`}}>
                                            {value}
                                        </div>
                                    );
                                })
                            }
                            </div>
                        ))}
                </div>
                <div>
                {this.state.a.map((value, idx) => {
                    return (
                    <div key={idx} className="array-box" style={{ backgroundColor: 'red'}}>
                        {value}
                    </div>
                    );
                })}
                </div>
            </div>
            <button onClick={this.segment_tree}>Build Segment Tree</button>
            <form onSubmit={this.submitUpdateHandler}>
                <input type='text' onChange={this.changeUpdateIdxHandler}/>
                <input type='text' onChange={this.changeUpdateValHandler}/>
                <input type='submit' value='Update'/>
            </form>
            </>
            );
    }
}