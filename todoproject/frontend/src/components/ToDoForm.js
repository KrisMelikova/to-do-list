import React from 'react'

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {id: '', text: ''}
    }

    handleChange(event)
    {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
          );
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.id,this.state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="id">id</label>
                    <input type="text" className="form-control" name="id" value={this.state.id} onChange={(event)=>this.handleChange(event)} />
                </div>

            <div className="form-group">
                <label for="text">text</label>
                <input type="link" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
            </div>

            <input type="submit" className="btn btn-primary" value="Save todo" />
         </form>
        );
    }
}

export default ToDoForm