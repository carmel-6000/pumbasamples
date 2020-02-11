const fs = require('fs');
const path = require('path');
// `${baseFileDirPath}${filePath}`
let samplesArr = [];

readSampleFromModules()
function readSampleFromModules() {
    const fullFilePath = path.join(__dirname, "../../");
    let modules = fs.readdirSync(fullFilePath);
    let moduleName = "";
    let filePath = "";
    // let samplePath = "";
    let filesOfModule = [];
    let filesOfSample = [];
    for (let i = 0; i < modules.length; i++) {
        moduleName = modules[i]
        filePath = path.join(__dirname, `../../${moduleName}`)
        filesOfModule = fs.readdirSync(filePath)
        if (filesOfModule.includes("samples") && fs.lstatSync(path.join(filePath, "/samples")).isDirectory()) {
            filesOfSample = fs.readdirSync(path.join(filePath, "/samples"));

            if (filesOfSample.includes("samples-list.export.json") && fs.lstatSync(path.join(filePath, "/samples", "samples-list.export.json")).isFile()) {
                console.log("moduleName",moduleName)

                readSampleListJson(filePath,moduleName)
            }
        }
    }
    writeToSampleArrayData()
}

function readSampleListJson(filePath,moduleName) {

    let fileData = fs.readFileSync(path.join(filePath, "/samples", "/samples-list.export.json"), 'utf8')
    fileData = JSON.parse(fileData)
    if (Array.isArray(fileData)) {
        // console.log(typeof fileData, "fileData", fileData)
        fileData.forEach(elem => {
            if(elem.filePath){
            console.log("elem.filePath",elem.filePath ,"filePath",filePath)
                
                elem.filePath=path.join( moduleName,"/samples",elem.filePath)
            }
            console.log("elem.fp",elem.filePath, typeof elem.filePath)

            samplesArr.push(elem)
        })
        // console.log("samplesArr", samplesArr)
    }
}
function readSampleArrayData() {
    let fileData = fs.readFileSync(path.join(__dirname, "/samples_array_data.json"), 'utf8')
    fileData = JSON.parse(fileData)
    if (Array.isArray(fileData)) {
        // console.log(typeof fileData, "fileData", fileData)
        fileData.forEach(elem => {
            samplesArr.push(elem)
        })
        console.log("samplesArr", samplesArr)
    }

}
function writeToSampleArrayData() {
    let sampleArrayPath = path.join(__dirname, "../samples_array_data.json")
    // let data = JSON.stringify({data:JSON.stringify(samplesArr)})
    
    console.log("samplesArr", samplesArr,"JSON.stringify(samplesArr)",JSON.stringify(samplesArr))

    fs.writeFileSync(sampleArrayPath, JSON.stringify(samplesArr,null,'\t'))
}



    // &&fs.lstatSync(path.join(filePath, `../${moduleName}`)).isDirectory()){


    //  fs.lstatSync("/some/path").isDirectory()
    // console.log("files", files)


// }
