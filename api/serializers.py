from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from .models import *
from taggit.serializers import TagListSerializerField
from django.db.models import Count

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']
         
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "Passwords do not match. Please ensure both password fields are identical."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        try :
            user = User.objects.create_user(
                username=validated_data['username'],
                email=validated_data['email'],
                password=validated_data['password']
            )
        except Exception :
            raise serializers.ValidationError({"error": "An internal server error occurred. Try again later."})
        return   user

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=255)

class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_new_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):

        try :
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError({"error": "Email not found. Please provide a registered email address."})
        
        if ((not user.reset_password_token) or (user.reset_password_token != data["token"]) or (user.reset_password_expire < timezone.now())) :
            raise serializers.ValidationError({"error": "Password reset link is invalid or expired. Please request a new one."})
        
        if (user.check_password(data['new_password'])) :
            raise serializers.ValidationError({"new_password": "The new password cannot be the same as the old password. Please choose a different password."})
        
        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError({"confirm_new_password": "Passwords do not match. Please ensure both password fields are identical."})
        
        return data

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = '__all__'

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    confirm_new_password = serializers.CharField(required=True)

    def validate(self, data):

        user = self.context['request'].user
        if not user.check_password(data['old_password']):
            raise serializers.ValidationError({"old_password": "Old password is incorrect."})

        if data['new_password'] != data['confirm_new_password']:
            raise serializers.ValidationError({"confirm_new_password": "Passwords do not match. Please ensure both password fields are identical."})

        return data

class WorkAvailabilitySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WorkAvailability
        fields = '__all__'

class WorkHistorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = WorkHistory
        fields = '__all__'

    def validate(self, data):
        position = data.get('position')
        company = data.get('company')
        profile = self.context.get('profile', None) or data.get('profile')
        instance = self.instance

        if instance :
            if WorkHistory.objects.exclude(pk=instance.pk).filter(profile=profile, position=position, company=company).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile, position, and company must be unique."
                })
        else :
            if WorkHistory.objects.filter(profile=profile, position=position, company=company).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile, position, and company must be unique."
                })

        return data

class EducationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Education
        fields = '__all__'

    def validate(self, data):
        degree = data.get('degree')
        institution = data.get('institution')
        profile = self.context.get('profile', None) or data.get('profile')
        instance = self.instance

        if instance :
            if Education.objects.exclude(pk=instance.pk).filter(profile=profile, degree=degree, institution=institution).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile, degree, and institution must be unique."
                })
        else :
            if Education.objects.filter(profile=profile, degree=degree, institution=institution).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile, degree, and institution must be unique."
                })

        return data

class SpecialtySerializer(serializers.ModelSerializer):

    class Meta:
        model = Specialty
        fields = '__all__'

    def validate(self, data):
        specialties = data.get('specialties')
        profile = self.context.get('profile', None) or data.get('profile')
        instance = self.instance

        if instance :
            if Specialty.objects.exclude(pk=instance.pk).filter(profile=profile, specialties=specialties).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile, specialties, and years_of_experience must be unique."
                })
        else :
            if Specialty.objects.filter(profile=profile, specialties=specialties).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile, specialties, and years_of_experience must be unique."
                })
        

        return data

class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skill
        fields = '__all__'

    def validate(self, data):
        skills = data.get('skills')
        profile = self.context.get('profile', None) or data.get('profile')
        instance = self.instance

        if instance :
            if Skill.objects.exclude(pk=instance.pk).filter(profile=profile, skills=skills).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile and skills must be unique."
                })
        else :
            if Skill.objects.filter(profile=profile, skills=skills).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile and skills must be unique."
                })

        return data

class WorkSerializer(serializers.ModelSerializer):

    class Meta:
        model = Work
        fields = '__all__'

    def validate(self, data):

        title = data.get('title')
        profile = self.context.get('profile', None) or data.get('profile')
        instance = self.instance

        if instance :
            if Work.objects.exclude(pk=instance.pk).filter(profile=profile, title=title).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile and title must be unique."
                })
        else :
            if Work.objects.filter(profile=profile, title=title).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile and title must be unique."
                })
            
        # Validate related_work_group does not contain self
        related_work_group = data.get('related_work_group', [])
        related_work_ids = [work.pk for work in related_work_group]
        if instance and instance.pk in related_work_ids:
            raise serializers.ValidationError({
                "error": "Work cannot be related to itself."
            })

        return data

    def to_representation(self, instance):

        representation = super().to_representation(instance)

        tags = representation.get('tags', [])
        if tags:
            representation['tags'] = [tag.replace('%20', ' ') for tag in tags]

        return representation

