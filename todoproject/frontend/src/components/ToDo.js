import React from 'react';
import {Link} from 'react-router-dom'

const ToDoItem = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_by}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                <button onClick={()=> deleteToDo(todo.id)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Text
            </th>
            <th>
                Created by
            </th>
            <th>
                Created at
            </th>
            <th>
                Updated at
            </th>
            {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}

            <Link to='/todo/create'>Create</Link>
        </table>
    )
}

export default ToDoList