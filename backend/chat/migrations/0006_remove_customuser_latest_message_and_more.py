# Generated by Django 4.0.4 on 2022-05-27 20:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_customuser_latest_message_customuser_timestamp'),
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
