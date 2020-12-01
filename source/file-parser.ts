import fs from 'fs';

export const parseFile = async (path: string): Promise<string[]>  => {
    const text = await fs.promises.readFile(path);
    return text.toString('utf8').split("\n");
}