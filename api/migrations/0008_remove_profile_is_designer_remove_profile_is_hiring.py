# Generated by Django 5.0.7 on 2024-08-16 22:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_remove_profile_primary_skill_profile_banner_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='is_designer',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='is_hiring',
        ),
    ]