class WorkMediaSerializer(serializers.ModelSerializer):

    class Meta:
        model = WorkMedia
        fields = '__all__'
    
    def validate(self, data):
        text = data.get('text')
        image = data.get('image')
        video = data.get('video')

        if not any([text, image, video]):
            raise serializers.ValidationError({"error": "At least one of the fields 'text', 'image', or 'video' must be provided."})
        
        return data

class GallerySerializer(serializers.ModelSerializer):

    class Meta:
        model = Gallery
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Collection
        fields = '__all__'

    def validate(self, data):
        instance = self.instance
        profile = self.context.get('profile', None) or data.get('profile')
        title = data.get('title', None)

        if instance:
            if Collection.objects.exclude(pk=instance.pk).filter(profile=profile, title=title).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile and title must be unique."
                })
        else:
            if Collection.objects.filter(profile=profile, title=title).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile and title must be unique."
                })

        return data

    def create(self, validated_data):
        collection = Collection.objects.create(**validated_data)
        return collection

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        
        instance.save()
        return instance

class LikeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Like
        fields = '__all__'

class ViewSerializer(serializers.ModelSerializer):

    class Meta:
        model = View
        fields = '__all__'

class ShareSerializer(serializers.ModelSerializer):

    class Meta:
        model = Share
        fields = '__all__'

class FollowSerializer(serializers.ModelSerializer):

    class Meta:
        model = Follow
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        return Comment.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance

class BookmarkedSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bookmarked
        fields = '__all__'

class DesignRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = DesignRequest
        fields = '__all__'
    
    def validate(self, data):
        sender = self.context.get('sender', None) or data.get('sender')
        receiver = data.get('receiver')
        instance = self.instance

        if instance :
            if DesignRequest.objects.exclude(pk=instance.pk).filter(sender=sender, receiver=receiver).exists():
                raise serializers.ValidationError({
                    "error": "The combination of sender and receiver must be unique."
                })
        else :
            if DesignRequest.objects.filter(sender=sender, receiver=receiver).exists():
                raise serializers.ValidationError({
                    "error": "The combination of sender and receiver must be unique."
                })

        return data

class ChatMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChatMessage
        fields = '__all__'

class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Block
        fields = '__all__'

    def validate(self, data):
        blocker = data.get('blocker')
        blocked = data.get('blocked')
        instance = self.instance

        if instance :
            if Block.objects.exclude(pk=instance.pk).filter(blocker=blocker, blocked=blocked).exists():
                raise serializers.ValidationError({
                    "error": "The combination of blocker and blocked must be unique."
                })
        else :
            if Block.objects.filter(blocker=blocker, blocked=blocked).exists():
                raise serializers.ValidationError({
                    "error": "The combination of blocker and blocked must be unique."
                })

        return data

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = '__all__'

    def validate(self, data):
        title = data.get('title')
        profile = self.context.get('profile', None) or data.get('profile')
        instance = self.instance

        if instance :
            if Job.objects.exclude(pk=instance.pk).filter(profile=profile, title=title).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile and title must be unique."
                })
        else :
            if Job.objects.filter(profile=profile, title=title).exists():
                raise serializers.ValidationError({
                    "error": "The combination of profile and title must be unique."
                })

        return data

class CompanyProfileSerializer(ProfileSerializer):
    company = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), 
        required=False, 
        allow_null=True
    )

class CompanyDataProfileSerializer(ProfileSerializer):

    company_data = CompanySerializer(required=False)

    def update(self, instance, validated_data):
        company_data = validated_data.pop('company_data', None)
        if company_data:
            company_name = company_data.get('name')
            
            if instance.company:
                existing_company = Company.objects.filter(name=company_name).exclude(id=instance.company.pk).first()
                if existing_company:
                   if instance.company.created_by == instance :
                        instance.company.delete()
                   instance.company = existing_company
                   return super().update(instance, validated_data)

                else :
                    if instance.company.created_by == instance :
                        company = instance.company
                        company.name = company_data.get('name', company.name)
                        company.website = company_data.get('website', company.website)
                        company.logo = company_data.get('logo', company.logo)
                        company.save()
                        return super().update(instance, validated_data)
            
            company, created = Company.objects.get_or_create(
                name=company_data.get('name'),
                defaults={
                    'created_by': instance,
                    'website': company_data.get('website'),
                    'logo': company_data.get('logo')
                }
            )
            instance.company = company
            
        return super().update(instance, validated_data)

