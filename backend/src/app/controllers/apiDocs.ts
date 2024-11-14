import path from 'path'
import { lstatSync, readdirSync } from 'fs'
import { OpenAPIV3 } from 'openapi-types'
import { fetchPathsDocs } from '../services/docsGeneration'

const apiDocs: OpenAPIV3.Document = require(path.join(__dirname, 'apiDocsBase.json'))
// console.debug('apiDocs:', apiDocs)
// console.debug('dirname',__dirname)

readdirSync(__dirname)
    .map(name => path.join(__dirname, name))
    .filter(absolutePath => lstatSync(absolutePath).isDirectory())
    .forEach(dirName => {
        const pathDocs = fetchPathsDocs(dirName)

        // console.log('pathDocs:', pathDocs)

        let docs: OpenAPIV3.PathsObject = {}
        Object.keys(pathDocs).forEach((key: string) => {
            docs[`/${dirName.split('/').pop()}${key === '/' ? '' : key}`] = pathDocs[key]
        })

        // console.log('new docs', docs)
        
        apiDocs.paths = {
            ...apiDocs.paths,
            ...docs
        }

        // console.debug(apiDocs.paths)
    })

export default apiDocs