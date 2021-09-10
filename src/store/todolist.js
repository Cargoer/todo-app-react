import { makeAutoObservable } from 'mobx'
import todoAirtable from '../api/airtable'

class todoListStore {
    constructor() {
        makeAutoObservable(this)
    }
    todos = []
    multiRemove = false
    listmode = 'all'
    removeList = []

    addTodoItem(content) {
        console.log("---------addTodoItem worked!------------")
        if(content) {
            var date = new Date()
            var todo = {
                // id: 'test',
                content: content,
                isDone: false,
                createTime: date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
                finishTime: null,
                detail: ''
            }
            todo = todoAirtable.insertTodo(todo)
            this.todos.unshift(todo)
        }
    }

    removeTodoItem(id) {
        console.log("---------removeTodoItem worked!------------")
        this.todos = this.todos.filter(todo => todo.id !== id)
        todoAirtable.deleteTodo([id])
    }

    switchCompleteStatus(id) {
        console.log("---------switchCompleteStatus worked!---------")
        var complete = null
        this.todos = this.todos.map(todo => {
            todo.id === id && (todo.isDone = !todo.isDone)
            complete = todo.isDone
            return todo
        })
        todoAirtable.updateTodo(id, {isDone: complete})
    }

    initTodos() {
        this.todos = todoAirtable.initTodos()
        console.log("this todos: ", this.todos)
    }
    
}

export default new todoListStore()