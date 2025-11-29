### 1. Build the Docker Image

```bash
cd /home/megabytis/Documents/GitHub/ShopNexus/server
docker build -t shopnexus-backend .
```

### 2. Run with Docker Compose

```bash
docker-compose up -d
```

### 3. Check Status

```bash
docker-compose ps
```

### 4. View Logs

```bash
docker-compose logs -f backend
```

### 5. Test Health Endpoint

```bash
curl http://localhost:8888/health
```

Expected response:

```json
{ "status": "ok", "timestamp": "2025-11-29T14:07:24.000Z" }
```

### 6. Stop the Container

```bash
docker-compose down
```

## 🔧 Troubleshooting

### Container won't start?

```bash
# Check logs
docker-compose logs backend

# Check if port 8888 is already in use
lsof -i :8888
```

### Database connection issues?

- Verify MongoDB Atlas allows connections from your IP
- Check Redis Cloud firewall settings
- Ensure credentials in docker-compose.yml are correct

### Rebuild after code changes:

```bash
docker-compose up -d --build
```
