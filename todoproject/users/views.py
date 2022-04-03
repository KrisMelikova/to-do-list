from rest_framework import mixins, viewsets

from users.models import PortalUser
from users.serializers import PortalUserModelSerializer


class PortalUserModelViewSet(
    mixins.ListModelMixin, mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin, viewsets.GenericViewSet,
):
    queryset = PortalUser.objects.all()
    serializer_class = PortalUserModelSerializer
