from rest_framework import viewsets, mixins

from userapp.serializers import PortalUserModelSerializerVersion2
from users.models import PortalUser
from users.serializers import PortalUserModelSerializer


class PortalUserModelViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = PortalUser.objects.all()

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return PortalUserModelSerializerVersion2
        return PortalUserModelSerializer
