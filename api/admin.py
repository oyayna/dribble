from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *
from .forms import WorkForm

class CustomUserAdmin(UserAdmin):

    model = Users
    fieldsets = (
        ('Personal info', {'fields': ('email', 'password')}),
        (None, {'fields': ('username', 'reset_password_token', 'reset_password_expire')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )
    list_display = ('username', 'id', 'email', 'is_active', 'is_staff', 'is_superuser',)
    list_filter = ('is_active', 'is_staff', 'is_superuser',)
    search_fields = ('email', 'username',)
    ordering = ('-id','is_active',)

class ProfileAdmin(admin.ModelAdmin) :

    readonly_fields = ('id',)
    list_display = ('user', 'verified', 'is_pro', 'agencies_only',)
    list_filter = ('verified', 'is_pro', 'agencies_only',)
    search_fields = ('user', 'location', 'position',)

class WorkAvailabilityAdmin(admin.ModelAdmin) :

    readonly_fields = ('id',)
    list_filter = ('work_type', 'remote_preference', 'visa_status', 'experience_level', 'salary_range',)
    search_fields = ('profile', 'minimum_fixed_price_budget', 'minimum_hourly_rate', 'minimum_hours_for_contract',)

class WorkHistoryAdmin(admin.ModelAdmin) :

    readonly_fields = ('id',)
    list_display = ('profile', 'id',)
    search_fields = ('profile', 'company', 'year', 'present',)

class EducationAdmin(admin.ModelAdmin) :

    readonly_fields = ('id',)
    list_display = ('profile', 'id',)
    search_fields = ('profile', 'degree', 'institution', 'year',)

class SpecialtyAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('profile', 'specialties', 'years_of_experience',)
    list_filter = ('profile', 'specialties', 'years_of_experience',)

class SkillAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    search_fields = ('profile', 'skills',)

class WorkAdmin(admin.ModelAdmin) :
    form = WorkForm
    readonly_fields = ('id','created_at', 'updated_at',)
    list_display = ('title',)
    list_filter = ('looking_for_feedback', 'in_draft',)
    search_fields = ('profile', 'title', 'tags', 'color',)
    # filter_vertical = ('related_work_group',)
    filter_horizontal = ('related_work_group',)

class WorkMediaAdmin(admin.ModelAdmin) :
    readonly_fields = ('id', 'uid',)
    list_display = ('id',)

class GalleryAdmin(admin.ModelAdmin) :
    readonly_fields = ('id', 'uid',)
    list_display = ('id',)

class CollectionAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('id', 'title',)
    search_fields = ('profile', 'title',)
    filter_horizontal = ('work',)

class LikeAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('id',)
    search_fields = ('profile', 'work',)

class ViewAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('id',)
    search_fields = ('profile', 'work',)

class ShareAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('id',)
    search_fields = ('profile', 'work',)

class FollowAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('id',)

class CommentAdmin(admin.ModelAdmin) :
    readonly_fields = ('id','created_at', 'updated_at',)
    list_display = ('id',)

class BookmarkedAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('id',)

class DesignRequestAdmin(admin.ModelAdmin) :
    readonly_fields = ('id', 'uid', 'create_at',)
    list_display = ('id',)

class ChatMessageAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('id',)

class CompanyAdmin(admin.ModelAdmin) :

    readonly_fields = ('id',)
    list_display = ('name',)
    search_fields = ('name', 'website',)

class JobAdmin(admin.ModelAdmin) :

    readonly_fields = ('id','created_at', 'updated_at',)
    list_display = ('title', 'location', 'company')
    list_filter = ('workplace_type', 'designer_type', 'employment_type')
    search_fields = ('title', 'location', 'company')

class BlockAdmin(admin.ModelAdmin) :
    readonly_fields = ('id',)
    list_display = ('id',)

class ReportAdmin(admin.ModelAdmin) :
    readonly_fields = ('id','created_at',)
    list_display = ('id',)

admin.site.register(Users, CustomUserAdmin)
admin.site.register(Profile, ProfileAdmin)
admin.site.register(WorkAvailability, WorkAvailabilityAdmin)
admin.site.register(WorkHistory, WorkHistoryAdmin)
admin.site.register(Education, EducationAdmin)
admin.site.register(Specialty, SpecialtyAdmin)
admin.site.register(Skill, SkillAdmin)
admin.site.register(Work, WorkAdmin)
admin.site.register(WorkMedia, WorkMediaAdmin)
admin.site.register(Gallery, GalleryAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Like, LikeAdmin)
admin.site.register(View, ViewAdmin)
admin.site.register(Share, ShareAdmin)
admin.site.register(Follow, FollowAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Bookmarked, BookmarkedAdmin)
admin.site.register(DesignRequest, DesignRequestAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Job, JobAdmin)
admin.site.register(Block, BlockAdmin)
admin.site.register(Report, ReportAdmin)
# list_editable
