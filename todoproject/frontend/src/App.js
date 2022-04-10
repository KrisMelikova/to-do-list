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

import Cookies from "universal-cookie";
import LoginForm from "./components/Auth.js";

import {HashRouter, Route, Link, Switch, Redirect} from 'react-router-dom';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/portal-users',{headers}).then(response => {
            this.setState(
                {
                    'users': response.data['results']
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project',{headers}).then(response => {
            this.setState(
                {
                    'projects': response.data['results']
                }
            )
        }).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo',{headers}).then(response => {
            this.setState(
                {
                    'todos': response.data['results']
                }
            )
        }).catch(error => console.log(error))
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token},()=>this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {'username': username, 'password': password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Wrong login or password :('))
    }

      is_auth(){
        return !!this.state.token
    }

     get_headers(){
        let headers = {
            'Content-Type':'applications/json'
        }

        if(this.is_auth()){
          headers['Authorization'] = `Token ${this.state.token}`
        }

        return headers
    }

     logout() {
        this.set_token('')
    }

    get_token_from_cookies(){
        const cookies = new Cookies()
        const token = cookies.get('token')

        this.setState({'token': token},()=>this.load_data())
    }

    componentDidMount() {
     this.get_token_from_cookies()
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
                        <li>
                            {this.is_auth()? <button onClick={()=> this.logout()}>Logout</button>:
                                <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/project' component={() =>  <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todo' component={() => <ToDoList todos={this.state.todos}/>}/>

                    <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>

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
