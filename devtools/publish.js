const { execSync } = require('child_process');
const fs = require('fs');

const args = process.argv;
const tag = args.length > 2 ? args[2] : null;

if (isNaN(parseFloat(tag))) {
    console.error('Error: please provide a numeric version tag.');
}

function getCurrentVersion()
{
    const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

    return packageJson.version;
}

function checkVersionIsValid(targetVersion)
{
    return getPossibleTargetVersions().includes(targetVersion);
}

function getPossibleTargetVersions()
{
    const version = getCurrentVersion();
    const [currentMajor, currentMinor, currentPatch] = version.split('.');

    return [
        `${currentMajor}.${currentMinor}.${parseInt(currentPatch) + 1}`,
        `${currentMajor}.${parseInt(currentMinor) + 1}.0`,
        `${parseInt(currentMajor) + 1}.0.0`,
    ];
}

if (!checkVersionIsValid(tag)) {
    console.error(`You have entered an invalid version based on the current version which is: ${getCurrentVersion()}. Did you mean one of these: ${getPossibleTargetVersions().join(', ')}`)
    process.exit();
}

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
    'git checkout main',
    'git merge dev --no-edit',
    'npm run build',
    'npm run test',
    `npm run update-version ${tag}`,
    'node ./bin/badger --version ./package.json',
    `git add .`,
    `git commit -m "Release ${tag}${commitMessage ? ' - ' + commitMessage : ''}"`,
    'git push',
    `git tag -a ${tag} -m "Release ${tag}"`,
    `git push origin ${tag}`,
    'npm publish',
    'git checkout dev',
    'git merge main --no-edit',
    'git push',
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