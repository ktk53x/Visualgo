import React from 'react';
import Tree from 'react-d3-tree';
import clone from "clone";


const not_leaf = {
    shapeProps: {
        shape: 'circle',
        r: 30,
        fill: 'white',
    }
};

const is_leaf = {
    shapeProps: {
        shape: 'circle',
        r: 30,
        fill: 'grey',
    }
};



export default class TrieVisualizer extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            insert_val: '',
            search_val: '',
            trie: [{name: '#', nodeSvgShape: is_leaf, children: []}],
        };
    }
    changeInsertHandler = (event) => {
        this.setState({insert_val: event.target.value});
    }

    submitInsertHandler = (event) => {
        event.preventDefault();
        this.insert();
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
        let trie = clone(this.state.trie);
        let s = this.state.search_val;
        let n = s.length;
        let temp = trie[0];
        let flag = true;

        for(let i = 0; i < n; i++)
        {
            let m = temp.children.length;
            let flag1 = false;
            for(let j = 0; j < m; j++)
            {
                if(temp.children[j].name === s[i])
                {
                    temp = temp.children[j];
                    flag1 = true;
                    break;
                }
            }
            if(flag1 === false)
            {
                flag = false;
                break;
            }
        }
        if((flag === true))
        {
            if(temp.nodeSvgShape.shapeProps.fill == is_leaf.shapeProps.fill)
            {
                alert("found");
            }
            else
            {
                alert("not found");
            }
        }
        else
        {
            alert("not found");
        }
        this.setState({trie: trie});

    }

    insert = () => {
        let trie = clone(this.state.trie);
        let s = this.state.insert_val;
        let n = s.length;
        let temp = trie[0];

        for(let i = 0; i < n; i++)
        {
            let m = temp.children.length;
            let flag = false;
            for(let j = 0; j < m; j++)
            {
                if(temp.children[j].name === s[i])
                {
                    temp = temp.children[j];
                    flag = true;
                    break;
                }
            }
            if(flag === false)
            {
                temp.children.push({name: s[i], nodeSvgShape: not_leaf, children: []});
                let temp2 = temp.children[m];
                temp.children.sort(function(a, b) {return a.name < b.name;});
                temp = temp2;
            }
        }
        temp.nodeSvgShape = is_leaf;
        this.setState({trie: trie});
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
                <Tree data={this.state.trie}></Tree>
            </div>
        );

    }
};