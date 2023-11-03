const { execSync } = require('child_process');
const args = process.argv;
const tag = args[2];
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
    `git commit -m "Release ${tag}"`,
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
   } catch (error) {
       console.error(`There was an error: ${error}`);
       readline.close();
   }
});

return;