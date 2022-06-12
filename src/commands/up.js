import path from 'path';

export async function up(workdir) {
    let newPathtoDir = path.join(workdir, "..");
    return newPathtoDir;
};