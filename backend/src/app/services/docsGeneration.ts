import path from 'path'
import { lstatSync, PathLike, readdirSync } from 'fs'

function fetchPathsDocs(pathToFiles: PathLike) {
    let paths: any = {}

    // console.debug('Fetching docs from:', pathToFiles)

    try {
        readdirSync(pathToFiles)
            .map(name => path.join(pathToFiles.toString(), name))
            .filter(absolutePath => lstatSync(absolutePath).isFile() && !(absolutePath.endsWith("index.ts")))
            .forEach(dirName => {
                const { docs } = require(dirName)

                Object.keys(docs).forEach(key => {
                    paths[key] = key in paths ? 
                        {
                            ...paths[key],
                            ...docs[key]
                        } : 
                        docs[key];
                })
            })
    }
    catch(e) {} 

    return paths
}

export { fetchPathsDocs }