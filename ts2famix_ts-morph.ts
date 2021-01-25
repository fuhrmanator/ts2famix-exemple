import { ClassDeclaration, Project } from "ts-morph";
import { Element, MSEDocument } from "./src/MSEDocument";

let id: number = 1;

const project = new Project();

const famixPrefix = "Famix-Java-Entities";

let mseDocument = new MSEDocument(null, famixPrefix);

console.log(mseDocument.toMSE());

project.addSourceFilesAtPaths("sample-ts/**/*.ts");

project.getSourceFiles().forEach(sourceFile => {
    // sourceFile.forEachChild(node => {
    //     console.log(node)
    // });

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
            addClassToMSE(clazz, mseDocument);
        });
    }

    if (hasInterfaces) {
        console.log('Found interfaces:');
        sourceFile.getInterfaces().forEach(interfaze => {
            console.log('Interface ' + interfaze.getName());
        });
    }
});

console.log(mseDocument.toMSE());


function addClassToMSE(clazz: ClassDeclaration, mseDocument: MSEDocument) {
    const jsonObj = {
                        "name": "Class", 
                        "id": id++, 
                        "attrs": [
                            {
                                "name": "name", 
                                "vals": [
                                    "'" + clazz.getName() + "'"
                                ]
                            }
                        ] 
                    };
    let el: Element = new Element(jsonObj, famixPrefix);
    mseDocument.addElement(el);
}