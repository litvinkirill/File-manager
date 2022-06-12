import os from 'os';

export const osInfo = async (type) => {
    let command;
    type.startsWith('--') ? command = type.slice(2) : command = type;
    switch (command) {
        case 'homedir': {
            console.log(`homedir: ${os.homedir()}`)
            break;
        }
        case 'username': {
            console.log(`username: ${os.userInfo().username}`)
            break;
        }
        case 'architecture': {
            console.log(`architecture: ${os.arch()}`)
            break;
        }
        case 'EOL': {
            console.log(`EOL: ${JSON.stringify(os.EOL)}\n`
                + "EOL varies from os to os" + os.EOL
                + "For windows it is \\r\\n" + os.EOL
                + "For POSIX it is \\n" + os.EOL);
            break;
        }
        case 'cpus': {
            console.log(os.cpus())
            break;
        }
        default: {
            console.log('Invalid input');
        }
    }
}