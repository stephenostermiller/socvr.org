import fs from "fs-extra";
import { marked } from 'marked';
import { spawnSync } from "child_process";

export default {
    globelData: {
        foo: (input) => input + "!!",
        md: (fileName) => {
            const content = fs.readFileSync(fileName, "utf-8");
            return marked.parse(content, { async: false });
            //return fs.readFile(fileName, "utf-8")
            //    .then(marked.parse);
        }
    }
};
