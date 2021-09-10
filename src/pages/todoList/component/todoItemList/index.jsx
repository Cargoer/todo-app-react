import React from 'react'
import style from './index.module.scss'
import classnames from 'classnames/bind'
import { observer } from 'mobx-react'
import todoListStore from '../../../../store/todolist'
import TodoItem from '../todoItem'

const cls = classnames.bind(style);

@observer
class TodoItemList extends React.Component {
    componentWillMount() {
        todoListStore.initTodos()
    }
    switchMultiRemove() {
        todoListStore.multiRemove = !todoListStore.multiRemove
    }
    selectAllItems() {}
    removeMultipleItems() {}
    render() {
        console.log("todoListStore:", todoListStore.todos)
        return (
            <div>
                {/* multi remove */}
                <div className={cls("multi-remove-option")}>
                    {!todoListStore.multiRemove? (
                        <div className={cls("button")} onClick={this.switchMultiRemove}>批量移除</div>
                    ):(
                        <div className={cls("flex-row")}>
                            <div className={cls("button")} onClick={this.switchMultiRemove}>完成</div>
                            <label>
                                <input type="checkbox" onChange={this.selectAllItems}/>全选
                            </label>
                            <div className={cls("button")} onClick={this.removeMultipleItems}>移除</div>
                        </div>
                    )
                    }
                </div>
                {/* list */}
                <div className={cls("list")}>
                    {
                        todoListStore.todos?.map((todo, index) => 
                            <TodoItem key={index} todo={todo} />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default TodoItemList