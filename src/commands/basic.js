import fs from "fs/promises";
import path from 'path';
import * as constants from "constants";

export const cat = async (currentPath, pathToFile) => {
    try {
        const data = await fs.readFile(path.join(currentPath, pathToFile), "utf8");
        console.log(`Content of the file:\n${data}`);
    } catch (error) {
        console.log('Operation failed');
    }
}

export const add = async (currentPath, fileName) => {
    try {
        await fs.writeFile(path.join(currentPath, fileName), '', { flag: 'wx' });
        console.log(`${fileName} is created`);
    } catch (error) {
        console.log('Operation failed');
    }
};

export const rename = async (currentPath, fileName, newfilename) => {
    const pathToFolder = path.join(currentPath, fileName).split('\\');

    pathToFolder.splice(-1, 1);
    try {
        await fs.rename(
            path.join(currentPath, fileName),
            path.join(pathToFolder.join('\\'), newfilename)
        )
        console.log(`Operation done`);
    } catch (error) {
        console.log('Operation failed');
    }
};

export const cp = async (currentPath, pathToFile, pathToNewDir) => {
    let testPath;
    let finallyPath;
    const pathToFolder = path.join(currentPath, pathToFile).split('\\');
    const filename = pathToFolder.slice(-1);

    if (pathToFile.startsWith('C:\\') || pathToFile.startsWith('\\') || pathToFile.startsWith('D:\\')) {
        testPath = path.join(pathToFile);
        finallyPath = path.join(pathToNewDir, filename[0]);
    } else {
        testPath = path.join(currentPath, pathToFile);
        finallyPath = path.join(currentPath, pathToNewDir, filename[0])
    }
    try {
        await fs.copyFile(testPath,
            path.join(finallyPath),
            constants.COPYFILE_EXCL);
        console.log('File is copied');
    } catch (err) {
        err.code === 'EEXIST' ?
            console.log('Operation failed\nFile already exists') :
            console.log('Operation failed');
    }
};

export const remove = async (currentPath, pathToFile) => {
    let pathToRmFile;
    
    (pathToFile.startsWith('C:\\') || pathToFile.startsWith('\\') || pathToFile.startsWith('D:\\')) ?
        pathToRmFile = pathToFile :
        pathToRmFile = path.join(currentPath, pathToFile);
    try {
        await fs.unlink(pathToRmFile);
        console.log('File was deleted');
    } catch (error) {
        console.log('Operation failed');
    }
};

export const mv = async (currentPath, pathToFile, pathToNewDir) => {
    cp(currentPath, pathToFile, pathToNewDir).then(() => remove(currentPath, pathToFile))
};