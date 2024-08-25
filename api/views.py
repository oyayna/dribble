from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import get_user_model, authenticate
from .models import *
from .serializers import *
from django.utils.crypto import get_random_string
from django.shortcuts import get_object_or_404
from datetime import timedelta
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
import uuid
from rest_framework.exceptions import ValidationError
from django.db.models import Q, F, Count

User = get_user_model()

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh['username'] = user.username
    refresh['email'] = user.email
    
    return {
        "success": "Login successful. You are now authenticated and can access all your available features.",
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }

def validate_uuid(uuid_to_test, version=4):
    try:
        uuid_obj = uuid.UUID(uuid_to_test, version=version)
    except ValueError:
        raise ValidationError({"error": "Invalid UUID format."})
    return str(uuid_obj) == uuid_to_test

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    try:
        if request.method == "POST" :

            email = request.data.get("email")
            password = request.data.get("password")

            if not email or not password :
                return Response(
                    {"error": "The email  you entered is not associated with an account. Find your account and log in."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = authenticate(request, username=email, password=password)

            if user is not None:

                tokens = get_tokens_for_user(user)
                user.last_login = timezone.now()
                user.save()

                return Response(
                    tokens,
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"error": "We couldn’t find an account matching the email and password you entered. Please check your email and password and try again."},
                    status=status.HTTP_401_UNAUTHORIZED
                )
    except Exception as e :
        print(e)
        return Response(
            {"error": "An internal server error occurred. Try again later."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    if request.method == "POST" :

        email = request.data.get("email")

        user = User.objects.filter(email=email).first()

        if user:
            return Response({
                'error': 'An account with this email address already exists. Please try logging in or use a different email address to create a new account.'
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response(
                    tokens,
                    status=status.HTTP_200_OK
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_view(request):

    serializer = PasswordResetSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']

    try :
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "Email not found. Please provide a registered email address."}, status=status.HTTP_400_BAD_REQUEST)
    
    token = get_random_string(40)
    expire_date = timezone.now() + timedelta(minutes=5)
    user.reset_password_token = token
    user.reset_password_expire = expire_date
    user.save()
    # Construct your reset password link
    reset_link = f"{settings.FRONTEND_URL}/forget-password/reset-password-confirm/?token={token}&email={email}"
    # Send email with the reset link
    send_mail(
        'Password Reset Request',
        f'Click the link to reset your password: {reset_link}',
        settings.EMAIL_HOST_USER,
        [email],
        fail_silently=False, # إذا كان True، سيتم تجاهل الأخطاء بصمت، وإذا كان False سيتم طرح استثناء عند حدوث خطأ
    )
# Always return a success message, even if the email does not exist, to avoid disclosing user information
    return Response({"success": "A reset link has been sent to your email address."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm_view(request):
    serializer = PasswordResetConfirmSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    email = serializer.validated_data['email']
    new_password = serializer.validated_data['new_password']

    user = User.objects.get(email=email)

    user.set_password(new_password)
    user.reset_password_token = ""
    user.reset_password_expire = None
    user.save()
    return Response({"success": "Your password has been successfully reset. You can now log in with your new password."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    if request.method == "POST" :

        refresh_token = request.data.get("refresh_token")

        if refresh_token:
            try:

                token = RefreshToken(refresh_token)
                
                if token["user_id"] != request.user.id:
                    return Response(
                        {"error": "The session does not belong to the authenticated user."},
                        status=status.HTTP_403_FORBIDDEN
                    )
                
                token.blacklist()
                return Response(
                    status=status.HTTP_205_RESET_CONTENT
                )
            
            except TokenError as e:
                return Response(
                    {"error": "The session has expired or is invalid."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            except Exception :
                return Response(
                    {"error": "An error occurred during logout. Try again later."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        else:
            return Response(
                {"error": "A session identifier is required to log out."},
                status=status.HTTP_400_BAD_REQUEST
            )

##################### profile #####################

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    profile = request.user.profile
    
    if ("company" in request.data and "company_data" in request.data) or "company" in request.data :
        serializer = CompanyProfileSerializer(profile, data=request.data, partial=True)
    elif "company_data" in request.data :
        serializer = CompanyDataProfileSerializer(profile, data=request.data, partial=True)
    else :
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        user = request.user
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'status': 'Password changed successfully'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):

    profile = request.user.profile

    serializer = CurrentProfileSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_works(request):

    profile = request.user.profile

    category = request.query_params.get("category")

    works = Work.objects.filter(profile=profile).annotate(
        total_views=Count('views', distinct=True),
        total_comments=Count('comments', distinct=True)
    )

    if category and category.lower() == "popular_shorts":
        works = works.annotate(
            total_score=(
                Count('profile__followers', filter=Q(profile__followers__following=F('profile'))) +
                Count('likes', distinct=True) +
                F('total_views') +
                F('total_comments') +
                Count('shares', distinct=True)
            )
        ).order_by('-total_score', '-created_at')

    serializer = GetUserWorks(works, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_collections(request):

    profile = request.user.profile

    collections = Collection.objects.filter(profile=profile)

    serializer = GetUserCollections(collections, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_likes(request):
    profile = request.user.profile
    
    likes = Like.objects.filter(profile=profile)
    
    serializer = LikeSerializer(likes, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_about_user_profile(request):

    profile = request.user.profile

    serializer = ProfileAboutSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_draft_works(request):

    draft_works = Work.objects.filter(profile=request.user.profile ,in_draft=True)

    serializer = GetUserWorks(draft_works, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_profile(request, id):
    if request.user.profile.id == id:
        return Response({"error": "Cannot retrieve your own profile using this endpoint."}, status=status.HTTP_400_BAD_REQUEST)

    profile = get_object_or_404(Profile, id=id)

    serializer = OtherProfileSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_works(request, id):

    profile = get_object_or_404(Profile, id=id)

    if request.user.profile.id == id:
        return Response({"error": "Cannot retrieve your own profile using this endpoint."}, status=status.HTTP_400_BAD_REQUEST)

    category = request.query_params.get("category")

    works = Work.objects.filter(profile=profile).annotate(
        total_views=Count('views', distinct=True),
        total_comments=Count('comments', distinct=True)
    )

    if category and category.lower() == "popular_shorts":
        works = works.annotate(
            total_score=(
                Count('profile__followers', filter=Q(profile__followers__following=F('profile'))) +
                Count('likes', distinct=True) +
                F('total_views') +
                F('total_comments') +
                Count('shares', distinct=True)
            )
        ).order_by('-total_score', '-created_at')

    serializer = GetUserWorks(works, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_collections(request, id):

    if request.user.profile.id == id:
        return Response({"error": "Cannot retrieve your own profile using this endpoint."}, status=status.HTTP_400_BAD_REQUEST)

    profile = get_object_or_404(Profile, id=id)

    collections = Collection.objects.filter(profile=profile)

    serializer = GetUserCollections(collections, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_likes(request, id):

    if request.user.profile.id == id:
        return Response({"error": "Cannot retrieve your own profile using this endpoint."}, status=status.HTTP_400_BAD_REQUEST)

    profile = get_object_or_404(Profile, id=id)
    
    likes = Like.objects.filter(profile=profile)

    serializer = LikeSerializer(likes, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_about_other_user_profile(request, id):

    if request.user.profile.id == id:
        return Response({"error": "Cannot retrieve your own profile using this endpoint."}, status=status.HTTP_400_BAD_REQUEST)

    profile = get_object_or_404(Profile, id=id)

    serializer = OtherProfileAboutSerializer(profile)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_designers_view(request) :

    category = request.query_params.get('search[category]')
    keywords = request.query_params.get('search[keywords]')
    work_type = request.query_params.get('search[workType]')
    experience_levels = request.query_params.getlist('search[experienceLevels][]')
    budget = request.query_params.get('search[budget]')
    company = request.query_params.get('search[company]')
    location = request.query_params.get("search[location]")
    agencies_only = request.query_params.get("search[agenciesOnly]")

    queryset = Profile.objects.all()

    blocked_users = Block.objects.filter(blocker=request.user.profile).values_list('blocked', flat=True)

    queryset = queryset.exclude(id__in=blocked_users).exclude(verified=False).exclude(user__is_active=False)

    if category and Specialty.is_valid_category(category):
        queryset = queryset.filter(specialty__specialties=category)

    if work_type and work_type in dict(WorkAvailability.WORK_CHOICES) :
        queryset = queryset.filter(workavailability__work_type=work_type)

    if keywords :
        queryset = queryset.filter(skill__skills__icontains=keywords)

    if company :
        queryset = queryset.filter(company__name__icontains=company)

    if location :
        queryset = queryset.filter(location__icontains=location)

    if agencies_only and agencies_only.lower() in ["true", "false"]:
        agencies_only_bool = agencies_only.lower() == "true"
        queryset = queryset.filter(workavailability__agencies_only=agencies_only_bool)
    
    valid_experience_levels = [level for level in experience_levels if level in dict(WorkAvailability.EXPERIENCE_LEVEL)]
    if valid_experience_levels:
        queryset = queryset.filter(workavailability__experience_level__in=valid_experience_levels)

    if budget == "Value":
        queryset = queryset.filter(workavailability__minimum_hourly_rate__lt=120)
    
    elif budget == "Mid-range":
        queryset = queryset.filter(workavailability__minimum_hourly_rate__gte=120, workavailability__minimum_hourly_rate__lte=300)
    
    elif budget == "High-end":
        queryset = queryset.filter(workavailability__minimum_hourly_rate__gt=300)
    
    elif budget == "Custom":
        try:
            custom_budget = float(request.query_params.get('search[hourlyRateMax]'))
            queryset = queryset.filter(workavailability__minimum_hourly_rate__lte=custom_budget)
        except (TypeError, ValueError):
            return Response({"error": "Invalid custom budget value"}, status=status.HTTP_400_BAD_REQUEST)
    
    queryset = queryset.order_by("-is_pro", "user__date_joined", "-user__is_staff", "-user__is_superuser")

    serializer = ProfileWSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_profiles_view(request, category1, category2):

    queryset = Profile.objects.all()

    blocked_users = Block.objects.filter(blocker=request.user.profile).values_list('blocked', flat=True)

    queryset = queryset.exclude(id__in=blocked_users).exclude(verified=False).exclude(user__is_active=False)

    if category1 and category1 == "users" :
        queryset = queryset.filter(user__username__icontains=category2)
    else :
        queryset = queryset.filter(user__username__icontains=f"{category1} {category2}")

    queryset = queryset.order_by("-is_pro", "user__date_joined", "-user__is_staff", "-user__is_superuser")
    print(f"queryset : {queryset}")
    serializer = ProfileWV2Serializer(queryset, many=True)
    return Response(serializer.data)

##################### profile #####################

##################### work_availability #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_work_availability(request):

    profile = request.user.profile
    data = request.data.copy()
    data['profile'] = profile.id
    serializer = WorkAvailabilitySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_work_availability(request):

    profile = request.user.profile
    work_availability = get_object_or_404(WorkAvailability, profile=profile)

    serializer = WorkAvailabilitySerializer(work_availability, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##################### work_availability #####################

##################### WorkHistory #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_work_history(request):

    profile = request.user.profile
    data = request.data.copy()
    data['profile'] = profile.id
    serializer = WorkHistorySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_work_history(request, id):

    profile = request.user.profile
    work_history = get_object_or_404(WorkHistory, profile=profile, id=id)

    serializer = WorkHistorySerializer(work_history, data=request.data, partial=True, context={"profile": profile})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_work_history(request, id):

    profile = request.user.profile
    work_history = get_object_or_404(WorkHistory, profile=profile, id=id)

    work_history.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

##################### WorkHistory #####################

##################### Education #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_education(request):

    profile = request.user.profile
    data = request.data.copy()
    data['profile'] = profile.id
    serializer = EducationSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_education(request, id):

    profile = request.user.profile
    education = get_object_or_404(Education, profile=profile, id=id)

    serializer = EducationSerializer(education, data=request.data, partial=True, context={"profile": profile})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_education(request, id):

    profile = request.user.profile
    education = get_object_or_404(Education, profile=profile, id=id)

    education.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

##################### Education #####################

##################### Specialty #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_specialty(request):

    profile = request.user.profile
    data = request.data.copy()
    data['profile'] = profile.id
    serializer = SpecialtySerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_specialty(request, id):

    profile = request.user.profile
    specialty = get_object_or_404(Specialty, profile=profile, id=id)

    serializer = SpecialtySerializer(specialty, data=request.data, partial=True, context={"profile": profile})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_specialty(request, id):

    profile = request.user.profile
    specialty = get_object_or_404(Specialty, profile=profile, id=id)

    specialty.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

##################### Specialty #####################

##################### Skill #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_skill(request):

    profile = request.user.profile
    data = request.data.copy()
    data['profile'] = profile.id
    serializer = SkillSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_skill(request, id):

    profile = request.user.profile
    skill = get_object_or_404(Skill, profile=profile, id=id)

    serializer = SkillSerializer(skill, data=request.data, partial=True, context={"profile": profile})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_skill(request, id):

    profile = request.user.profile
    skill = get_object_or_404(Skill, profile=profile, id=id)

    skill.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

##################### Skill #####################

##################### Work #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_work(request):
    profile = request.user.profile

    data = request.data.copy()
    data['profile'] = profile.id

    related_work_group = data.get('related_work_group')
    tags = data.get('tags')

    if related_work_group == "":
        data.pop('related_work_group', None)

    if tags == "":
        data.pop('tags', None)

    serializer = WorkMGSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_work(request, id):
    
    profile = request.user.profile
    work = get_object_or_404(Work, profile=profile, id=id)

    data = request.data.copy()

    related_work_group = data.get('related_work_group')
    tags = data.get('tags')

    if related_work_group == "":
        if work.related_work_group.exists() :
            work.related_work_group.clear()

        data.pop('related_work_group', None)
    
    if tags == "" :
        if work.tags.exists() :
            work.tags.clear()

        data.pop('tags', None)

    serializer = WorkMGSerializer(work, data=data, partial=True, context={"profile": profile, "data": data})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_work(request, id):

    profile = request.user.profile
    work = get_object_or_404(Work, profile=profile, id=id)

    work.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_work_media(request, id, uid):

    profile = request.user.profile
    work = get_object_or_404(Work, profile=profile, id=id)
    work_media = get_object_or_404(WorkMedia, work=work, uid=uid)

    work_media.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_work_gallery(request, id, uid):

    profile = request.user.profile
    work = get_object_or_404(Work, profile=profile, id=id)
    gallery = get_object_or_404(Gallery, work=work, uid=uid)

    gallery.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def work_details(request, id):
    work = get_object_or_404(Work, id=id)
    
    serializer = WorkDetailSerializer(work)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_works_views(request, category1, category2):

    tag = request.query_params.get("tag")

    color = request.query_params.get("color")

    timeframe = request.query_params.get("timeframe")

    query = request.query_params.get("q")

    timenow = timezone.now()
    
    blocked_users = Block.objects.filter(blocker=request.user.profile).values_list('blocked', flat=True)

    if not category2 or not Specialty.is_valid_category(category2) :
        queryset = Work.objects.filter(profile__specialty__specialties="Animation")
    else :
        queryset = Work.objects.filter(profile__specialty__specialties=category2)

    queryset = queryset.exclude(in_draft=True).exclude(profile__in=blocked_users).exclude(profile__verified=False).exclude(verified=False).exclude(profile__user__is_active=False)

    if category1 in ["following", "popular", "recent"] :
        if category1 == "following" :
            profile = request.user.profile
            followed_users = profile.following.all().values_list('following', flat=True)
            queryset = queryset.filter(profile__in=followed_users)
        elif category1 == "recent" :
            Now = timenow - timedelta(days=1)
            queryset = queryset.filter(created_at__gte=Now)
        else :
            if not timeframe or timeframe not in ["week", "month", "year", "ever"] :
                Now = timenow - timedelta(days=1)
                queryset = queryset.filter(created_at__gte=Now)
            else :
                timeframes = {
                    "week": timenow - timedelta(days=7),
                    "month": timenow - timedelta(days=30),
                    "year": timenow - timedelta(days=365),
                    "ever": None
                }

                if timeframes[timeframe]:
                    queryset = queryset.filter(created_at__gte=timeframes[timeframe])

    if tag :
        queryset = queryset.filter(tags__name__icontains=tag)

    if color :
        queryset = queryset.filter(color__icontains=color)

    if query :
        queryset = queryset.filter(title__icontains=query)

    queryset = queryset.annotate(
        total_likes=Count('likes', distinct=True),
        total_views=Count('views', distinct=True),
        total_score=(
            Count('profile__followers', filter=Q(profile__followers__following=F('profile'))) + 
            Count('likes', distinct=True) +
            Count('views', distinct=True) +
            Count('shares', distinct=True)
        )
    ).order_by('-total_score', '-created_at')

    serializer = GetWorkSerializer(queryset, many=True)
    return Response(serializer.data)

##################### Work #####################

##################### Collection #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_collection(request):

    profile = request.user.profile
    data = request.data.copy()
    data['profile'] = profile.id
    serializer = CollectionSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_collection(request, id):

    profile = request.user.profile
    collection = get_object_or_404(Collection, profile=profile, id=id)

    serializer = CollectionSerializer(collection, data=request.data, partial=True, context={"profile": profile})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_collection(request, id):

    profile = request.user.profile
    collection = get_object_or_404(Collection, profile=profile, id=id)

    collection.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_work_to_collections(request, id):
    profile = request.user.profile
    work = get_object_or_404(Work, id=id)

    collections = request.data.get('collections')
    if not collections:
        return Response({"error": "No collections provided."}, status=status.HTTP_400_BAD_REQUEST)

    for collection_id in collections:
        try:
            collection = Collection.objects.get(id=collection_id, profile=profile)
            if collection.work.filter(id=work.id).exists():
                continue
            collection.work.add(work)
        except Collection.DoesNotExist:
            continue

    return Response({"message": "Work added to collections successfully."}, status=status.HTTP_200_OK)

##################### Collection #####################

##################### Like #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_like(request, id):

    profile = request.user.profile
    work = get_object_or_404(Work, id=id)
    data = request.data.copy()
    data['profile'] = profile.id
    data['work'] = work.id

    if Like.objects.filter(profile=profile, work=work).exists():
        return Response({"error": "Like already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = LikeSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_like(request, id):

    profile = request.user.profile
    work = get_object_or_404(Work, id=id)
    like = get_object_or_404(Like, profile=profile, work=work)

    like.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

##################### Like #####################

##################### View #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_view(request, id):

    profile = request.user.profile
    work = get_object_or_404(Work, id=id)
    data = request.data.copy()
    data['profile'] = profile.id
    data['work'] = work.id

    if View.objects.filter(profile=profile, work=work).exists():
        return Response({"error": "Like already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = ViewSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##################### View #####################

##################### Share #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_share(request, id):

    profile = request.user.profile
    work = get_object_or_404(Work, id=id)
    data = request.data.copy()
    data['profile'] = profile.id
    data['work'] = work.id

    if Share.objects.filter(profile=profile, work=work).exists():
        return Response({"error": "Like already exists"}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = ShareSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##################### Share #####################

##################### Follow #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_follow(request, id):

    follower = request.user.profile
    following = get_object_or_404(Profile, id=id)
    data = request.data.copy()
    data['follower'] = follower.id
    data['following'] = following.id

    if follower == following:
        return Response({"error": "Users cannot follow themselves."}, status=status.HTTP_400_BAD_REQUEST)
    
    if Follow.objects.filter(follower=follower, following=following).exists():
        return Response({"error": "Follow already exists"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = FollowSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_follow(request, id):

    follower = request.user.profile
    following = get_object_or_404(Profile, id=id)
    follow = get_object_or_404(Follow, follower=follower, following=following)

    follow.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

##################### Follow #####################

##################### Comment #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_comment(request, id):

    profile = request.user.profile
    work = get_object_or_404(Work, id=id)

    if not work.looking_for_feedback:
        raise ValidationError({"detail": "Comments are not allowed for this work as it's not looking for feedback."})

    data = request.data.copy()

    data["profile"] = profile.id

    data["work"] = work.id
    
    serializer = CommentSerializer(data=data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_comment(request, id):
    comment = get_object_or_404(Comment, id=id, profile=request.user.profile)
    
    serializer = CommentSerializer(comment, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_comment(request, id):
    comment = get_object_or_404(Comment, id=id, profile=request.user.profile)
    
    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments_view(request, id):
    work = get_object_or_404(Work, id=id)

    comments = work.comments.all()

    serializer = CommentSerializer(comments, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

##################### Comment #####################

##################### Bookmarked #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_bookmarked(request, id):

    bookmarker = request.user.profile
    bookmarked_profile = get_object_or_404(Profile, id=id)
    data = request.data.copy()
    data['bookmarker'] = bookmarker.id
    data['bookmarked_profile'] = bookmarked_profile.id

    if bookmarker == bookmarked_profile:
        return Response({"error": "You cannot bookmark your own profile."}, status=status.HTTP_400_BAD_REQUEST)
    
    if Bookmarked.objects.filter(bookmarker=bookmarker, bookmarked_profile=bookmarked_profile).exists():
        return Response({"error": "Bookmark already exists"}, status=status.HTTP_400_BAD_REQUEST)

    serializer = BookmarkedSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_bookmarked(request, id):

    bookmarker = request.user.profile
    bookmarked_profile = get_object_or_404(Profile, id=id)
    bookmarked = get_object_or_404(Bookmarked, bookmarker=bookmarker, bookmarked_profile=bookmarked_profile)

    bookmarked.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_bookmarked_view(request):

    profile = request.user.profile

    bookmarked_profiles_ids = Bookmarked.objects.filter(bookmarker=profile).values_list('bookmarked_profile', flat=True)
    
    profile = Profile.objects.filter(id__in=bookmarked_profiles_ids)

    serializer = ProfileWSerializer(profile, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

##################### Bookmarked #####################

##################### DesignRequest #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_design_request(request, id):

    sender = request.user.profile
    receiver = get_object_or_404(Profile, id=id)
    data = request.data.copy()
    data['sender'] = sender.id
    data['receiver'] = receiver.id
    serializer = DesignRequestSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_design_request(request, uid):

    design_request = get_object_or_404(DesignRequest, uid=uid)
    
    if request.user.profile not in [design_request.sender, design_request.receiver]:
        return Response({"error": "You are not authorized to modify this request."}, status=status.HTTP_403_FORBIDDEN)
    
    design_request.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_archive(request, uid):

    design_request = get_object_or_404(DesignRequest, uid=uid)

    if request.user.profile not in [design_request.sender, design_request.receiver]:
        return Response({"error": "You are not authorized to modify this request."}, status=status.HTTP_403_FORBIDDEN)

    if design_request.status == 'Inbox' :

        design_request.status = 'Archive'
        design_request.save()

    return Response({"message": "Design request status toggled successfully."}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_inbox(request, uid):

    design_request = get_object_or_404(DesignRequest, uid=uid)

    if request.user.profile not in [design_request.sender, design_request.receiver]:
        return Response({"error": "You are not authorized to modify this request."}, status=status.HTTP_403_FORBIDDEN)

    if design_request.status == 'Archive' :

        design_request.status = 'Inbox'
        design_request.save()
        
    return Response({"message": "Design request status toggled successfully."}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_inbox_design_requests_view(request):

    profile = request.user.profile

    design_requests = DesignRequest.objects.filter(Q(sender=profile) | Q(receiver=profile), status="Inbox")

    serializer = DesignRequestSerializer(design_requests, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_archive_design_requests_view(request):

    profile = request.user.profile

    design_requests = DesignRequest.objects.filter(Q(sender=profile) | Q(receiver=profile), status="Archive")

    serializer = DesignRequestSerializer(design_requests, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

##################### DesignRequest #####################

##################### ChatMessage #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_chat_message(request, uid):

    sender = request.user.profile
    design_request = get_object_or_404(DesignRequest, uid=uid)

    if sender != design_request.sender and sender != design_request.receiver:
        return Response({"error": "Sender must be either the sender or receiver of the associated design request."}, status=status.HTTP_403_FORBIDDEN)
    
    data = request.data.copy()
    data['sender'] = sender.id
    data['design_request'] = design_request.id
    serializer = ChatMessageSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_chat_message(request, uid, id):

    sender = request.user.profile
    design_request = get_object_or_404(DesignRequest, uid=uid)
    chat_message = get_object_or_404(ChatMessage, design_request=design_request, id=id)

    if sender != design_request.sender and sender != design_request.receiver:
        return Response({"error": "Sender must be either the sender or receiver of the associated design request."}, status=status.HTTP_403_FORBIDDEN)

    serializer = ChatMessageSerializer(chat_message, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_chat_message(request, uid, id):

    sender = request.user.profile
    design_request = get_object_or_404(DesignRequest, uid=uid)
    chat_message = get_object_or_404(ChatMessage, design_request=design_request, id=id)

    if sender != design_request.sender and sender != design_request.receiver:
        return Response({"error": "Sender must be either the sender or receiver of the associated design request."}, status=status.HTTP_403_FORBIDDEN)

    chat_message.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_chat_messages(request, uid):

    design_request = get_object_or_404(DesignRequest, uid=uid)

    if request.user.profile != design_request.sender and request.user.profile != design_request.receiver:
        return Response({"error": "You are not authorized to view these messages."}, status=status.HTTP_403_FORBIDDEN)

    chat_messages = ChatMessage.objects.filter(design_request=design_request)

    serializers_design_request = DesignRequestSerializer(design_request)

    serializer_chatmessages = ChatMessageSerializer(chat_messages, many=True)

    response_data = {
        "design_request": serializers_design_request.data,
        "chat_messages": serializer_chatmessages.data,
    }

    return Response(response_data, status=status.HTTP_200_OK)

##################### ChatMessage #####################

##################### BlockUser&UnBlockUser #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def block_user(request, id):

    blocker = request.user.profile

    blocked = get_object_or_404(Profile, id=id)

    if blocker == blocked:
        return Response({'error': 'You cannot block yourself.'}, status=status.HTTP_400_BAD_REQUEST)

    data = request.data.copy()

    data["blocker"] = blocker.id

    data["blocked"] = blocked.id

    
    serializer = BlockSerializer(data=data)
    
    if serializer.is_valid():
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unblock_user(request, id):
    blocker = request.user.profile
    blocked = get_object_or_404(Profile, id=id)

    # التحقق من أن الحظر موجود
    block_instance = Block.objects.filter(blocker=blocker, blocked=blocked).first()

    if block_instance:
        block_instance.delete()
        return Response({'message': 'User successfully unblocked.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'No block found between these users.'}, status=status.HTTP_400_BAD_REQUEST)

##################### BlockUser&UnBlockUser #####################

##################### ReportUser #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def report_user(request, id):

    reporter = request.user.profile

    reported = get_object_or_404(Profile, id=id)

    if reporter == reported:
        return Response({'error': 'You cannot report yourself.'}, status=status.HTTP_400_BAD_REQUEST)
    
    data = request.data.copy()

    data["reporter"] = reporter.id

    data["reported"] = reported.id

    serializer = ReportSerializer(data=data)
    
    if serializer.is_valid():
        
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

##################### ReportUser #####################

##################### Job #####################

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_job(request):

    profile = request.user.profile
    data = request.data.copy()
    data['profile'] = profile.id
    if ("company" in request.data and "company_data" in request.data) or "company" in request.data :
        serializer = CompanyJobSerializer(data=data)
    elif "company_data" in request.data :
        serializer = CompanyDataJobSerializer(data=data)
    else :
        serializer = JobSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_job(request, id):

    profile = request.user.profile
    job = get_object_or_404(Job, profile=profile, id=id)

    if ("company" in request.data and "company_data" in request.data) or "company" in request.data :
        serializer = CompanyJobSerializer(job, data=request.data, partial=True, context={"profile": profile})
    elif "company_data" in request.data :
        serializer = CompanyDataJobSerializer(job, data=request.data, partial=True, context={"profile": profile})
    else :
        serializer = JobSerializer(job, data=request.data, partial=True, context={"profile": profile})

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_job(request, id):

    profile = request.user.profile
    job = get_object_or_404(Job, profile=profile, id=id)

    job.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def job_details(request, id):
    job = get_object_or_404(Job, id=id)

    serializer = JobProfileSerializer(job)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def job_filter_view(request):
    keyword = request.query_params.get('keyword')
    specialty_ids = request.query_params.getlist('specialty_ids[]')
    location = request.query_params.get('location')
    anywhere = request.query_params.get('anywhere')
    freelance = request.query_params.get('freelance_or_contract')
    fulltime = request.query_params.get('fulltime')

    blocked_users = Block.objects.filter(blocker=request.user.profile).values_list('blocked', flat=True)

    queryset = Job.objects.all()

    queryset = queryset.exclude(profile__in=blocked_users).exclude(profile__verified=False).exclude(verified=False).exclude(profile__user__is_active=False)

    if keyword :
        keyword = Company.objects.filter(name__icontains=keyword).values_list('id', flat=True)
        queryset = queryset.filter(company__in=keyword)

    if specialty_ids :
        specialty_ids = [int(id) for id in specialty_ids if id.isdigit()]
        specialty_map = {index + 1: specialty[0] for index, specialty in enumerate(Job.DESIGNER_TYPE_CHOICES)}
        valid_specialties = [specialty_map.get(id) for id in specialty_ids if id in specialty_map.keys()]
        queryset = queryset.filter(profile__specialty__specialties__in=valid_specialties)

    if location:
        queryset = queryset.filter(profile__location__icontains=location)

    if anywhere and anywhere.lower() == "true":
        queryset = queryset.filter(workplace_type="Remote")

    if freelance and freelance.lower() == "true":
        queryset = queryset.filter(employment_type="Freelance / Contract hire")

    if fulltime and fulltime.lower() == "true":
        queryset = queryset.filter(employment_type="Full-time employee")

    queryset = queryset.order_by("-profile__is_pro", "profile__user__date_joined", "-profile__user__is_staff", "-profile__user__is_superuser")

    serializer = JobProfileSerializer(queryset, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

##################### Job #####################
