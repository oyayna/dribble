from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.exceptions import ValidationError
from taggit.managers import TaggableManager
import uuid
from PIL import Image

# نستخدم uid في model في حالة إدا لم يكن أي إرتباط بين profile and model

class Users(AbstractUser):

    email = models.EmailField(unique=True, max_length=200)
    username = models.CharField(unique=True, max_length=100)
    reset_password_token = models.CharField(max_length=100, null=True, blank=True)
    reset_password_expire = models.DateTimeField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class Profile(models.Model):

    user = models.OneToOneField(Users, on_delete=models.CASCADE, related_name='profile')
    avatar = models.ImageField(upload_to='User_Avatar/', default='User_Avatar/default-avatar.gif')
    banner = models.ImageField(upload_to='User_Banner/', null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    bio = models.TextField(max_length=2024, null=True, blank=True)
    position = models.CharField(max_length=255, null=True, blank=True)
    
    personal_website = models.URLField(max_length=255, null=True, blank=True)
    portfolio_url = models.URLField(max_length=255, null=True, blank=True)
    portfolio_password = models.CharField(max_length=255, null=True, blank=True)
    calendly_url = models.URLField(max_length=255, null=True, blank=True)
        
    twitter = models.URLField(max_length=255, null=True, blank=True)
    facebook = models.URLField(max_length=255, null=True, blank=True)
    instagram = models.URLField(max_length=255, null=True, blank=True)
    github = models.URLField(max_length=255, null=True, blank=True)
    creative_market = models.URLField(max_length=255, null=True, blank=True)
    codepen = models.URLField(max_length=255, null=True, blank=True)
    is_team_codepen = models.BooleanField(default=False)
    medium = models.URLField(max_length=255, null=True, blank=True)
    is_publication_medium = models.BooleanField(default=False)
    behance = models.URLField(max_length=255, null=True, blank=True)
    linkedin = models.URLField(max_length=255, null=True, blank=True)
    is_company_linkedin = models.BooleanField(default=False)
    vimeo = models.URLField(max_length=255, null=True, blank=True)
    
    company = models.ForeignKey('Company', null=True, on_delete=models.SET_NULL, related_name='profile')
    
    agencies_only = models.BooleanField(default=False)

    is_pro = models.BooleanField(default=False)
    
    verified = models.BooleanField(default=False)

    MIN_IMAGE_WIDTH = 400
    MIN_IMAGE_HEIGHT = 300
    MAX_IMAGE_SIZE_MB = 5

    def clean(self):
        super().clean()

        url_fields = [
            'personal_website', 'portfolio_url', 'calendly_url', 'twitter',
            'facebook', 'instagram', 'github', 'creative_market', 'codepen',
            'medium', 'behance', 'linkedin', 'vimeo'
        ]

        for field in url_fields:
            url = getattr(self, field)
            if url and not url.startswith('https://'):
                raise ValidationError({field: 'The URL must start with "https://".'})

        image_fields = ['avatar', 'banner']

        for field in image_fields:
            image = getattr(self, field)
            if image:
                if not image.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    raise ValidationError({field: 'Unsupported file type. Please upload a PNG, JPG, JPEG, or GIF image.'})
                
                try:
                    img = Image.open(image)
                    width, height = img.size
                    if width < self.MIN_IMAGE_WIDTH or height < self.MIN_IMAGE_HEIGHT:
                        raise ValidationError({field: f'The image must be at least {self.MIN_IMAGE_WIDTH}x{self.MIN_IMAGE_HEIGHT} pixels.'})
                except Exception as e:
                    raise ValidationError({field: f'Error processing the image: {e}'})
                
                file_size = image.file.size / (1024 * 1024)
                if file_size > self.MAX_IMAGE_SIZE_MB:
                    raise ValidationError({field: f'Image size must not exceed {self.MAX_IMAGE_SIZE_MB} MB.'})

class WorkAvailability(models.Model):

    WORK_CHOICES = [
        ('full_time', 'Full-Time'),
        ('freelance', 'Freelance/Contract'),
    ]

    REMOTE_CHOICES = [
        ('onsite_or_remote', 'Yes'),
        ('remote_only', 'Remote only'),
        ('onsite_only', 'No'),
    ]

    VISA_CHOICES = [
        ('yes', 'Yes'),
        ('no', 'No'),
    ]

    SALARY_CHOICES = [
        ('<50k', '<50k'),
        ('50-60k', '50-60k'),
        ('60-70k', '60-70k'),
        ('70-80k', '70-80k'),
        ('80-90k', '80-90k'),
        ('90-100k', '90-100k'),
        ('100-110k', '100-110k'),
        ('110-120k', '110-120k'),
        ('120-130k', '120-130k'),
        ('130-140k', '130-140k'),
        ('140-150k', '140-150k'),
        ('150-170k', '150-170k'),
        ('170-190k', '170-190k'),
        ('190-220k', '190-220k'),
        ('220-250k', '220-250k'),
        ('>250k', '>250k'),
    ]

    EXPERIENCE_LEVEL = [
        ('Junior', 'Junior'),
        ('Mid-level', 'Mid-level'),
        ('Senior', 'Senior'),
    ]

    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="workavailability")
    work_type = models.CharField(max_length=20, choices=WORK_CHOICES, default='')
    remote_preference = models.CharField(max_length=20, choices=REMOTE_CHOICES, default='')
    visa_status = models.CharField(max_length=3, choices=VISA_CHOICES, default='')
    experience_level = models.CharField(max_length=10, choices=EXPERIENCE_LEVEL, default='')
    salary_range = models.CharField(max_length=20, choices=SALARY_CHOICES, blank=True, null=True)
    minimum_fixed_price_budget = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    minimum_hourly_rate = models.DecimalField(max_digits=20, decimal_places=2, blank=True, null=True)
    minimum_hours_for_contract = models.PositiveIntegerField(blank=True, null=True)

