from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

urlpatterns = [
    path('login/', login_view, name='login'),
    path('signup/', signup_view, name='signup'),
    path('password_reset/', password_reset_view, name='password_reset'),
    path('password_reset/confirm/', password_reset_confirm_view, name='password_reset_confirm'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('logout/', logout_view, name='logout'),

    ##################### profile #####################

    path('update-profile/', update_profile, name='update_profile'),
    path('password-change/', change_password, name='change_password'),
    path('get-user-profile/', get_user_profile, name='get_user_profile'),
    path('get-user-works/', get_user_works, name='get_user_works'),
    path('get-user-collections/', get_user_collections, name='get_user_collections'),
    path('get-user-likes/', get_user_likes, name='get_user_likes'),
    path('get-about-user-profile/', get_about_user_profile, name='get_about_user_profile'),
    path('get-draft-works/', get_draft_works, name='get_draft_works'),
    path('get-other-user-profile/<int:id>', get_other_user_profile, name='get_other_user_profile'),
    path('get-other-user-works/<int:id>', get_other_user_works, name='get_other_user_works'),
    path('get-other-user-collections/<int:id>', get_other_user_collections, name='get_other_user_collections'),
    path('get-other-user-likes/<int:id>', get_other_user_likes, name='get_other_user_likes'),
    path('get-about-other-user-profile/<int:id>', get_about_other_user_profile, name='get_about_other_user_profile'),
    path('search-designers-filter', search_designers_view, name='search_designers_view'),
    path('search-profiles/<str:category1>/<str:category2>', search_profiles_view, name='search_profiles_view'),
    path('create-work-availability/', create_work_availability, name='create_work_availability'),
    path('update-work-availability/', update_work_availability, name='update_work_availability'),
    path('create-work-history/', create_work_history, name='create_work_history'),
    path('update-work-history/<int:id>', update_work_history, name='update_work_history'),
    path('delete-work-history/<int:id>', delete_work_history, name='delete_work_history'),
    path('create-education/', create_education, name='create_education'),
    path('update-education/<int:id>', update_education, name='update_education'),
    path('delete-education/<int:id>', delete_education, name='delete_education'),
    path('create-specialty/', create_specialty, name='create_specialty'),
    path('update-specialty/<int:id>', update_specialty, name='update_specialty'),
    path('delete-specialty/<int:id>', delete_specialty, name='delete_specialty'),
    path('create-skill/', create_skill, name='create_skill'),
    path('update-skill/<int:id>', update_skill, name='update_skill'),
    path('delete-skill/<int:id>', delete_skill, name='delete_skill'),

    ##################### profile #####################

    ##################### Work #####################

    path('create-work/', create_work, name='create_work'),
    path('update-work/<int:id>', update_work, name='update_work'),
    path('delete-work/<int:id>', delete_work, name='delete_work'),
    path('delete-work-media/<int:id>/<uuid:uid>', delete_work_media, name='delete_work_media'),
    path('delete-work-gallery/<int:id>/<uuid:uid>', delete_work_gallery, name='delete_work_gallery'),
    path('work-details/<int:id>', work_details, name='work_details'),
    path('get-works/<str:category1>/<str:category2>', get_works_views, name='get_works_views'),

    ##################### Work #####################

    ##################### React #####################

    path('create-collection/', create_collection, name='create_collection'),
    path('update-collection/<int:id>', update_collection, name='update_collection'),
    path('delete-collection/<int:id>', delete_collection, name='delete_collection'),
    path('add-work-to-collections/<int:id>', add_work_to_collections, name='add_work_to_collections'),
    
    path('create-like/<int:id>', create_like, name='create_like'),
    path('delete-like/<int:id>', delete_like, name='delete_like'),

    path('create-view/<int:id>', create_view, name='create_view'),

    path('create-share/<int:id>', create_share, name='create_share'),

    path('create-follow/<int:id>', create_follow, name='create_follow'),
    path('delete-follow/<int:id>', delete_follow, name='delete_follow'),
    
    path('create-comment/<int:id>', create_comment, name='create_comment'),
    path('update-comment/<int:id>', update_comment, name='update_comment'),
    path('delete-comment/<int:id>', delete_comment, name='delete_comment'),
    path('get-comments/<int:id>', get_comments_view, name='get_comments_view'),

    path('create-bookmarked/<int:id>', create_bookmarked, name='create_bookmarked'),
    path('delete-bookmarked/<int:id>', delete_bookmarked, name='delete_bookmarked'),
    path('get-bookmarked/', get_bookmarked_view, name='get_bookmarked_view'),

    path('create-design-request/<int:id>', create_design_request, name='create_design_request'),
    path('delete-design-request/<uuid:uid>', delete_design_request, name='delete_design_request'),
    path('add-in-archive/<uuid:uid>', add_to_archive, name='add_to_archive'),
    path('add-in-inbox/<uuid:uid>', add_to_inbox, name='add_to_inbox'),
    path('get-inbox-design-request/', get_inbox_design_requests_view, name='get_inbox_design_requests_view'),
    path('get-archive-design-request/', get_archive_design_requests_view, name='get_archive_design_requests_view'),
    
    path('create-chat-message/<uuid:uid>', create_chat_message, name='create_chat_message'),
    path('update-chat-message/<uuid:uid>/<int:id>', update_chat_message, name='update_chat_message'),
    path('delete-chat-message/<uuid:uid>/<int:id>', delete_chat_message, name='delete_chat_message'),
    path('get-chat-messages/<uuid:uid>', get_chat_messages, name='get_chat_messages'),
    
    path('block-user/<int:id>', block_user, name='block_user'),
    path('unblock-user/<int:id>', unblock_user, name='unblock_user'),
    path('report-user/<int:id>', report_user, name='report_user'),
    
    path('create-job/', create_job, name='create_job'),
    path('update-job/<int:id>', update_job, name='update_job'),
    path('delete-job/<int:id>', delete_job, name='delete_job'),
    path('job-details/<int:id>', job_details, name='job_details'),
    path('job-filter', job_filter_view, name='job_filter_view'),

    ##################### React #####################

]
