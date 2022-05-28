from django.shortcuts import get_object_or_404
from .models import MessageModel, CustomUser
from rest_framework.serializers import ModelSerializer, CharField, DateTimeField
from rest_framework import serializers 
from djoser.serializers import UserCreateSerializer


class MessageModelSerializer(ModelSerializer):
    sender = CharField(source='sender.username', read_only=True)
    user = CharField(source='user.username')

    def create(self, validated_data):
        sender = self.context['request'].user
        user = get_object_or_404(
            CustomUser, username=validated_data['user']['username'])
        msg = MessageModel(user=user,
                           text=validated_data['text'],
                           sender=sender)
        msg.save()
        return msg

    class Meta:
        model = MessageModel
        fields = ('id', 'sender', 'user', 'createdAt', 'text')


class UserModelSerializer(ModelSerializer):
    latest_message = serializers.SerializerMethodField()
    timestamp = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', "latest_message", 'timestamp')
        read_only_fields = (
        'latest_message',
        'timestamp',
        )

    def get_latest_message(self, obj):
        try:
            return obj.latest_message
        except:
            return None

    def get_timestamp(self, obj):
        try:
            return obj.timestamp
        except:
            return None