class WorkHistory(models.Model):
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='work_histories')
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    present = models.CharField(max_length=100)

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        if WorkHistory.objects.exclude(pk=self.pk).filter(profile=self.profile, position=self.position, company=self.company).exists():
            raise ValidationError("The combination of profile, position, and company must be unique.")

class Education(models.Model):
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='educations')
    degree = models.CharField(max_length=100)
    institution = models.CharField(max_length=100)
    year = models.CharField(max_length=100)

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        if Education.objects.exclude(pk=self.pk).filter(profile=self.profile, degree=self.degree, institution=self.institution).exists():
            raise ValidationError("The combination of profile, degree, and institution must be unique.")

class Specialty(models.Model):

    SPECIALTIES_TYPE_CHOICES = [
        ('Animation', 'Animation'),
        ('Brand / Graphic Design', 'Brand / Graphic Design'),
        ('Illustration', 'Illustration'),
        ('Leadership', 'Leadership'),
        ('Mobile Design', 'Mobile Design'),
        ('UI / Visual Design', 'UI / Visual Design'),
        ('Product Design', 'Product Design'),
        ('UX Design / Research', 'UX Design / Research'),
        ('Web Design', 'Web Design')
    ]

    SELECT_YEARS = [
        ('1_2 Years', '1_2 Years'),
        ('3_5 Years', '3_5 Years'),
        ('6_8 Years', '6_8 Years'),
        ('+9 Years', '+9 Years')
    ]

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="specialty")
    specialties = models.CharField(max_length=50, choices=SPECIALTIES_TYPE_CHOICES, default='')
    years_of_experience = models.CharField(max_length=20, choices=SELECT_YEARS, default='')

    def is_valid_category(category):
        valid_categories = [choice[0] for choice in Specialty.SPECIALTIES_TYPE_CHOICES]
        return category in valid_categories

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        if Specialty.objects.exclude(pk=self.pk).filter(profile=self.profile, specialties=self.specialties).exists():
            raise ValidationError("The combination of profile and specialties must be unique.")

class Skill(models.Model) :
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="skill")
    skills = models.CharField(max_length=100)

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        if Skill.objects.exclude(pk=self.pk).filter(profile=self.profile, skills=self.skills).exists():
            raise ValidationError("The combination of profile and skills must be unique.")

class Work(models.Model):

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="work")
    title = models.CharField(max_length=200)
    tags = TaggableManager(blank=True)
    color = models.CharField(max_length=10, blank=True, null=True)
    looking_for_feedback = models.BooleanField(default=False)
    related_work_group = models.ManyToManyField('self', blank=True, symmetrical=False, related_name='works', default=list)
    in_draft = models.BooleanField(default=False)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        if Work.objects.exclude(pk=self.pk).filter(profile=self.profile, title=self.title).exists():
            raise ValidationError("The combination of profile and title must be unique.")

