const spawn = require('child_process').spawn;
const handler = spawn('php', ['-S', 'localhost:8007', '-t', 'public/']);

handler.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

handler.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

handler.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
