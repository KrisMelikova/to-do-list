import graphene
from graphene_django import DjangoObjectType

from todo.models import Project, ToDo
from users.models import PortalUser


class Query1(graphene.ObjectType):
    hello = graphene.String(default_value="Hello alien!")


schema = graphene.Schema(query=Query1)


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class PortalUserType(DjangoObjectType):
    class Meta:
        model = PortalUser
        fields = '__all__'


class Query(graphene.ObjectType):
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)
    all_users = graphene.List(PortalUserType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_users(root, info):
        return PortalUser.objects.all()


schema = graphene.Schema(query=Query)
