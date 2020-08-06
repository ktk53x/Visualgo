import React from 'react';
import { Link } from 'react-router-dom';


const MainPage = () => {
    return (
        <div>
            <h3>Main Page</h3>
            <Link to="/graph">Graph Visualiser</Link>
            <br></br>
            <Link to="/sorting">Sorting Visualiser</Link>
            <br></br>
            <Link to="/rbtree">RBTree Visualiser</Link>
            <br></br>
            <Link to="/trie">Trie Visualiser</Link>
            <br></br>
            <Link to="/bst">BST Visualiser</Link>
            <br></br>
            <Link to="/segmenttree">Segment Tree Visualiser</Link>
        </div>
    )
};

export default MainPage;