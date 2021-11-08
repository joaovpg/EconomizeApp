from django.urls import path
from .views import CreateUserView, LoginView, VerifyEmail, UserDetailView

urlpatterns = [
    path('create-user/', CreateUserView.as_view(), name="create-user"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify"),
    path('login/', LoginView.as_view(), name="login"),
    path('user/<int:id>', UserDetailView.as_view()),
]
