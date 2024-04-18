# tests.py
from django.test import TestCase, SimpleTestCase
from django.template.loader import render_to_string
from django.urls import reverse, resolve
from .views import save_text_input, home

class TemplateTestCase(TestCase):
    def test_index_template(self):
        rendered = render_to_string('index.html')
        self.assertIn('Welcome to Our News Website Hello World', rendered)
        self.assertIn('Stay informed with the latest news from around the world.', rendered)

    def test_news_template(self):
        rendered = render_to_string('News.html', {'articles': [{'title': 'Test Article', 'description': 'Test Description', 'url': 'https://example.com'}]})
        self.assertIn('News Feed', rendered)
        self.assertIn('Welcome to our news website. Stay updated with the latest news about Tesla and more!', rendered)
        self.assertIn('Test Article', rendered)
        self.assertIn('Test Description', rendered)
        self.assertIn('https://example.com', rendered)

class UrlTestCase(SimpleTestCase):
    def test_save_text_input_url_resolves(self):
        url = reverse('save_text_input')
        self.assertEqual(resolve(url).func, save_text_input)

    def test_home_url_resolves(self):
        url = reverse('home')
        self.assertEqual(resolve(url).func, home)
