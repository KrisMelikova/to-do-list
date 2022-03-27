from rest_framework import serializers

from todo.models import Project, ToDo
from users.serializers import PortalUserModelSerializer


class ProjectSerializer(serializers.ModelSerializer):
    users = PortalUserModelSerializer()

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    created_by = PortalUserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
