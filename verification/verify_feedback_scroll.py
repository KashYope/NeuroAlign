from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:3001")

    page.get_by_role("button", name="Feedback").click()

    # Wait for the modal to appear
    page.wait_for_selector(".fixed.inset-0.z-\[200\]")

    # Find the "Quality of tips" label and scroll it into view
    tips = page.get_by_text("Quality of tips")
    expect(tips).to_be_visible() # This might fail if not in view? No, visible usually means attached and not hidden by style.
    # But for screenshot we need it in viewport.

    tips.scroll_into_view_if_needed()

    # Take screenshot
    page.screenshot(path="verification/feedback_modal_scrolled.png")

    print("Verification screenshot taken at verification/feedback_modal_scrolled.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
