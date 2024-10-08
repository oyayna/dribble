# Generated by Django 5.0.7 on 2024-08-16 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_designrequest_work_alter_comment_content'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='primary_skill',
        ),
        migrations.AddField(
            model_name='profile',
            name='banner',
            field=models.ImageField(blank=True, null=True, upload_to='User_Banner/'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='avatar',
            field=models.ImageField(default='User_Avatar/default-avatar.gif', upload_to='User_Avatar/'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.TextField(blank=True, max_length=2024, null=True),
        ),
    ]
