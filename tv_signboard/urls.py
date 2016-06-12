
"""SimpleScroller URL Configuration
"""
from django.conf.urls import url
from . import views
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.home),
    url(r'^tv/^(?P<id>[0-9]*/)', views.tv),
    url(r'^tv/^($P<id>[0-9]*/array/', views.tv_array),
    url(r'^slide/^(?P<id>[0-9]*)/', views.slide),
    url(r'^manage/', views.manage)
]
