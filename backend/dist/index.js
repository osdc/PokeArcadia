"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const directoryPath = node_path_1.default.resolve(__dirname, './Entries');
    console.log("Resolved directory path:", directoryPath);
    try {
        // Check if the directory exists
        yield promises_1.default.access(directoryPath);
    }
    catch (err) {
        console.error('Directory does not exist', err);
        res.status(500).send('Entries directory not found');
        return;
    }
    try {
        const files = yield promises_1.default.readdir(directoryPath);
        console.log('Files found:', files);
        const users = [];
        // Process files concurrently
        yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            if (node_path_1.default.extname(file) !== '.txt') {
                console.warn(`Skipping non-txt file: ${file}`);
                return;
            }
            const filePath = node_path_1.default.join(directoryPath, file);
            try {
                const data = yield promises_1.default.readFile(filePath, 'utf8');
                if (!data) {
                    console.warn(`Empty file found: ${file}`);
                    return;
                }
                const parts = data.split(';').map(item => item.trim()).filter(Boolean);
                if (parts.length < 4) {
                    console.warn(`Incomplete data in file ${file}:`, parts);
                    return;
                }
                const [name, enrl, numberStr, oneLiner] = parts;
                const number = parseInt(numberStr, 10);
                if (isNaN(number)) {
                    console.warn(`Invalid number in file ${file}: ${numberStr}`);
                    return;
                }
                const userEntry = {
                    name,
                    enrl,
                    number,
                    oneLiner
                };
                users.push(userEntry);
            }
            catch (error) {
                console.error(`Error reading file ${file}:`, error);
            }
        })));
        if (users.length === 0) {
            console.warn("No valid user entries found in the Entries directory.");
        }
        else {
            console.log('Parsed User Entries:', users);
        }
        res.json({ userPokemons: users });
    }
    catch (err) {
        console.error('Error processing files:', err);
        res.status(500).send('Error processing entries');
    }
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
