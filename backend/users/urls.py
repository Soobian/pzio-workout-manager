"""
Plik zawiera adresy url dla odpowiednich widoków

"""
from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .models import UserParameters
from .models import CustomUser
from .views import CustomUserCreate, BlacklistTokenUpdateView, UserParametersViewSet



app_name = 'users'

router = routers.DefaultRouter()
router.register('parameters', UserParametersViewSet)

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
    path('', include(router.urls)),
]