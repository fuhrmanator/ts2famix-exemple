import { Project } from "ts-morph";
import { ClassDeclaration } from "typescript-parser";

const project = new Project();

project.addSourceFilesAtPaths("sample-ts/**/*.ts");

const sourceFile = project.getSourceFileOrThrow("AnotherCar.ts");

const hasClasses = sourceFile.getClasses().length > 0;
const hasInterfaces = sourceFile.getInterfaces().length > 0;

if (hasClasses) {
    console.log('Found classes:');
    sourceFile.getClasses().forEach(clazz => {
        console.log('Class ' + clazz.getName());
        if (clazz.getConstructors().length > 0) {
            clazz.getConstructors().forEach(construct => {
                console.log(" Constructor: ");
                construct.getParameters().forEach(param => {
                    console.log('  Parameter: ' + param.getName() + ', type: ' + param.getType().getText());
                })
            })
        }
    });
}

if (hasInterfaces) {
    console.log('Found interfaces:');
    sourceFile.getInterfaces().forEach(interfaze => {
        console.log('Interface ' + interfaze.getName());
    });
}
