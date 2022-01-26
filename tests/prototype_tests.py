from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver import ActionChains
import sys


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
driver.get("https://www.google.com")
website = "file:///C:/Users/jonatan.mone/Projects/find-chargers/docs/index.html"#"https://tinyurl.com/Find-Charger"
driver.get(website)

#Clicks all the arrow buttons.
arrow_list = driver.find_elements(By.CLASS_NAME, "btn-nav")
print(arrow_list[0].value_of_css_property("data-arrow"))
for i in range(1, 5):
    button = driver.find_element(By.ID, "{}".format(i))
    button.click()
    
    assert arrow_list[i-1] == "down"

#Clicks the menu button twice to see if arrow buttons reset, as they should and then hides the menu.
menu_button = driver.find_element(By.CSS_SELECTOR, "div#btn-nav > button")
for i in range(0, 2):
    menu_button.click()
menu_button.click()

#Clicks all the map markers and their view full button twice.
for i in range(0, 2):
    for j in range(1, 5):
        map_marker = driver.find_element(By.ID, "marker{}".format(j))
        map_marker.click()
        view_full_button = driver.find_element(By.ID, "view-full-information")
        view_full_button.click()

#Checks that the title is correct.
menu_title = driver.find_element(By.ID, "menu_title")
assert menu_title.text == "Find chargers"

#Drags the map to check if mapbox functions are active.
map = driver.find_element(By.ID, "map")
ActionChains(driver).drag_and_drop_by_offset(map, 100, 100).perform()
