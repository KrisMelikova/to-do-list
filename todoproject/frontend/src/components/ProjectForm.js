import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: '', project_link: ''}
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
        this.props.createProject(this.state.title,this.state.project_link)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="title">title</label>
                    <input type="text" className="form-control" name="title" value={this.state.title} onChange={(event)=>this.handleChange(event)} />
                </div>

            <div className="form-group">
                <label for="project_link">project_link</label>
                <input type="link" className="form-control" name="project_link" value={this.state.project_link} onChange={(event)=>this.handleChange(event)} />
            </div>

            <input type="submit" className="btn btn-primary" value="Save project" />
         </form>
        );
    }
}

export default ProjectForm