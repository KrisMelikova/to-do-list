import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import UserList from './components/User.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/portal-users')
        .then(response => {
            const authors = response.data
                this.setState(
                {
                    'authors': authors
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
            <UserList users={this.state.users} />
            <Footer/>
        </div>
      );
    }
}

export default App;
