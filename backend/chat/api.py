from django.db.models import Q, Count, OuterRef, Subquery
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny 
from rest_framework.decorators import action
from django.http import JsonResponse

from backend import settings
from .serializers import MessageModelSerializer, UserModelSerializer
from .models import MessageModel, CustomUser


class MessagePagination(PageNumberPagination):
    """
    Limit message prefetch to one page.
    """
    page_size = settings.MESSAGES_TO_LOAD

# py manage.py runserver 192.168.10.102:8000
class MessageModelViewSet(ModelViewSet):
    queryset = MessageModel.objects.all()
    serializer_class = MessageModelSerializer
    allowed_methods = ('GET', 'POST', 'HEAD', 'OPTIONS')
    # authentication_classes = (CsrfExemptSessionAuthentication,)
    pagination_class = MessagePagination
    permission_classes = [IsAuthenticated]

    @action(detail=False)
    def user_messages(self, request):
        message = self.queryset.filter(Q(user=request.user) |
                                             Q(sender=request.user))
        target = self.request.query_params.get('target', None)
        if target is not None:
            message = message.filter(
                Q(user=request.user, sender__username=target) |
                Q(user__username=target, sender=request.user))
        data = []
        if message is not None:
            for i in message:
                user = CustomUser.objects.get(username=i.sender.username)
                v = {
                    "_id": i.id,
                    "createdAt": i.createdAt,
                    "text": i.text,
                    "user": {
                        "_id": user.id,
                        "name": user.username
                    },
                    "reciever": i.user.username,
                    "sender": i.sender.username,
                }
                data.append(v)
        return JsonResponse(data, safe=False)

    def list(self, request, *args, **kwargs):
        self.queryset = self.queryset.filter(Q(user=request.user) |
                                             Q(sender=request.user))
        target = self.request.query_params.get('target', None)
        if target is not None:
            self.queryset = self.queryset.filter(
                Q(user=request.user, sender__username=target) |
                Q(user__username=target, sender=request.user))
        return super().list(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        msg = get_object_or_404(
            self.queryset.filter(Q(user=request.user) |
                                 Q(sender=request.user),
                                 Q(pk=kwargs['pk'])))
        serializer = self.get_serializer(msg)
        return Response(serializer.data)


class UserModelViewSet(ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
    allowed_methods = ('GET', 'HEAD', 'OPTIONS')
    permission_classes = [IsAuthenticated]
    pagination_class = None  # Get all user

    def list(self, request, *args, **kwargs):
        user = request.user
        # Get all users except yourself
        self.queryset = self.queryset.exclude(username="Paul")
        self.queryset = self.queryset.exclude(id=user.id)
        
        # get latest message along with users
        # https://stackoverflow.com/a/62801980/2351696 
        newest = MessageModel.objects.filter(Q(user=user)|Q(sender=user)).filter(
            Q(user_id=OuterRef('pk'))|Q(sender_id=OuterRef('pk'))
        )       
        self.queryset = self.queryset.annotate(
            latest_message=Subquery(newest.values('text').order_by('-createdAt')[:1]),
            timestamp=Subquery(newest.values('createdAt').order_by('-createdAt')[:1]),
        )
        return super().list(request, *args, **kwargs)
