from django import forms
from .models import Work

class WorkForm(forms.ModelForm):
    class Meta:
        model = Work
        fields = '__all__'

    def clean_related_work_group(self):
        related_work_group = self.cleaned_data.get('related_work_group')
        if self.instance.pk and self.instance.pk in related_work_group.values_list('pk', flat=True):
            raise forms.ValidationError("A work cannot be related to itself.")
        return related_work_group
