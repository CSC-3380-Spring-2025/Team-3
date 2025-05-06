toFile = false; 
const { execSync, spawn } = require('child_process');

function runCommand(command) {
  console.log(`\nRunning: ${command}`);
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error while running command: ${command}`);
    process.exit(1);
  }
}

console.log('Starting development workflow...');

runCommand('git pull');

runCommand('docker-compose up -d');

runCommand('npm install');

deployServers();

function deployServers() {

  console.log('Starting backend (Express) in mist_server/ ...');
  spawn('npm', ['run', 'dev'], {
    cwd: 'mist_server',
    shell: true,
    stdio: 'inherit',
  });

  console.log('Starting frontend (Next.js) in mist/ ...');
  spawn('npm', ['run', 'dev'], {
    cwd: 'mist',
    shell: true,
    stdio: 'inherit',
  });
}
