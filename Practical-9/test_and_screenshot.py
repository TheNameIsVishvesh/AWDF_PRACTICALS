import urllib.request, json, time
from playwright.sync_api import sync_playwright

print('--- Benchmarking Uncached vs Cached ---')
uncached_times = []
for i in range(3):
    start = time.perf_counter()
    req = urllib.request.urlopen('http://localhost:5000/tasks/uncached')
    res = json.loads(req.read().decode())
    dur = (time.perf_counter() - start) * 1000
    uncached_times.append(dur)
    print(f'Uncached run {i+1}: {dur:.2f} ms')

urllib.request.urlopen('http://localhost:5000/tasks')

cached_times = []
for i in range(3):
    start = time.perf_counter()
    req = urllib.request.urlopen('http://localhost:5000/tasks')
    res = json.loads(req.read().decode())
    dur = (time.perf_counter() - start) * 1000
    cached_times.append(dur)
    print(f'Cached run {i+1} (source={res["source"]}): {dur:.2f} ms')

post_data = json.dumps({'title': 'New Task Triggering Invalidation'}).encode('utf-8')
p_req = urllib.request.Request('http://localhost:5000/tasks', data=post_data, headers={'Content-Type': 'application/json'}, method='POST')
with urllib.request.urlopen(p_req) as resp:
    print('POST Invalidation Response:', resp.status)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1100, 'height': 750})

    page.goto('http://localhost:5000/tasks/uncached')
    page.screenshot(path='D:/AWDF_REPO/Practical-9/screenshots/practical9_uncached_response.png')

    page.goto('http://localhost:5000/tasks')
    page.goto('http://localhost:5000/tasks')
    page.screenshot(path='D:/AWDF_REPO/Practical-9/screenshots/practical9_cached_response_hit.png')

    page.goto('http://localhost:5000/cache/metrics')
    page.screenshot(path='D:/AWDF_REPO/Practical-9/screenshots/practical9_cache_metrics.png')

    browser.close()

print('Practical 9 benchmark and screenshots complete!')
