from django.test import TestCase
from mixer.backend.django import mixer

from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase, APIClient

from todo.models import Project, ToDo
from todo.views import ProjectViewSet

from users.models import PortalUser


class TestProjectViewSet(TestCase):

    def setUp(self) -> None:
        self.title = 'my_drf_project'
        self.project_link = 'http://127.0.0.1:8000/api/'
        self.user = PortalUser.objects.create(
            username='annushka',
            first_name='Anna',
            last_name='Karenina',
            email='anna@mail.ru'
        )
        self.users = self.user

        self.project = Project.objects.create(
            title=self.title,
            project_link=self.project_link,
        )
        self.project.users.add(self.user)

    def test_get_project_list(self):
        factory = APIRequestFactory()
        view = ProjectViewSet.as_view({'get': 'list'})

        request = factory.get('/api/project/')
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_project_401(self):
        factory = APIRequestFactory()
        view = ProjectViewSet.as_view({'post': 'create'})

        request = factory.post('/api/project/', {
            'title': self.title,
            'project_link': self.project_link,
            'users': self.user,
        })
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_project_201(self):
        factory = APIRequestFactory()
        admin = PortalUser.objects.create_superuser(
            'admin',
            'admin@admin.com',
            'admin123456',
        )
        view = ProjectViewSet.as_view({'post': 'create'})

        request = factory.post('/api/project/', {
            'title': self.title,
            'project_link': self.project_link,
            'users': self.user.id,
        })

        force_authenticate(request, admin)
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestToDoViewSet(APITestCase):

    def test_get_todo_list(self):
        response = self.client.get('/api/todo/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_todo_detail(self):
        todo = mixer.blend(ToDo)
        client = APIClient()

        response = client.get(f'/api/todo/{todo.id}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
