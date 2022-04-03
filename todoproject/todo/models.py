from django.db import models

from users.models import PortalUser


class Project(models.Model):
    title = models.CharField(verbose_name='title', max_length=200)
    project_link = models.URLField(max_length=300)
    users = models.ManyToManyField(PortalUser)

    def __str__(self):
        return self.title


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='projects')
    text = models.TextField(verbose_name='to-do text')
    created_by = models.ForeignKey(PortalUser, on_delete=models.CASCADE, related_name='portal_users')
    created_at = models.DateTimeField(verbose_name='created', auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name='updated', auto_now_add=True)
    active = models.BooleanField(verbose_name='status', default=True)

    def __str__(self):
        return self.project, self.created_by
