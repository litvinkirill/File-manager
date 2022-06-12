import fs from 'fs/promises';
import path from 'path';

let isFile;

export async function ls(pathToDir) {
    try {
        const readDir = await fs.readdir(path.join(pathToDir));
        console.log(readDir);
    } catch (err) {
        const info = await fs.stat(pathToDir);
        info.isFile() ? isFile = "File" : isFile = "Directory";
        console.log(`Operation failed \nThere is a ${isFile}`);
    }
}