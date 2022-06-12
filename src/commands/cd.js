import path from 'path';
import { access } from 'fs/promises';

export async function cd(currentDir, pathToDir) {
    let actualPathToDir = path.join(currentDir, pathToDir);
    try {
        await access(actualPathToDir);
        return actualPathToDir
    } catch (err) {
        console.log('Operation failed');
        return currentDir
    }
};