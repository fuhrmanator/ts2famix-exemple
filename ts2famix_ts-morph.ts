import { Project } from "ts-morph";
// Super documentation : https://ts-morph.com/

const project = new Project();

project.addSourceFilesAtPaths("sample-ts/**/*.ts");

project.getSourceFiles().forEach(sourceFile => {
    console.log('Source file: ' + sourceFile.getBaseName());
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
});

