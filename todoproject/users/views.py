from rest_framework.viewsets import ModelViewSet

from users.models import PortalUser
from users.serializers import PortalUserModelSerializer


class PortalUserModelViewSet(ModelViewSet):
    queryset = PortalUser.objects.all()
    serializer_class = PortalUserModelSerializer
