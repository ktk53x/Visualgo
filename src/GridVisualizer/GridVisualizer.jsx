import React from 'react';
import Node from './Node/Node';

import './GridVisualizer.css';
import { bfs } from '../Algorithms/bfs';
import { dfs } from '../Algorithms/dfs';

const SR = 10; // starting row
const SC = 15;
const DR = 10;
const DC = 30;

const create_node = (r, c, ob) => {
    return {
        row: r,
        col: c,
        src: (r === SR && c === SC),
        dst: (r === DR && c === DC),
        dist: Infinity,
        visited: false,
        blocked: false,
        pred: null,
        mouse_down: () =>  {
            ob.mouse_down(r, c)
        },
        mouse_up: () => {
            ob.mouse_up(r, c)
        },
    };
};

const initialize_grid = (ob) => {
    const grid = [];
    for(let r = 0; r < 25; r++)
    {
        const current_row = [];
        for(let c = 0; c < 50; c++)
        {
            current_row.push(create_node(r, c, ob));
        }
        grid.push(current_row);
    }
    return grid;  
};

export default class GridVisualizer extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {
            grid: [],
        };
    }
    
    componentDidMount()
    {
        const grid = initialize_grid(this);
        this.setState({grid});
    }

    animate_BFS(visit_order)
    {
        for(let i = 0; i < visit_order.length; i++)
        {
            setTimeout(() => {
                const node = visit_order[i];
                console.log(node);
                const new_grid = this.state.grid;
                new_grid[node.row][node.col].visited = true;
                this.setState({grid: new_grid});
            }, 30 * i)
        }
    }

    visualize_BFS = () => {
        let {grid}= this.state;
        const visit_order = bfs(grid, grid[SR][SC], grid[DR][DC]);
        this.animate_BFS(visit_order);
    }

    visualize_DFS = () => {
        let {grid}= this.state;
        const visit_order = dfs(grid, grid[SR][SC], grid[DR][DC]);
        this.animate_BFS(visit_order);
    }

    mouse_up(row, col)
    {
        
    }

    mouse_down(row, col)
    {
        const new_grid = this.state.grid;
        new_grid[row][col].blocked = !new_grid[row][col].blocked;
        this.setState({new_grid});
    }

    render()
    {
        const {grid} = this.state;
        return(
            <>
                <button onClick={this.visualize_BFS}>
                    Visualize BFS
                </button>

                <button onClick={this.visualize_DFS}>
                    Visualize DFS
                </button>
                
                <div className="grid">
                {
                    grid.map((row, row_id) => {
                        return (
                            <div key={row_id}>
                            {
                                row.map((node, node_id) => {
                                    return (
                                        <Node key={node_id} node={node}></Node>
                                    );
                                })
                            }
                            </div>
                        );
                    })
                }   
                </div>
            </>
        );
    }
}