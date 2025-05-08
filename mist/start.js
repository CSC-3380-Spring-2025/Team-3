#!/usr/bin/env node
const { execSync, spawn } = require('child_process');

// Helper to run a blocking command
function runCommand(command, options = {}) {
  console.log(`\nRunning: ${command}`);
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (err) {
    console.error(`Error while running: ${command}`);
    process.exit(1);
  }
}

console.log('Starting development workflow...');

// 1) Pull latest changes
runCommand('git pull');
// 2) Bring up Mongo in Docker (if you still need it)
runCommand('docker-compose up -d');
// 3) Install dependencies
runCommand('npm install');

// 4) Launch only the frontend
console.log('\nStarting frontend (Next.js) in mist/ …');
const frontend = spawn('npm run dev', {
  cwd: 'mist',
  shell: true,
  stdio: 'inherit',
});
frontend.on('error', err => {
  console.error('Failed to start frontend:', err);
  process.exit(1);
});
