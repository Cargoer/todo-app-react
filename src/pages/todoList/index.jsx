import React from 'react'
import TodoInput from './component/todoInput'
import TodoItemList from './component/todoItemList'
import DateTime from '../../components/dateTime'
import style from './index.module.scss'
import classnames from 'classnames/bind'

const cls = classnames.bind(style);

export default class TodoList extends React.Component {
    render() {
        return (
            <div>
                <div className={cls("header")}>
                    <h1>待办事项</h1>
                    <DateTime />
                </div>
                <TodoInput />
                <TodoItemList />
            </div>
        )
    }
}