import time

from selenium import webdriver
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from django.urls import reverse


class TestProjectListPage(StaticLiveServerTestCase):

    def setUp(self):
        self.browser = webdriver.Edge('functional_tests/msedgedriver.exe')

    def tearDown(self):
        self.browser.close()

    def test_no_project_alert_is_displayed(self):
        self.browser.get(self.live_server_url)

        alert = self.browser.find_element_by_css_selector('body')
        self.assertEquals(
            alert.find_element_by_tag_name('h1').text,
            'Not Found'
        )

    def test_no_project_alert_is_displayed_(self):
        self.browser.get(self.live_server_url)

        alert = self.browser.find_element_by_css_selector('body')
        self.assertEquals(
            alert.find_element_by_tag_name('p').text,
            'The requested resource was not found on this server.'
        )