
import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_asgi_application()


from channels.routing import ProtocolTypeRouter, URLRouter
from .channelsmiddleware import TokenAuthMiddlewareStack
# from channels.auth import AuthMiddlewareStack
from chat import routing as core_routing

application = ProtocolTypeRouter({
	# Django's ASGI application to handle traditional HTTP requests
    # "http": django_asgi_app,
    "websocket": TokenAuthMiddlewareStack(
        URLRouter(
            core_routing.websocket_urlpatterns
        )
    ),
})