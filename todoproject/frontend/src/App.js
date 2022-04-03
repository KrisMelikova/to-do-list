import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import NotFound404 from './components/NotFound404.js';
import ProjectList from './components/Project.js';
import ToDoList from './components/ToDo.js';
import UserList from './components/User.js';

import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/portal-users')
        .then(response => {
            const users = response.data.results
                this.setState(
                {
                    'users': users
                }
                )
         }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/project')
        .then(response => {
            const projects = response.data.results
                this.setState(
                {
                    'projects': projects
                }
                )
         }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todo')
        .then(response => {
            const todos = response.data.results
                this.setState(
                {
                    'todos': todos
                }
                )
         }).catch(error => console.log(error))
}

//FOR DEBAGGING:
//
//    componentDidMount() {
//        const users = [
//            {
//                'first_name': 'Ivan',
//                'last_name': 'Ivanov',
//                'email': 'ivanov@mail.ru',
//                'date_joined': 2022
//            },
//            {
//                'first_name': 'Petr',
//                'last_name': 'Petrov',
//                'email': 'petrov@mail.ru',
//                'date_joined': 2021
//            }
//        ]
//        this.setState(
//            {
//                'users': users
//            }
//        )
//    }

    render() {
      return (
        <div>
            <Menu/>
            <HashRouter>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Users</Link>
                        </li>
                        <li>
                            <Link to='/project'>Projects</Link>
                        </li>
                        <li>
                            <Link to='/todo'>ToDos</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/project' component={() =>  <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todo' component={() => <ToDoList todos={this.state.todos}/>}/>

                    <Redirect from='/todos' to='/todo' />
                    <Redirect from='/projects' to='/project' />

                    <Route component={NotFound404}/>
                </Switch>
            </HashRouter>
            <Footer/>
        </div>
      );
    }
}

export default App;
