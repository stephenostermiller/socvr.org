import path from 'path';
import fs from 'fs';
import JSON5 from 'json5';

const typeToLetter = (type) => {
    switch (type) {
        case "question": return "Q";
        case "answer": return "A";
        case "close reason": return "C";
        case "custom edit rejection": return "CRC";
        case "edit summary question": return "EQ";
        default: throw new Error(`'${type}' is not a valid type`);
    }
}

const convertJson5FileToJsonp = (json5FilePath) => {
    const fileNameWithoutExt = path.parse(json5FilePath).name;

    const json5FileContent = fs.readFileSync(json5FilePath, { encoding: "utf-8" });
    const data = JSON5.parse(json5FileContent);
    const formattedEntries = data.map(entry => {
        return {
            name: `[${typeToLetter(entry.type)}] ${entry.title}`,
            description: entry.body
        };
    });

    const jsonp = "callback(\n" + JSON.stringify(formattedEntries, null, 2) + ")";
    const outputFilePath = path.join('.', 'dist', 'comments', `${fileNameWithoutExt}.jsonp`);
    if (!fs.existsSync(path.dirname(outputFilePath))) {
        fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
    }
    fs.writeFileSync(outputFilePath, jsonp, { encoding: "utf-8" });
};

const commentsDirPath = path.join(import.meta.dirname, 'comments');

for (const partialFilePath of fs.readdirSync(commentsDirPath, { recursive: true }))
{
    const filePath = `./comments/${partialFilePath}`;
    if (path.parse(filePath).ext === '.json5')
    {
        console.log(filePath);
        convertJson5FileToJsonp(filePath);
    }
}
