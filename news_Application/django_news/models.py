# models.py
from django.db import models

class NewsItem(models.Model):
    news_title = models.CharField(max_length=100)
    news_image_url = models.URLField()
    news_description = models.TextField()
    news_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.news_title
