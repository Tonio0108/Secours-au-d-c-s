@echo off
start cmd /k "npm run dev" 
cd backend
start cmd /k "node server.js"
