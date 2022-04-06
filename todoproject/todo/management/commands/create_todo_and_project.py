from django.utils.timezone import now
from mixer.backend.django import mixer
from django.core.management.base import BaseCommand

from todo.models import ToDo, Project
from users.models import PortalUser


class Command(BaseCommand):
    help = 'Command that creates todo and project'

    def handle(self, *args, **kwargs):
        ToDo.objects.all().delete()
        Project.objects.all().delete()

        # for i in range(3):
        #     mixer.blend(ToDo)
        #     mixer.blend(Project)

        user = PortalUser.objects.create_user('Jordan', 'Fish', '1234')

        project = Project.objects.create(
            title='project',
            project_link='http://127.0.0.1:8000/admin/auth/group/hello/'
        )

        todo = ToDo.objects.create(
            project=project,
            text='some text',
            created_by=user,
            created_at=now(),
            updated_at=now(),
            active=True,
        )

        todos_count = ToDo.objects.all().count()
        projects_count = Project.objects.all().count()

        print(f'{todos_count} ToDos and {projects_count} Projects are created!')
