#!/bin/bash

# Start development servers for Cypress testing
echo "🚀 Starting development servers for Cypress testing..."

# Function to kill background processes on exit
cleanup() {
    echo "🧹 Cleaning up processes..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set trap to cleanup on script exit
trap cleanup EXIT

# Start backend server
echo "📡 Starting backend server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend server  
echo "🎨 Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for servers to be ready
echo "⏳ Waiting for servers to be ready..."
sleep 5

# Check if servers are running
echo "🔍 Checking server status..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ Backend server is running"
else
    echo "❌ Backend server is not responding"
fi

if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Frontend server is running"  
else
    echo "❌ Frontend server is not responding"
fi

echo ""
echo "🎯 Servers are ready for testing!"
echo "📖 To run Cypress tests:"
echo "   npm run test:e2e          # Run tests headless"
echo "   npm run test:e2e:open     # Open Cypress UI"
echo ""
echo "🛑 Press Ctrl+C to stop servers"

# Keep script running
wait