class WorkMedia(models.Model):
    
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name='work_medias', blank=True)
    uid = models.UUIDField(max_length=100, editable=False, unique=True, default=uuid.uuid4)
    text = models.TextField(blank=True, null=True, max_length=2000)
    image = models.ImageField(upload_to='Work_Images/', blank=True, null=True)
    video = models.FileField(upload_to='Work_Videos/', blank=True, null=True)

    MIN_IMAGE_WIDTH = 400
    MIN_IMAGE_HEIGHT = 300
    MAX_IMAGE_SIZE_MB = 10
    MAX_VIDEO_SIZE_MB = 50

    def clean(self):
        super().clean()

        if not self.text and not self.image and not self.video:
            raise ValidationError("At least one of the fields 'text', 'image', or 'video' must be provided.")

        if self.image and not self.image.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
            raise ValidationError("Unsupported file type. Please upload a PNG, JPG, JPEG, or GIF image.")

        if self.image:
            try:
                img = Image.open(self.image)
                width, height = img.size
                if width < self.MIN_IMAGE_WIDTH or height < self.MIN_IMAGE_HEIGHT:
                    raise ValidationError("The image must be at least 400x300 pixels.")
            except Exception as e:
                raise ValidationError(f"Error processing the image: {e}")

            file_size = self.image.file.size / (1024 * 1024)
            if file_size > self.MAX_IMAGE_SIZE_MB:
                raise ValidationError(f"Image size must not exceed {self.MAX_IMAGE_SIZE_MB} MB.")

        if self.video:
            file_size = self.video.file.size / (1024 * 1024)
            if file_size > self.MAX_VIDEO_SIZE_MB:
                raise ValidationError(f"Video size must not exceed {self.MAX_VIDEO_SIZE_MB} MB.")

class Gallery(models.Model):

    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name='galleries', blank=True)
    uid = models.UUIDField(max_length=100, editable=False, unique=True, default=uuid.uuid4)
    image = models.ImageField(upload_to='Gallery_Images/', blank=True, null=True)

    MIN_IMAGE_WIDTH = 400
    MIN_IMAGE_HEIGHT = 300
    MAX_IMAGE_SIZE_MB = 5

    def clean(self):
        super().clean()

        if self.image:
            if not self.image.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                raise ValidationError("Unsupported file type. Please upload a PNG, JPG, JPEG, or GIF image.")

            try:
                img = Image.open(self.image)
                width, height = img.size
                if width < self.MIN_IMAGE_WIDTH or height < self.MIN_IMAGE_HEIGHT:
                    raise ValidationError("The image must be at least 400x300 pixels.")
            except Exception as e:
                raise ValidationError(f"Error processing the image: {e}")

            file_size = self.image.file.size / (1024 * 1024)
            if file_size > self.MAX_IMAGE_SIZE_MB:
                raise ValidationError(f"Image size must not exceed {self.MAX_IMAGE_SIZE_MB} MB.")

class Collection(models.Model):
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="collaction")
    work = models.ManyToManyField(Work, symmetrical=False, blank=True, default=list)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        
        if Collection.objects.exclude(pk=self.pk).filter(profile=self.profile, title=self.title).exists():
            raise ValidationError("The combination of profile and title must be unique.")

class Like(models.Model):
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="likes")

    class Meta:
        unique_together = ['profile', 'work']

class View(models.Model):
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="views")

    class Meta:
        unique_together = ['profile', 'work']

class Share(models.Model):
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="shares")

    class Meta:
        unique_together = ['profile', 'work']

class Follow(models.Model):
    
    follower = models.ForeignKey(Profile, related_name='following', on_delete=models.CASCADE)
    following = models.ForeignKey(Profile, related_name='followers', on_delete=models.CASCADE)

    class Meta:
        unique_together = ['follower', 'following']

    def clean(self):
        if self.follower == self.following:
            raise ValidationError("Users cannot follow themselves.")

class Comment(models.Model):
    
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Bookmarked(models.Model) :
    
    bookmarker = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='bookmarked_profiles')
    bookmarked_profile = models.ForeignKey(Profile, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['bookmarker', 'bookmarked_profile']

    def clean(self):
        if self.bookmarker == self.bookmarked_profile:
            raise ValidationError("You cannot bookmark your own profile.")

class DesignRequest(models.Model):
    
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_requests')
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='received_requests')
    uid = models.UUIDField(max_length=100, editable=False, unique=True, default=uuid.uuid4)
    design_needs = models.CharField(max_length=100, blank=True, null=True)
    timeline = models.CharField(max_length=50, choices=[('ASAP', 'ASAP'), ('Within the next month', 'Within the next month'), ('Not urgent', 'Not urgent')], default='')
    project_details = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=[('Inbox', 'Inbox'), ('Archive', 'Archive')], default='Inbox')
    create_at = models.DateTimeField(auto_now_add=True)

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        if DesignRequest.objects.exclude(pk=self.pk).filter(sender=self.sender, receiver=self.receiver).exists():
            raise ValidationError("The combination of sender and receiver must be unique.")

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationError("Sender and receiver cannot be the same person.")

