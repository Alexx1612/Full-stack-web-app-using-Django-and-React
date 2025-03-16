from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, SimpleQueryView ,ComplexQueryView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/simple-query/<int:query_id>/", SimpleQueryView.as_view(), name="simple-query"),
    path("api/complex-query/<int:query_id>/", ComplexQueryView.as_view(), name="complex-query"),
    path("api/", include("api.urls")),
]