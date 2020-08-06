import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';

import MainPage from "./Pages/Index";
import Graph from "./Pages/Graph";
import Sorting from "./Pages/Sorting";
import RBTree from './Pages/RBTree';
import Trie from './Pages/Trie';
import BST from './Pages/BST';
import SegmentTree from './Pages/SegmentTree';

class App extends React.Component 
{
  render()
  {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={MainPage}></Route>
        <Route exact path="/graph" component={Graph}></Route>
        <Route exact path="/sorting" component={Sorting}></Route>
        <Route exact path="/rbtree" component={RBTree}></Route>
        <Route exact path="/trie" component={Trie}></Route>
        <Route exact path="/bst" component={BST}></Route>
        <Route exact path="/segmenttree" component={SegmentTree}></Route>
        </Switch>
      </Router>
  );
  }

}
export default App;