class ChatMessage(models.Model):
    
    design_request = models.ForeignKey(DesignRequest, on_delete=models.CASCADE, related_name='chat_messages')
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_messages')
    message = models.TextField(max_length=2000)
    create_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.sender != self.design_request.sender and self.sender != self.design_request.receiver:
            raise ValidationError("Sender must be either the sender or receiver of the associated design request.")

class Company(models.Model):

    created_by = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='companies', blank=True)
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='company-logo/', blank=True, null=True)
    website = models.URLField(max_length=255, blank=True, null=True)

    MAX_IMAGE_SIZE_MB = 5

    def clean(self):
        super().clean()

        if self.website and not self.website.startswith('https://'):
            raise ValidationError({'website': 'The URL must start with "https://".'})

        if self.logo:
            if not self.logo.name.lower().endswith(('.png', '.jpg', '.jpeg', '.gif')):
                raise ValidationError({'logo': 'Unsupported file type. Please upload a PNG, JPG, JPEG, or GIF image.'})

            file_size = self.logo.file.size / (1024 * 1024)
            if file_size > self.MAX_IMAGE_SIZE_MB:
                raise ValidationError({'logo': f'Image size must not exceed {self.MAX_IMAGE_SIZE_MB} MB.'})

class Job(models.Model):

    TITLE_CHOICES = [
        ('Remote', 'Remote'),
        ('On-site', 'On-site'),
        ('Hybrid', 'Hybrid')
    ]

    DESIGNER_TYPE_CHOICES = [
        ('Animation', 'Animation'),
        ('Brand / Graphic Design', 'Brand / Graphic Design'),
        ('Illustration', 'Illustration'),
        ('Leadership', 'Leadership'),
        ('Mobile Design', 'Mobile Design'),
        ('UI / Visual Design', 'UI / Visual Design'),
        ('Product Design', 'Product Design'),
        ('UX Design / Research', 'UX Design / Research'),
        ('Web Design', 'Web Design')
    ]

    EMPLOYMENT_TYPE_CHOICES = [
        ('Full-time employee', 'Full-time employee'),
        ('Freelance / Contract hire', 'Freelance / Contract hire')
    ]

    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='Pjobs')
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    location = models.CharField(max_length=255, default='')
    workplace_type = models.CharField(max_length=50, choices=TITLE_CHOICES, default='Remote')
    designer_type = models.CharField(max_length=50, choices=DESIGNER_TYPE_CHOICES, default='Brand / Graphic Design')
    employment_type = models.CharField(max_length=50, choices=EMPLOYMENT_TYPE_CHOICES, default='Full-time employee')
    application_link = models.URLField(max_length=255, null=True, blank=True)
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, related_name='Cjobs', null=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        super().clean()

        if self.application_link and not self.application_link.startswith('https://'):
            raise ValidationError({'application_link': 'The URL must start with "https://".'})

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        if Job.objects.exclude(pk=self.pk).filter(profile=self.profile, title=self.title).exists():
            raise ValidationError("The combination of profile and title must be unique.")

class Block(models.Model):
    
    blocker = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='blocked_users')
    blocked = models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='blocking_users')

    def validate_unique(self, exclude=None):
        super().validate_unique(exclude)
        
        if Block.objects.exclude(pk=self.pk).filter(blocker=self.blocker, blocked=self.blocked).exists():
            raise ValidationError("The combination of blocker and blocked must be unique.")

    def clean(self):
        if self.blocker == self.blocked:
            raise ValidationError("You cannot block yourself.")

class Report(models.Model):
    
    reporter = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='reported_users')
    reported = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='reporting_users')
    reason = models.TextField(max_length=1000)
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.reporter == self.reported:
            raise ValidationError("You cannot report yourself.")

@receiver(post_save, sender=Users)
def save_profile(sender, instance, created, **kwargs):
    if created :
        Profile.objects.create(user=instance)
