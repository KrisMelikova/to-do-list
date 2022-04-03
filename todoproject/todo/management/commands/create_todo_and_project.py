from mixer.backend.django import mixer
from django.core.management.base import BaseCommand

from todo.models import ToDo, Project


class Command(BaseCommand):
    help = 'Command that creates todo and project'

    def handle(self, *args, **kwargs):
        ToDo.objects.all().delete()
        Project.objects.all().delete()

        for i in range(3):
            mixer.blend(ToDo)
            mixer.blend(Project)

        todos_count = ToDo.objects.all().count()
        projects_count = Project.objects.all().count()

        print(f'{todos_count} ToDos and {projects_count} Projects are created!')
