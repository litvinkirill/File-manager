import crypto from 'crypto';
import fs from 'fs/promises';
import path from 'path';

let isFile;

export const calculateHash = async (currentPath, pathToFile) => {

    let pathToHashFile;
    (pathToFile.startsWith('C:\\') || pathToFile.startsWith('\\') || pathToFile.startsWith('D:\\')) ?
        pathToHashFile = pathToFile :
        pathToHashFile = path.join(currentPath, pathToFile);

    try {
        const fileBuffer = await fs.readFile(pathToHashFile);
        const hashSum = crypto.createHash('sha256');

        hashSum.update(fileBuffer);
        const hex = hashSum.digest('hex');
        console.log(hex);

    } catch (error) {
        const info = await fs.stat(path.join(pathToHashFile));
        info.isFile() ? isFile = "Directory" : isFile = "File";
        console.log(`Operation failed \nThere is not a ${isFile}`);
    }
};