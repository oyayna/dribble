# Generated by Django 5.0.7 on 2024-08-18 20:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_rename_timestamp_chatmessage_create_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bookmarked',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='bookmarked',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='collection',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='collection',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='follow',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='follow',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='like',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='like',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='share',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='share',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='view',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='view',
            name='updated_at',
        ),
    ]
