from django.contrib.admin import ModelAdmin, site
from .models import MessageModel, CustomUser



class MessageModelAdmin(ModelAdmin):
    readonly_fields = ('createdAt',)
    search_fields = ('id', 'body', 'sender__username', 'user__username')
    list_display = ('id', 'sender', 'user', 'createdAt', 'characters')
    list_display_links = ('id',)
    list_filter = ('sender', 'user')
    date_hierarchy = 'createdAt'


site.register(MessageModel, MessageModelAdmin)
site.register(CustomUser)