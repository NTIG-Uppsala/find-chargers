from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver import ActionChains
import sys


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.google.com")
website = "https://tinyurl.com/Find-Charger"
driver.get(website)

#Clicks all the arrow buttons.
def Test_arrow_buttons():
    for i in range(1, 5):
        arrow_button = driver.find_element(By.ID, "{}".format(i))
        arrow_button.click()
        assert arrow_button.get_attribute("data-arrow") == "down"

#Clicks the menu button twice to see if arrow buttons reset as they should and then hides the menu.
def Test_menu():
    menu_button = driver.find_element(By.CSS_SELECTOR, "div#btn-nav > button")
    menu_button_nav = driver.find_element(By.ID, "btn-nav")
    for i in range(0, 2):
        menu_button.click()
    assert menu_button_nav.get_attribute("data-open") == "true"
    Test_arrow_buttons()
    menu_button.click()

#Clicks all the map markers and their view full button twice.
def Test_map_markers_and_popups():
    previous_arrow_position = ["side", "down"]
    for i in range(0, 2):
        for j in range(1, 5):
            map_marker = driver.find_element(By.ID, "marker{}".format(j))
            arrow_button = driver.find_element(By.ID, "{}".format(j))
            map_marker.click()
            view_full_button = driver.find_element(By.ID, "view-full-information")
            view_full_button.click()
            assert arrow_button != previous_arrow_position[i]

#Checks that the title is correct.
def Test_menu_text():
    menu_title = driver.find_element(By.ID, "menuTitle")
    assert menu_title.text == "Find chargers"

#Drags the map to check if mapbox functions are active.
def Test_map_movement():
    map = driver.find_element(By.ID, "map")
    reference_point = driver.find_element(By.ID, "marker1")
    ActionChains(driver).drag_and_drop_by_offset(map, 100, 100).perform()
    assert reference_point.location == {'x': 688, 'y': 686}


Test_arrow_buttons()
Test_menu()
Test_map_markers_and_popups()
Test_menu_text()
Test_map_movement()

driver.close()