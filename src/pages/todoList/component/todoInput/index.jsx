import React from 'react'
import classnames from 'classnames/bind'
import style from './index.module.scss'
import todoListStore from '../../../../store/todolist'

const cls = classnames.bind(style)

export default class TodoInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {todoInputText: ''}
    }
    
    addTodoItem() {
        if(this.state.todoInputText) {
            todoListStore.addTodoItem(this.state.todoInputText)
            // var date = new Date()
            // todoListStore.todos.unshift({
            //     id: 'test',
            //     content: this.state.todoInputText,
            //     isDone: false,
            //     createTime: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
            //     finishTime: null,
            //     note: ''
            // })
            this.setState({todoInputText: ''})
        }
    }

    handleChange(e) {
        this.setState({
            todoInputText: e.target.value
        })
    }

    handleKeyDown(e) {
        if(e.keyCode === 13) {
            todoListStore.addTodoItem()
        }
    }

    render() {
        return (
            <div className={cls("todo-input")}>
                <div className={cls("input-content")}  onKeyDown={this.handleKeyDown.bind(this)}>
                    <input 
                        type="text" 
                        value={this.state.todoInputText} 
                        maxLength="100"
                        onChange={this.handleChange.bind(this)} 
                    />
                    <button onClick={this.addTodoItem.bind(this)}>+</button>
                </div>
            </div>
        )
    }
}