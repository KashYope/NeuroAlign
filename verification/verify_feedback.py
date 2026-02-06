from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Go to homepage (Vite default port 3001)
    page.goto("http://localhost:3001")

    # Wait for the feedback button and click it
    # Use get_by_role('button', name='Feedback') or get_by_text('Feedback')
    # The button has text 'Feedback' inside a span
    page.get_by_role("button", name="Feedback").click()

    # Wait for modal content
    # Look for the new category label
    tips_label = page.get_by_text("Quality of tips")
    expect(tips_label).to_be_visible()

    # Scroll the modal to make sure the new item is visible (it's at the bottom)
    # The modal content is overflow-y-auto.
    # We can just scroll into view if needed, but playwright auto-scrolls for actions.
    # Let's take a screenshot of the modal.

    # Find the modal container
    modal = page.locator(".fixed.inset-0.z-\[200\]")
    expect(modal).to_be_visible()

    # Find the new 'Did not use' checkbox for this category
    # It's hard to distinguish specifically for 'tips' without more structural logic,
    # but we can check if there is a 'Did not use / N/A' near 'Quality of tips'.

    # Let's just take a screenshot of the whole page (modal covers it)
    page.screenshot(path="verification/feedback_modal.png")

    print("Verification screenshot taken at verification/feedback_modal.png")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
