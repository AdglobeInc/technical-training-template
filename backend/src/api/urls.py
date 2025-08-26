from django.urls import path

from .views import LoginView, LogoutView, GetUserView, RegisterView


urlpatterns = [
    path("auth/users/", RegisterView.as_view(), name="register"),
    path("auth/user/", GetUserView.as_view(), name="get_user"),
    path("auth/login/", LoginView.as_view(), name="token_obtain_pair"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
]
