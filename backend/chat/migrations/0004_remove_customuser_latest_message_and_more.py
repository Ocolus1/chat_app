# Generated by Django 4.0.4 on 2022-05-27 18:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_customuser_latest_message_customuser_timestamp'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='latest_message',
        ),
        migrations.RemoveField(
            model_name='customuser',
            name='timestamp',
        ),
    ]
