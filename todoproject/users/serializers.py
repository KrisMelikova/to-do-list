from rest_framework.serializers import HyperlinkedModelSerializer

from users.models import PortalUser


class PortalUserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = PortalUser
        fields = ['first_name', 'last_name', 'email']

