# Generated by Django 5.0.7 on 2024-08-16 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_remove_collection_work'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='work',
            field=models.ManyToManyField(blank=True, default=list, to='api.work'),
        ),
    ]
