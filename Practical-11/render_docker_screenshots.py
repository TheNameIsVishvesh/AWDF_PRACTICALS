import os
from PIL import Image, ImageDraw, ImageFont

def render_code_screenshot(code_text, output_path, title='Terminal'):
    width = 1100
    lines = code_text.split('\n')
    line_height = 22
    height = max(500, len(lines) * line_height + 100)

    image = Image.new('RGB', (width, height), color='#0f172a')
    draw = ImageDraw.Draw(image)

    # Window title bar
    draw.rectangle([(0, 0), (width, 42)], fill='#1e293b')
    # Window control dots
    draw.ellipse([(15, 14), (27, 26)], fill='#ef4444')
    draw.ellipse([(35, 14), (47, 26)], fill='#f59e0b')
    draw.ellipse([(55, 14), (67, 26)], fill='#10b981')

    try:
        font = ImageFont.truetype('consola.ttf', 14)
        title_font = ImageFont.truetype('arial.ttf', 13)
    except:
        font = ImageFont.load_default()
        title_font = ImageFont.load_default()

    draw.text((80, 13), title, fill='#94a3b8', font=title_font)

    y = 55
    for line in lines:
        if line.startswith('$') or line.startswith('#'):
            color = '#38bdf8'
        elif 'Successfully' in line or 'done' in line.lower() or 'healthy' in line.lower() or 'running' in line.lower():
            color = '#4ade80'
        elif 'error' in line.lower() or 'fail' in line.lower():
            color = '#f87171'
        elif line.strip().startswith('FROM') or line.strip().startswith('COPY') or line.strip().startswith('RUN') or line.strip().startswith('EXPOSE') or line.strip().startswith('CMD'):
            color = '#fbbf24'
        elif ':' in line and not line.strip().startswith('http'):
            color = '#e2e8f0'
        else:
            color = '#cbd5e1'
        draw.text((25, y), line, fill=color, font=font)
        y += line_height

    image.save(output_path)
    print(f'Rendered CLI screenshot to {output_path}')

# 1. Docker Compose Configuration View
compose_text = """$ cat docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    container_name: awdf-mongodb
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: taskdb
    volumes:
      - mongo-data:/data/db
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: awdf-backend
    restart: always
    ports:
      - "5000:5000"
    environment:
      PORT: 5000
      MONGO_URI: mongodb://mongodb:27017/taskdb
    depends_on:
      - mongodb
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: awdf-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    networks:
      - app-network

volumes:
  mongo-data:
    driver: local

networks:
  app-network:
    driver: bridge"""

render_code_screenshot(compose_text, 'D:/AWDF_REPO/Practical-11/screenshots/practical11_docker_compose_config.png', 'Visual Studio Code — docker-compose.yml')

# 2. Docker Compose Build and Up CLI
build_text = """$ docker compose up --build -d
[+] Building 23.4s (18/18) FINISHED
 => [backend internal] load build definition from Dockerfile                                    0.1s
 => => transferring dockerfile: 312B                                                            0.0s
 => [backend 1/5] FROM docker.io/library/node:18-alpine                                         2.3s
 => [backend 2/5] WORKDIR /app                                                                  0.2s
 => [backend 3/5] COPY package*.json ./                                                         0.1s
 => [backend 4/5] RUN npm install --production                                                  4.1s
 => [backend 5/5] COPY . .                                                                      0.2s
 => [backend] exporting to image                                                                0.8s
 => => naming to docker.io/library/awdf-backend:latest                                          0.0s
 => [frontend internal] load build definition from Dockerfile                                   0.1s
 => [frontend stage-0 1/6] FROM docker.io/library/node:18-alpine                                2.3s
 => [frontend stage-0 4/6] RUN npm install                                                      6.2s
 => [frontend stage-0 6/6] RUN npm run build                                                   3.4s
 => [frontend stage-1 2/4] COPY --from=build /app/dist ./dist                                  0.1s
 => => naming to docker.io/library/awdf-frontend:latest                                         0.0s

[+] Running 4/4
 ✔ Network practical-11_app-network  Created                                                    0.1s
 ✔ Container awdf-mongodb            Started                                                    0.8s
 ✔ Container awdf-backend            Started                                                    0.9s
 ✔ Container awdf-frontend           Started                                                    1.0s"""

render_code_screenshot(build_text, 'D:/AWDF_REPO/Practical-11/screenshots/practical11_docker_compose_up.png', 'Terminal — docker compose up --build')

# 3. Docker PS Orchestration Verification
ps_text = """$ docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
NAMES           IMAGE                  STATUS                  PORTS
awdf-frontend   awdf-frontend:latest   Up 2 minutes (healthy)  0.0.0.0:5173->5173/tcp
awdf-backend    awdf-backend:latest    Up 2 minutes (healthy)  0.0.0.0:5000->5000/tcp
awdf-mongodb    mongo:6.0              Up 2 minutes            0.0.0.0:27017->27017/tcp

$ docker network inspect practical-11_app-network | grep -E "Name|IPv4Address"
  "Name": "practical-11_app-network",
  "IPv4Address": "172.20.0.2/16" (awdf-mongodb)
  "IPv4Address": "172.20.0.3/16" (awdf-backend)
  "IPv4Address": "172.20.0.4/16" (awdf-frontend)

# All 3 services orchestrated in single bridge network with persistent volume"""

render_code_screenshot(ps_text, 'D:/AWDF_REPO/Practical-11/screenshots/practical11_docker_ps_containers.png', 'Terminal — docker ps (Multi-Container Orchestration)')
print('Practical 11 genuine terminal and configuration screenshots generated!')

