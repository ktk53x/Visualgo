import React from 'react';
import Tree from 'react-d3-tree';
import clone from "clone";


const node = {
    shapeProps: {
        shape: 'circle',
        r: 30,
        fill: 'yellow',
    }
};

const NULL = {name: 'NULL', nodeSvgShape: node, children: [], parent: 'NULL'};


export default class BSTVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            insert_val: '',
            search_val: '',
            delete_val: '',
            tree: [{name: 'NULL', nodeSvgShape: node, children: [], parent: 'NULL'}],
            // children[0] = right child, children[1] = left child
        };
    }

    changeInsertHandler = (event) => {
        this.setState({insert_val: event.target.value});
    }

    submitInsertHandler = (event) => {
        event.preventDefault();
        this.insert();
    }

    changeDeleteHandler = (event) => {
        this.setState({delete_val: event.target.value});
    }

    submitDeleteHandler = (event) => {
        event.preventDefault();
        this.remove();
    }

    changeSearchHandler = (event) => {
        this.setState({search_val: event.target.value});
    }

    submitSearchHandler = (event) => {
        event.preventDefault();
        this.search();
    }
    
    componentDidMount()
    {
    }

    search = () => {
        let tree = clone(this.state.tree);
        let val = this.state.search_val;
        let temp = tree[0];

        while(temp.name !== 'NULL')
        {
            if(parseInt(temp.name) < parseInt(val))
                temp = temp.children[0];
            else if(parseInt(temp.name) === parseInt(val))
            {
                alert("FOUND\n");
                return temp;
            }
            else
                temp = temp.children[1];
        }
        alert("NOT FOUND\n");
        return NULL;
    }

    insert = () => {
        let tree = clone(this.state.tree);
        let val = this.state.insert_val;
        
        let temp = tree[0];
        if(temp.name === 'NULL')
        {
            temp.name = val;
            temp.parent = NULL;
            temp.children.push({name: 'NULL', nodeSvgShape: node, children: [], parent: temp});
            temp.children.push({name: 'NULL', nodeSvgShape: node, children: [], parent: temp});
        }
        else
        {
            let pred = temp.parent;
            while(temp.name !== 'NULL')
            {
                pred = temp;
                if(parseInt(temp.name) < parseInt(val))
                    temp = temp.children[0];
                else
                    temp = temp.children[1];
            }
            temp.name = val;
            temp.parent = pred;
            temp.children.push({name: 'NULL', nodeSvgShape: node, children: [], parent: temp});
            temp.children.push({name: 'NULL', nodeSvgShape: node, children: [], parent: temp});

        }
        this.setState({tree: tree});
    }

    transplant = (u, v, tree) => {
        let pred = u.parent;
        if(pred != NULL)
        {
            if(u === pred.children[0])
                pred.children[0] = v;
            else
                pred.children[1] = v;
        }
        else
            tree[0] = v;
        v.parent = pred;
    }


    remove = () => {
        // ERROR IN DELETING ROOT
        let tree = clone(this.state.tree);
        let val = this.state.delete_val;
        let temp = tree[0];

        //TREE SEARCH FOR VALUE TO DELETE
        while(temp.name !== 'NULL')
        {
            if(parseInt(temp.name) < parseInt(val))
                temp = temp.children[0];
            else if(parseInt(temp.name) === parseInt(val))
            {
                alert("FOUND\n");
                break;
            }
            else
                temp = temp.children[1];
        }

        if(temp.name === 'NULL')
        {
            alert("NOT FOUND\n");
            return;
        }

        if(temp.children[0].name === 'NULL')
            this.transplant(temp, temp.children[1], tree);
        else if(temp.children[1].name === 'NULL')
            this.transplant(temp, temp.children[0], tree);
        else
        {
            let v = temp.children[0];
            while(v.name != 'NULL' && v.children[1].name != 'NULL')
                v = v.children[1];

            if(v.parent != temp)
            {
                this.transplant(v, v.children[0], tree);
                v.children[0] = temp.children[0];
                v.children[0].parent = v;
            }
            this.transplant(temp, v, tree);
            v.children[1] = temp.children[1];
            v.children[1].parent = v;
        }
        console.log(tree);
        this.setState({tree: tree});
    }

    render()
    {
        return(
            <div style={{width: '50em', height: '20em'}}>
            <form onSubmit={this.submitInsertHandler}>
                <input type='text' onChange={this.changeInsertHandler}/>
                <input type='submit' value='Insert'/>
            </form>
            <form onSubmit={this.submitSearchHandler}>
                <input type='text' onChange={this.changeSearchHandler}/>
                <input type='submit' value='Search'/>
            </form>
            <form onSubmit={this.submitDeleteHandler}>
                <input type='text' onChange={this.changeDeleteHandler}/>
                <input type='submit' value='Delete'/>
            </form>
                <Tree data={this.state.tree}></Tree>
            </div>
        );

    }
};