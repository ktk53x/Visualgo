import React, {Component} from 'react';

import './Node.css';

export default class Node extends Component{
    constructor(props)
    {
        super(props)
        this.state = {node: {}};
    }
    static getDerivedStateFromProps(props, state)
    {
        return {node: props.node};
    }
    componentDidMount()
    {
        const node = this.props.node;
        this.setState({node});
    }
    render()
    {
        const node = this.state.node;
        const src = node.src;
        const dst = node.dst;
        const visited = node.visited;
        const blocked = node.blocked;

        let src_dst_block = '';
        if(blocked === true)
            src_dst_block = 'node-blocked'
        if(visited === true)
            src_dst_block = 'node-visited'
        if(dst === true)
            src_dst_block = 'node-finish'
        if(src === true)
            src_dst_block = 'node-start'

        const row = node.row;
        const col = node.col;
        
        return <div id={`node ${row} ${col}`} className={`node ${src_dst_block}`} onMouseDown={node.mouse_down}></div>;
    }
}