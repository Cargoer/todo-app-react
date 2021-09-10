import Airtable from 'airtable'
import todoListStore from '../store/todolist'

var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appSszMoXtHrRBupD');
var table = base('todolist-test')

var todoAirtable = {}

todoAirtable.initTodos = () => {
    console.log("---------- initTodos work -----------")
    table
    .select({view: 'Grid view',})
    .firstPage((err, records) => {
        console.log("firstPage worked!")
        if(err) {
            console.log("initTodosErr: ", err)
            return
        }
        todoListStore.todos = records.map(item => item.fields)
    })
}

// insert
todoAirtable.insertTodo = (todo) => {
    table.create(todo, (err, record) => {
        if(err) {
            console.log("createErr: ", err);
            return
        }
        // 获取插入操作产生的唯一id
        var record_id = record.getId()

        // 把新的todo项加上id
        todo.id = record_id

        // 更新airtable里的id
        table.update(record_id, {
            "id": record_id
        }, (err, record) => {
            err && console.log("updateIdErr: ", err)
        })
    })
    return todo
}

// update
todoAirtable.updateTodo = (id, data) => {
    table.update(id, data, (err, record) => {
        err && console.log("updateErr: ", err)
    })
}

// delete
todoAirtable.deleteTodo = (idArray) => {
    table.destroy(idArray, (err) => {
        err && console.log("deleteErr: ", err)
    })
}

export default todoAirtable