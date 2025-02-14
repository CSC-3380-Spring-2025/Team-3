// start.js script to ensure uniform startup
const { execSync } = require('child_process');

function runCommand(command) {
  console.log(`\nRunning: ${command}`);
  try {
    // { shell: true } should make this work cross-platform
    execSync(command, { stdio: 'inherit', shell: true });
  } catch (error) {
    console.error(`Error while running command: ${command}`);
    process.exit(1);
  }
}

console.log('Starting development workflow...');

//Start Docker Compose (make sure Docker & Docker Compose are installed)
runCommand('docker-compose up -d');

/*Install npm dependencies (need node version >= 18 I think, but y'all shouldve had it done 
automatically)*/
runCommand('npm install');

//Starts server, navigate to http://localhost:3000 to view in browser (I think)
runCommand('npm run dev')

//Build the Next.js project (For production)
//runCommand('npm run build');

//Start the production server
//runCommand('npm start');
