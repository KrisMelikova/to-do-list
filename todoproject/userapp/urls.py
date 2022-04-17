from django.urls import path
from .views import PortalUserModelViewSet

app_name = 'userapp'

urlpatterns = [
    path('', PortalUserModelViewSet.as_view({'get': 'list'})),
]
