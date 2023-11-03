const { execSync } = require('child_process');
const args = process.argv;
const tag = args[2];
let commitMessage = null;

if (args.length > 3) {
    commitMessage = args[3];
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const publishConfirm = `Publish your package with the tag: ${tag}? `;
const commands = [
    'npm run build',
    'npm run test',
    'node ./bin/badger --version ./package.json',
    `git tag -a ${tag} -m "Release ${tag}"`,
    `git add .`,
    `git commit -m "Release ${tag}${commitMessage ? ' - ' + commitMessage : ''}"`,
    'git push',
    `git push origin ${tag}`,
    'npm publish',
];

readline.question(publishConfirm, selection => {
   if (selection !== 'y') {
       console.log('Cancelling publish.');
       readline.close();
       return;
   }

   try {
       execSync(commands.join(' && '), {
           stdio: 'inherit'
       });
       readline.close();
   } catch (error) {
       console.error(`There was an error: ${error}`);
       readline.close();
   }
});

return;