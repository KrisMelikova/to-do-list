from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from todo.models import Project, ToDo
from todo.serializers import ProjectSerializer, ToDoSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        return Project.objects.filter(title__contains='DRF')


class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer
    pagination_class = ToDoLimitOffsetPagination

    def get_queryset(self):
        return ToDo.objects.filter(text__contains='python')

    def perform_destroy(self, instance):
        instance.active = False
        instance.save()
