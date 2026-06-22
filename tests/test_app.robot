*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}    http://localhost:5173

*** Test Cases ***
Open Home Page
    Open Browser    ${URL}    chrome
    Title Should Not Be    ""
    Close Browser