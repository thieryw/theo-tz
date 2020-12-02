import * as fs from "fs";



const myArgs = (()=>{
    const out:string[] = []

    process.argv.forEach((arg, index) => {
        if(index < 2){
            return;
        }

        out.push(arg);
    });

    return out;

})();


const files = fs.readdirSync(`${myArgs[0]}`);

const tsFiles: string[] = [];


files.forEach(file =>{
    if(!file.endsWith(".jpg")){
        return;

    }

    tsFiles.push(file);

});



const newFileContent = (()=>{
    let out = "";


    tsFiles.forEach((file, index) => {
        out = out.concat(`\nimport img${index} from "./${file}";`);
    });

    out = out.concat("\n export const images = [");

    tsFiles.forEach((file, index)=>{
        if(index === tsFiles.length - 1){
            out = out.concat(`img${index}];`);
            return;
        }
        out = out.concat(`img${index},`);
    })


    return out;
})();



fs.writeFileSync(`${myArgs[0]}${myArgs[1] ? myArgs[1] : "images"}.ts`, `${newFileContent}`);