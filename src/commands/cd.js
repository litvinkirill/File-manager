import path from 'path';
import { access } from 'fs/promises';

export async function cd(currentDir, pathToDir) {

    let pathToCreateFile;
    (pathToDir.startsWith('C:\\') || pathToDir.startsWith('\\') || pathToDir.startsWith('D:\\')) ?
    pathToCreateFile = pathToDir :
    pathToCreateFile = path.join(currentDir, pathToDir);

    try {
        await access(pathToCreateFile);
        return pathToCreateFile
    } catch (err) {
        console.log('Operation failed');
        return currentDir
    }
};
