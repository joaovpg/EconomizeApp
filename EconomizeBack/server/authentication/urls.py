from django.urls import path
from .views import CreateUserView, LoginView, LogoutAPIView, VerifyEmail, UserDetailView, ChangePasswordView, RequestResetPasswordView, PasswordTokenCheckAPI, SetNewPasswordAPIView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('create-user/', CreateUserView.as_view(), name="create-user"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', LogoutAPIView.as_view(), name="logout"),
    path('user/<int:id>', UserDetailView.as_view()),
    path('change-password/<int:id>', ChangePasswordView.as_view()),
    path('request-reset-email', RequestResetPasswordView.as_view()),
    path('password-reset/<uidb64>/<token>/',
         PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view()),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh')
]
