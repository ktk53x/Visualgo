import React from 'react';
import Tree from 'react-d3-tree';
import clone from "clone";


const red_node = {
    shapeProps: {
        shape: 'circle',
        r: 30,
        fill: 'red',
    }
};

const black_node = {
    shapeProps: {
        shape: 'circle',
        r: 30,
        fill: 'grey',
    }
};

export default class RBTreeVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            insert_val: '',
            tree: [{name: 'NULL', nodeSvgShape: black_node}],
        };
    }
    changeHandler = (event) => {
        this.setState({insert_val: event.target.value});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.insert();
    }
    
    componentDidMount()
    {
    }

    insert = () => {
        let tree = this.state.tree;
        let tree_copy = clone(this.state.tree);
        if(tree[0].name === 'NULL')
        {
            tree = [
            {
                name: this.state.insert_val,
                nodeSvgShape: black_node, 
                children: [{name: 'NULL', nodeSvgShape: black_node}, {name: 'NULL', nodeSvgShape: black_node}],
            }];
        }
        else
        {

            if(tree_copy[0].name <= this.state.insert_val)
            {
                tree_copy[0].children[0] = {name: this.state.insert_val, nodeSvgShape: red_node};
            }
            else
            {
                tree_copy[0].children[1] = {name: this.state.insert_val, nodeSvgShape: red_node};

            }
            tree = clone(tree_copy);
        }
        this.setState({tree: tree});
        this.render();
    }
    render()
    {
        return(
            <div style={{width: '50em', height: '20em'}}>
            <form onSubmit={this.submitHandler}>
                <input type='text' onChange={this.changeHandler}/>
                <input type='submit'/>
            </form>
                <Tree data={this.state.tree}></Tree>
            </div>
        );

    }
};