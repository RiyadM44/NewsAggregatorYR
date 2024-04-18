# views.py
from django.shortcuts import render
import requests

def save_text_input(request):
    return render(request, 'index.html')

def home(request):
    query = request.GET.get('query')  # Get the search query from the request
    api_key = 'fbc50f8083bb4dada1367e8345947f14'
    url = f'https://newsapi.org/v2/everything?q={query}&from=2024-03-18&sortBy=publishedAt&apiKey={api_key}'  
    response = requests.get(url)
    response.raise_for_status()
    data = response.json()
    articles = data.get('articles', [])

    return render(request, 'News.html', {'articles': articles, 'query': query})
