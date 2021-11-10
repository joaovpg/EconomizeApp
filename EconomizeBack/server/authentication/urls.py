from django.urls import path
from .views import CreateUserView, LoginView, VerifyEmail, UserDetailView, ChangePasswordView

urlpatterns = [
    path('create-user/', CreateUserView.as_view(), name="create-user"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('login/', LoginView.as_view(), name="login"),
    path('user/<int:id>', UserDetailView.as_view()),
    path('change-password/<int:id>', ChangePasswordView.as_view()),
]
