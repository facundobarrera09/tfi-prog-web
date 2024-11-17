import path from 'path'
import { lstatSync, readdirSync } from 'fs'
import { OpenAPIV3 } from 'openapi-types'
import { fetchPathsDocs } from '../services/docsGeneration'
import { exit } from 'process'

const apiDocs: OpenAPIV3.Document = {
    "openapi": "3.0.0",
    "info": {
        "title": "TFI - Backend documentation",
        "description": "Educational institution dministration system",
        "version": "1.0.0",
    },
    "paths": {},
    "servers": [
        {
            url: "http://localhost:3001/api"
        }
    ]
}

readdirSync(__dirname, { recursive: true })
    .map(name => { return path.join(__dirname, name.toString())})
    .filter(absolutePath => lstatSync(absolutePath).isDirectory())
    .forEach(dirName => {
        const pathDocs = fetchPathsDocs(dirName)

        // console.log('pathDocs:', pathDocs)

        let docs: OpenAPIV3.PathsObject = {}
        Object.keys(pathDocs).forEach((key: string) => {
            // console.log('path', pathDocs[key])
            // console.log('head', __dirname)
            const partialDirName = dirName.substring(__dirname.length).split('/')[1]
            // console.log('partialDirName', partialDirName)
            // console.log('key', key)
            // console.log('fullPath', `${partialDirName}${key}`)
            // console.log('dirName', dirName.substring())

            // exit()
            docs[`/${partialDirName}${key}`] = pathDocs[key]
        })

        // console.log('new docs', docs)
        
        apiDocs.paths = {
            ...apiDocs.paths,
            ...docs
        }

        // console.debug(apiDocs.paths)
    })

export default apiDocs