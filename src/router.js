import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom';
import todoList from './pages/todoList'

const Routes = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={todoList} />
            <Route exact path="/todolist" component={todoList} />
        </Switch>
    </HashRouter>
)

export default Routes