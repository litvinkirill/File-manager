import readline from 'readline';
import { homedir } from 'os';

import * as nwd from './commands/nwd.js'
import * as basic_operation from './commands/basic.js'
import { osInfo } from './commands/os/index.js'
import { calculateHash } from './commands/hash/index.js'
import { archive } from './commands/zlib/zlib.js'

let userName;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let __dirname = homedir();

function startManager(args = process.argv) {

    if (args.length < 3) {
        console.log('Please enter user name (--username=your_name)');
        rl.close();
        return;
    }

    const userInfo = args[2].split('=');
    let [userKey, nameInfo] = userInfo;
    userName = nameInfo;

    if (userKey.startsWith('--')) userKey = userKey.slice(2);
    if (userKey === 'username' || userKey === 'userName') {
        console.log(`Welcome to the File Manager, ${userName}!`);
        questions();
    } else {
        console.log('Please enter user name (--username=your_name)');
        rl.close();
        return;
    }

    process.on('exit', (name) => {
        console.info(`\nThank you for using File Manager, ${name}!\n`);
        rl.close();
    })

    process.openStdin().on("keypress", (chunk, key) => {
        if (key && key.name === "c" && key.ctrl) {
            process.exit(userName);
        }
    });
}

function questions() {

    rl.question(`\nYou are currently in + ${__dirname}, please enter your command \n\n`,
        async (input) => {
            const [operation, ...path] = input.split(' ');
            const correctPath = path.filter(el => el !== '' && el !== ' ');

            switch (operation) {
                case '.exit':
                case 'exit': {
                    process.exit(userName);

                };
                case 'rn': {
                    await basic_operation.rename(__dirname, correctPath[0], correctPath[1]);
                    break;
                };
                case 'up': {
                    __dirname = await nwd.up(__dirname);
                    break;
                };
                case 'cd': {
                    __dirname = await nwd.cd(__dirname, correctPath.join(' '));
                    break;
                };
                case 'ls': {
                    await nwd.ls(__dirname);
                    break;
                };
                case 'cat': {
                    await basic_operation.cat(__dirname, correctPath.join(' '));
                    break;
                };
                case 'add': {
                    await basic_operation.add(__dirname, correctPath.join(' '));
                    break;
                };
                case 'cp': {
                    await basic_operation.cp(__dirname, correctPath[0], correctPath[1]);
                    break;
                };
                case 'rm': {
                    await basic_operation.remove(__dirname, correctPath[0]);
                    break;
                };
                case 'mv': {
                    await basic_operation.mv(__dirname, correctPath[0], correctPath[1]);
                    break;
                };
                case 'os': {
                    await osInfo(correctPath[0]);
                    break;
                }
                case 'hash': {
                    await calculateHash(__dirname, correctPath[0]);
                    break;
                }
                case 'compress': {
                    await archive('compress', __dirname, correctPath[0], correctPath[1]);
                    break;
                }
                case 'decompress': {
                    await archive('decompress', __dirname, correctPath[0], correctPath[1]);
                    break;
                }
                default: {
                    console.log('Invalid input');
                }
            }
            questions()
        })
}
startManager();