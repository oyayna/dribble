# Generated by Django 5.0.7 on 2024-08-17 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_designrequest_timeline'),
    ]

    operations = [
        migrations.AlterField(
            model_name='report',
            name='reason',
            field=models.TextField(default='', max_length=1000),
            preserve_default=False,
        ),
    ]
