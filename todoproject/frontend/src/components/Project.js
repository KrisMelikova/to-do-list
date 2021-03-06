import React from 'react';

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.title}
            </td>
            <td>
                {project.project_link}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
                Title
            </th>
            <th>
                Link
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectList