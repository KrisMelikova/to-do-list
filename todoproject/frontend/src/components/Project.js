import React from 'react';
import {Link} from 'react-router-dom'

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.title}
            </td>
            <td>
                {project.project_link}
            </td>
            <td><button onClick={()=> deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <table>
            <th>
                Title
            </th>
            <th>
                Link
            </th>
            <th></th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}

            <Link to='/project/create'>Create</Link>
        </table>
    )
}

export default ProjectList