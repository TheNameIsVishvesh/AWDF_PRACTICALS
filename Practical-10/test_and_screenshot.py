import urllib.request, json, time
from playwright.sync_api import sync_playwright

print('--- Testing Non-Blocking Asynchronous Event Processing ---')

# 1. Trigger POST /tasks
post_data = json.dumps({
    'title': 'Deploy Microservice Event Bus',
    'description': 'Demonstrate EventEmitter non-blocking notification pipeline',
    'assignedUser': 'vishvesh@charusat.edu.in'
}).encode('utf-8')

p_req = urllib.request.Request('http://localhost:5000/tasks', data=post_data, headers={'Content-Type': 'application/json'}, method='POST')

start_client = time.perf_counter()
with urllib.request.urlopen(p_req) as resp:
    post_res = json.loads(resp.read().decode())
    client_duration = (time.perf_counter() - start_client) * 1000
    print(f'API Response received in: {client_duration:.2f} ms')
    print('Response payload:', post_res)

# 2. Delete task 1 to test supplementary task-deleted event
del_req = urllib.request.Request('http://localhost:5000/tasks/1', method='DELETE')
with urllib.request.urlopen(del_req) as resp:
    del_res = json.loads(resp.read().decode())
    print('DELETE Response:', del_res['message'])

# 3. Wait 1.5 seconds for background workers to complete their delayed work
print('Waiting 1.5 seconds for asynchronous background workers to finish...')
time.sleep(1.5)

# 4. Fetch audit log to inspect timestamps
with urllib.request.urlopen('http://localhost:5000/events/audit') as resp:
    audit_data = json.loads(resp.read().decode())
    print('\nAudit Logs Proving Response Before Handler Completion:')
    for entry in audit_data['eventAuditLogs']:
        print(f"Event: {entry['event']} | Task: {entry['title']} | API Responded: {entry['apiRespondedAt']} | Worker Finished: {entry['handlerCompletedAt']}")

# 5. Capture screenshots
with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1100, 'height': 750})

    # Screenshot 1: GET /tasks showing task list
    page.goto('http://localhost:5000/tasks')
    page.screenshot(path='D:/AWDF_REPO/Practical-10/screenshots/practical10_tasks_list.png')

    # Screenshot 2: GET /events/audit showing timestamp evidence
    page.goto('http://localhost:5000/events/audit')
    page.screenshot(path='D:/AWDF_REPO/Practical-10/screenshots/practical10_event_audit_timestamps.png')

    browser.close()

print('Practical 10 testing and screenshots complete!')
