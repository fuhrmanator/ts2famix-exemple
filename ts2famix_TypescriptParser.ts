import { TypescriptParser } from "typescript-parser";


const myAsync = async (): Promise<Record<string, number | string>> => {
    const parser = new TypescriptParser();
    const parsed = await parser.parseFile('./Car.ts', 'workspace root');
    console.log(parsed);
    return;
}

myAsync();