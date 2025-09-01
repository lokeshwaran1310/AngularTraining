#!/bin/bash

echo "🚀 Starting Full-Stack Day4p1 Application..."

# Start backend
echo "📦 Starting Spring Boot Backend..."
cd phase1/day4p1/backend
mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 30

# Start frontend
echo "🌐 Starting Angular Frontend..."
cd ../frontend
npm install
ng serve --host 0.0.0.0 --port 4200 &
FRONTEND_PID=$!

echo "✅ Full-Stack Application Started!"
echo "🔗 Backend: http://localhost:8080"
echo "🔗 Frontend: http://localhost:4200"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for user to stop
wait