import React from 'react'
import style from './index.module.scss'
import classnames from 'classnames/bind'
import todoListStore from '../../../../store/todolist'

const cls = classnames.bind(style)

export default class TodoItem extends React.Component {
    showDetail() {}
    switchCompleteStatus() {
        console.log(this)
    }
    switchChosenStatus() {
        console.log(this.checkboxRef)
        if(this.checkboxRef.checked) {
            console.log("checked!")
            todoListStore.removeList.push(this.props.todo.id)
            console.log(todoListStore.removeList.indexOf(this.props.todo.id) !== -1)
        } else {
            todoListStore.removeList = todoListStore.removeList.filter(removeTodo => removeTodo.id !== this.props.todo.id)
        }
    }
    render() {
        // const todo = this.props?.todo
        return (
            <div className={cls("todo-item", `${this.props.todo.isDone? 'done-item': ''}`)} onClick={this.showDetail}>
                {/* checkbox */}
                {!todoListStore.multiRemove?(
                    <div className={cls("complete-check")} onClick={()=>{todoListStore.switchCompleteStatus(this.props.todo.id)}}></div>
                ):(
                    <input 
                        type="checkbox" 
                        onChange={this.switchChosenStatus.bind(this)} 
                        ref={(el) => this.checkboxRef = el}
                        checked={todoListStore.removeList.indexOf(this.props.todo.id) !== -1}
                    />
                )
                }
                {/* todo content */}
                <div className={cls("content")}>{this.props.todo?.content}</div>
                {/* todo remove */}
                <div className={cls("remove")} onClick={()=>{todoListStore.removeTodoItem(this.props.todo.id)}}>×</div>
                {/* time info */}
                <div className={cls("time-info")}>
                    <div className={cls("create-time")}>创建于 {this.props.todo?.createTime}</div>
                    {this.props.todo.finishTime && 
                        <div className={cls("finish-time")}>
                            {this.props.todo.createTime === this.props.todo.finishTime? "当日完成": "完成于"+this.props.todo?.finishTime}
                        </div>
                    }
                </div>
                {/* detail popup */}
                <div className={cls("detailPopup")}></div>
            </div>
        )
    }
}