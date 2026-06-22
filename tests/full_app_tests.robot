*** Settings ***
Library    SeleniumLibrary


*** Variables ***
${URL}         http://localhost:5173
${BROWSER}     chrome


*** Keywords ***
Open App As Logged In User
    Open Browser    ${URL}    ${BROWSER}
    Wait Until Page Contains    Please log in to the system
    Execute JavaScript    window.localStorage.setItem("token", "test123")
    Reload Page
    Wait Until Page Contains    ColabBoard2    timeout=10s



*** Test Cases ***
UI - Shows Login Message When Not Logged In
    Open Browser    ${URL}    ${BROWSER}
    Page Should Contain    Please log in to the system
    Close Browser

UI - Loads Board When Token Exists
    Open Browser    ${URL}    ${BROWSER}
    Wait Until Page Contains    Please log in to the system

    Execute JavaScript    window.localStorage.setItem("token", "test123")
    Reload Page

    Wait Until Page Contains    ColabBoard2    timeout=10s
    Close Browser


UI - Add New Column
    Open App As Logged In User
    Input Text    xpath=//input[@placeholder="Add new column title..."]    Test Column
    Click Button    css=.add-column-btn
    Wait Until Page Contains    Test Column
    Close Browser


UI - Add New Card
    Open App As Logged In User

    # Step 1: Create column first
    Input Text    xpath=//input[@placeholder="Add new column title..."]    Test Column
    Click Button    css=.add-column-btn
    Wait Until Page Contains    Test Column

    # Step 2: Now add card
    Wait Until Element Is Visible    css=.add-new-card-btn    timeout=10s
    Click Button    css=.add-new-card-btn

    # Step 3: Verify UI reacts
    Wait Until Page Contains    Title...

    Close Browser


UI - Search Cards
    Open App As Logged In User
    Input Text    css=.search-cards    test
    Close Browser


UI - Mark Card Done
    Open App As Logged In User

    # Ensure a column + card exists first
    Input Text    css=[data-testid="new-column-input"]    Test Column
    Click Button  css=[data-testid="add-column-btn"]
    Wait Until Element Is Visible    css=[data-testid^="add-card-"]

    Click Element    css=[data-testid^="add-card-"]
    Wait Until Element Is Visible    css=[data-testid^="done-"]

    # Click Done button (stable selector)
    Click Element    css=[data-testid^="done-"]

    Close Browser



UI - Add Comment
    Open App As Logged In User

    # Create column + card first (required state)
    Input Text    css=[data-testid="new-column-input"]    Test Column
    Click Button  css=[data-testid="add-column-btn"]
    Wait Until Element Is Visible    css=[data-testid^="add-card-"]

    Click Element    css=[data-testid^="add-card-"]
    Wait Until Element Is Visible    css=[data-testid^="comment-input-"]

    # Add comment using stable selector
    Input Text    css=[data-testid^="comment-input-"]    My comment
    Press Keys    css=[data-testid^="comment-input-"]    ENTER

    Wait Until Page Contains    My comment

    Close Browser


UI - Save Board
    Open App As Logged In User

    Wait Until Element Is Visible    css=[data-testid="save-board"]

    Click Element    css=[data-testid="save-board"]

    Close Browser


UI - Delete Column
    Open App As Logged In User

    # Create a column first (required)
    Input Text    css=[data-testid="new-column-input"]    Test Column
    Click Button  css=[data-testid="add-column-btn"]

    Wait Until Element Is Visible    css=[data-testid^="delete-column-"]

    # Click delete using stable selector
    Click Element    css=[data-testid^="delete-column-"]

    Close Browser


UI - Search Input Visible
    Open App As Logged In User
    Page Should Contain Element    css=[data-testid="search-input"]
    Close Browser