class CompanyJobSerializer(JobSerializer):
    company = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), 
        required=False, 
        allow_null=True
    )

class CompanyDataJobSerializer(JobSerializer):
    company_data = CompanySerializer(required=False)

    def create(self, validated_data):
        company_data = validated_data.pop('company_data', None)
        if company_data:
            company, created = Company.objects.get_or_create(
                name=company_data.get('name'),
                defaults={
                    'created_by': validated_data['profile'],
                    'website': company_data.get('website'),
                    'logo': company_data.get('logo')
                }
            )
            validated_data['company'] = company
        
        return Job.objects.create(**validated_data)

    def update(self, instance, validated_data):

        company_data = validated_data.pop('company_data', None)
        if company_data:
            company_name = company_data.get('name')
            
            if instance.company:
                existing_company = Company.objects.filter(name=company_name).exclude(id=instance.company.id).first()
                if existing_company:
                   if instance.company.created_by == instance.profile :
                        instance.company.delete()
                   instance.company = existing_company
                   return super().update(instance, validated_data)

                else :
                    if instance.company.created_by == instance.profile :
                        company = instance.company
                        company.name = company_data.get('name', company.name)
                        company.website = company_data.get('website', company.website)
                        company.logo = company_data.get('logo', company.logo)
                        company.save()
                        return super().update(instance, validated_data)
            
            company, created = Company.objects.get_or_create(
                name=company_data.get('name'),
                defaults={
                    'created_by': instance.profile,
                    'website': company_data.get('website'),
                    'logo': company_data.get('logo')
                }
            )
            instance.company = company
            
        return super().update(instance, validated_data)

####################################################################

class CurrentProfileSerializer(ProfileSerializer):
    company = CompanySerializer()

class WorkMGSerializer(WorkSerializer):

    tags = TagListSerializerField(required=False)
    work_medias = WorkMediaSerializer(many=True, required=False)
    galleries = GallerySerializer(many=True, required=False)

    def create(self, validated_data):
        work_medias_data = validated_data.pop('work_medias', [])
        galleries_data = validated_data.pop('galleries', [])
        tags = validated_data.pop('tags', None)
        related_work_group = validated_data.pop('related_work_group', None)

        work = Work.objects.create(**validated_data)

        if tags is not None:
            work.tags.set(tags)

        if related_work_group is not None:
            work.related_work_group.set(related_work_group)
        
        if work_medias_data :
            for work_media_data in work_medias_data:
                WorkMedia.objects.create(work=work, **work_media_data)
        
        if galleries_data :
            for gallerie_data in galleries_data:
                Gallery.objects.create(work=work, **gallerie_data)

        return work

    def update(self, instance, validated_data):
        work_medias_data = validated_data.pop('work_medias', [])
        galleries_data = validated_data.pop('galleries', [])
        tags = validated_data.pop('tags', None)
        related_work_group = validated_data.pop('related_work_group', None)
        instance = super().update(instance, validated_data)

        if tags is not None:
            instance.tags.set(tags)

        if related_work_group is not None:
            instance.related_work_group.set(related_work_group)
        
        work_medias_data = self.context["data"].get('work_medias')

        if work_medias_data:
            for work_media_data in work_medias_data:
                media_uid = work_media_data.get('uid')
                if media_uid:
                    try:
                        work_media_instance = WorkMedia.objects.get(uid=media_uid, work=instance)
                        work_media_instance.text = work_media_data.get('text', work_media_instance.text)
                        work_media_instance.image = work_media_data.get('image', work_media_instance.image)
                        work_media_instance.video = work_media_data.get('video', work_media_instance.video)
                        work_media_instance.save()
                    except :
                        continue
                else:
                    WorkMedia.objects.create(work=instance, **work_media_data)
        
        galleries_data = self.context["data"].get('galleries')

        if galleries_data :
            for gallery_data in galleries_data:
                gallery_uid = gallery_data.get('uid')
                if gallery_uid:
                    try:
                        gallery_instance = Gallery.objects.get(uid=gallery_uid, work=instance)
                        gallery_instance.image = gallery_data.get('image', gallery_instance.image)
                        gallery_instance.save()
                    except :
                        continue
                else:
                    Gallery.objects.create(work=instance, **gallery_data)

        return instance

