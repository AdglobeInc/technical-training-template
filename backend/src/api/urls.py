from django.urls import path

from .views import GetUserIdView, LoginView, LogoutView

urlpatterns = [
    path("auth/user/id", GetUserIdView.as_view(), name="get_user_id"),
    path("auth/login/", LoginView.as_view(), name="token_obtain_pair"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
]
