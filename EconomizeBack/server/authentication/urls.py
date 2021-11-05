from django.urls import path
from .views import CreateUserView, VerifyEmail

urlpatterns = [
    path('create-user/', CreateUserView.as_view(), name="create-user"),
    path('email-verify/', VerifyEmail.as_view(), name="email-verify")
]
