import zlib from 'node:zlib';
import fs from 'fs';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import path from 'path';

export const archive = async (command, currentPath, pathToFile, pathToDestination) => {

    let correctPathToFile;
    let correctPathToDest;

    const pipe = promisify(pipeline);

    (pathToFile.startsWith('C:\\') || pathToFile.startsWith('\\') || pathToFile.startsWith('D:\\')) ?
        correctPathToFile = pathToFile :
        correctPathToFile = path.join(currentPath, pathToFile);

    (pathToDestination.startsWith('C:\\') || pathToDestination.startsWith('\\') || pathToDestination.startsWith('D:\\')) ?
        correctPathToDest = pathToDestination :
        correctPathToDest = path.join(currentPath, pathToDestination);

    try {
        const readStream = fs.createReadStream(correctPathToFile, { flags: 'r' });

        const writeStream = fs.createWriteStream(correctPathToDest, { flags: 'wx' });

        command === 'compress' ? await pipe(readStream, zlib.createBrotliCompress(), writeStream) :
            await pipe(readStream, zlib.createBrotliDecompress(), writeStream);
        console.log(`${command} is done`);
    } catch (error) {
        console.log('Operation failed');
    }

};