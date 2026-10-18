from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1280, 'height': 850})

    # 1. Initial Dashboard View
    page.goto('http://localhost:4180/')
    page.wait_for_selector('#task-title-input')
    time.sleep(1)

    # 2. Enter Task and Generate with AI (Happy Path)
    page.fill('#task-title-input', 'Configure Docker Multi-Container Architecture with Compose')
    page.click('#generate-ai-btn')
    page.wait_for_selector('#ai-disclaimer-box')
    time.sleep(0.8)
    page.screenshot(path='D:/AWDF_REPO/Practical-13/screenshots/practical13_ai_generated_suggestion.png')

    # Save to Database
    page.click('#submit-task-btn')
    time.sleep(0.5)

    # 3. Simulate AI Outage / Failure Path to prove Graceful Degradation
    page.click('#toggle-failure-btn')
    page.fill('#task-title-input', 'Deploy Microservices to Production Cloud')
    page.click('#generate-ai-btn')
    time.sleep(0.8)
    page.screenshot(path='D:/AWDF_REPO/Practical-13/screenshots/practical13_ai_graceful_degradation.png')

    browser.close()

print('Practical 13 genuine screenshots captured successfully!')
