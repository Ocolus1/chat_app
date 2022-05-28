from django.shortcuts import render
from django.conf import settings

def activation(request, uid, token):
    api_url = settings.REACT_APP_API_URL
    content = { "activation_url" : api_url, "uid": uid, "token": token}
    return render(request, "chat/activation.html", content)

def password_reset(request, uid, token):
    api_url = settings.REACT_APP_API_URL
    content = { "activation_url" : api_url, "uid": uid, "token": token}
    return render(request, "chat/password_reset.html", content)

def username_reset(request):
    api_url = settings.REACT_APP_API_URL
    content = { "activation_url" : api_url }
    return render(request, "chat/username_reset.html", content)