class WorkMSerializer(WorkSerializer):
    work_medias = WorkMediaSerializer(many=True)

class GetUserWorks(WorkSerializer):
    work_medias = WorkMediaSerializer(many=True)
    total_views = serializers.CharField()
    total_comments = serializers.CharField()

class GetUserCollections(CollectionSerializer):
    work = GetUserWorks(many=True)

class ProfileAboutSerializer(ProfileSerializer):
    workavailability = WorkAvailabilitySerializer()
    work_histories = WorkHistorySerializer(many=True)
    educations = EducationSerializer(many=True)
    specialty = SpecialtySerializer(many=True)
    skill = SkillSerializer(many=True)
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    tags_count = serializers.SerializerMethodField()

    def get_followers_count(self, obj):
        return Follow.objects.filter(following=obj).count()

    def get_following_count(self, obj):
        return Follow.objects.filter(follower=obj).count()
    
    def get_tags_count(self, obj):
        return Work.objects.filter(profile=obj).aggregate(total_tags=Count('tags'))['total_tags'] or 0

class OtherProfileSerializer(ProfileSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    total_likes = serializers.SerializerMethodField()

    def get_followers_count(self, obj):
        return Follow.objects.filter(following=obj).count()

    def get_following_count(self, obj):
        return Follow.objects.filter(follower=obj).count()
    
    def get_total_likes(self, obj):
        return Like.objects.filter(work__profile=obj).count()

class OtherProfileAboutSerializer(ProfileSerializer):
    workavailability = WorkAvailabilitySerializer()
    work_histories = WorkHistorySerializer(many=True)
    educations = EducationSerializer(many=True)
    specialty = SpecialtySerializer(many=True)
    skill = SkillSerializer(many=True)
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    total_likes = serializers.SerializerMethodField()
    tags_count = serializers.SerializerMethodField()

    def get_followers_count(self, obj):
        return Follow.objects.filter(following=obj).count()

    def get_following_count(self, obj):
        return Follow.objects.filter(follower=obj).count()
    
    def get_total_likes(self, obj):
        return Like.objects.filter(work__profile=obj).count()
    
    def get_tags_count(self, obj):
        return Work.objects.filter(profile=obj).aggregate(total_tags=Count('tags'))['total_tags'] or 0

class ProfileWSerializer(ProfileSerializer):
    latest_works = serializers.SerializerMethodField()

    def get_latest_works(self, obj):
        latest_works = Work.objects.filter(profile=obj).order_by('-created_at')[:5]
        return WorkMSerializer(latest_works, many=True).data

class ProfileWV2Serializer(ProfileSerializer):
    latest_works = serializers.SerializerMethodField()

    def get_latest_works(self, obj):
        latest_works = Work.objects.filter(profile=obj).order_by('-created_at')[:3]
        return WorkMSerializer(latest_works, many=True).data

class GetWorkSerializer(WorkSerializer):

    work_medias = WorkMediaSerializer(many=True, required=False)
    total_likes = serializers.CharField(required=False)
    total_views = serializers.CharField(required=False)

class WorkDetailSerializer(WorkSerializer):
    work_medias = WorkMediaSerializer(many=True)
    galleries = GallerySerializer(many=True)
    related_work_group = serializers.SerializerMethodField()
    comments_count = serializers.IntegerField(source='comments.count')
    recommended_works = serializers.SerializerMethodField()

    def get_related_work_group(self, obj):
        related_works = obj.related_work_group.all()
        return WorkMSerializer(related_works, many=True).data
    
    def get_recommended_works(self, obj):
        recommended_works = Work.objects.filter(tags__in=obj.tags.all()).exclude(profile=obj.profile).distinct()[:5]
        return WorkMSerializer(recommended_works, many=True).data

class JobProfileSerializer(JobSerializer):
    company = CompanySerializer()

####################################################################
