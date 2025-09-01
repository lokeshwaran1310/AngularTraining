# 🚀 Run Full-Stack Apps in GitHub Codespaces

## Quick Start

1. **Open in Codespaces:**
   - Go to your GitHub repository
   - Click **Code** → **Codespaces** → **Create codespace on main**

2. **Run Day4p1 Full-Stack:**
   ```bash
   chmod +x start-fullstack.sh
   ./start-fullstack.sh
   ```

3. **Access Your Apps:**
   - **Frontend**: Click the forwarded port 4200 link
   - **Backend API**: Click the forwarded port 8080 link

## Manual Setup

### Backend (Terminal 1):
```bash
cd phase1/day4p1/backend
mvn spring-boot:run
```

### Frontend (Terminal 2):
```bash
cd phase1/day4p1/frontend
npm install
ng serve --host 0.0.0.0
```

## Features Available:
- ✅ JWT Authentication
- ✅ User Registration/Login
- ✅ Bug Management
- ✅ Full CRUD Operations
- ✅ Real-time API Integration

## Ports:
- **Backend**: 8080
- **Frontend**: 4200

Both ports are automatically forwarded and accessible via HTTPS URLs provided by Codespaces!