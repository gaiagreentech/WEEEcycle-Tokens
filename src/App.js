import React, { Component } from 'react';
import './App.css';
import { FGStorage, Auth } from '@co2-storage/js-api';

const ipfsNodeAddr = "/dns4/web2.co2.storage/tcp/5002/https"
const fgApiUrl = "https://web2.co2.storage"

const authType = "pk"
const auth = new Auth(authType)

const fgStorage = new FGStorage({
    authType: "pk",
    ipfsNodeType: "client",
    ipfsNodeAddr: ipfsNodeAddr,
    fgApiHost: fgApiUrl
})

const fgStorageForTemplate = new FGStorage({
    authType: "metamask",
    ipfsNodeType: "browser",
    ipfsNodeAddr: ipfsNodeAddr,
    fgApiHost: fgApiUrl
})

const fgStorageForAsset = new FGStorage({
    authType: 'pk',
    ipfsNodeType: 'client',
    ipfsNodeAddr: ipfsNodeAddr,
    fgApiHost: fgApiUrl
})

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    addAssetWithNestedAssets = async () => {
        console.log('addAssetWithNestedAssets')
        const typeCid = "bafyreib4jvh4yjqltczdx3hhf277end2li42dr2l6mgmzxid2us2zwvavm"

        const assetElements = [
            {
                "name": "Person",
                "value": "bafyreif5h32c3t7ovhtrazsxi3ya6wbr4gczbaaz6niehzz664b2as5nry"
            },
            {
                "name": "Address",
                "value": "bafyreidiib3f66jm5fjdfiigum3u7mm5smxsjyrhdnjfdvg4akx26x246i"
            }
        ]

        // "Error whilst requesting \"privateKeyToAccount\" method. InvalidPrivateKeyError: Invalid Private Key, Not a valid string or uint8Array"
        let addAssetResponse = await fgStorage.addAsset(
            assetElements,
            {
                parent: null,
                name: "[TEST] Contact created with nested assets",
                description: "[TEST] Contact created with nested assets",
                template: typeCid,    // CID of above defined type
                filesUploadStart: () => {
                    console.log("Upload started")
                },
                filesUpload: async (bytes, path) => {
                    console.log(`${bytes} uploaded`)
                },
                filesUploadEnd: () => {
                    console.log("Upload finished")
                },
                waitingBacalhauJobStart: () => {
                    console.log("Waiting for Bacalhau job to start execution")
                },
                bacalhauJobStarted: () => {
                    console.log("Bacalhau job started execution")
                },
                createAssetStart: () => {
                    console.log("Creating asset")
                },
                createAssetEnd: () => {
                    console.log("Asset created")
                },
                error: (err) => {
                    console.log(err)
                    return
                }
            },
            'Nested types example',
            (response) => {
                if (response.status === 'uploading') {
                    this.loading = true
                    console.log(`${response.filename}: ${response.progress.toFixed(2)}%`)
                }
                else {
                    console.dir(response, { depth: null })
                }
            }
        )
        if (addAssetResponse.error != null) {
            console.error(addAssetResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }

        console.dir(addAssetResponse.result, { depth: null })

        await new Promise(resolve => setTimeout(resolve, 1000));

    }

    addAssetWithNestedTemplates = async () => {
        console.log('addAssetWithNestedTemplates')
        const typeCid = "bafyreiaw66zcnfrf6atbslmgcsk6bty4fxfleil4l4dpxvc55c52vwvc7i"

        const assetElements = [
            {
                "name": "id",
                "value": "1d5ddf26-c282-492a-96c6-f900e66db308"
            },
            {
                "name": "name",
                "value": "name-dolores-occaecati-aspernatur"
            },
            {
                "name": "domain",
                "value": "insignificant-rose.name"
            },
            {
                "name": "address",
                "value": [
                    {
                        "name": "id",
                        "value": "97b5acf2-137c-461a-a0f7-e5c64b434005"
                    },
                    {
                        "name": "zip",
                        "value": "gj88330-2749"
                    },
                    {
                        "name": "city",
                        "value": "Amaracester"
                    },
                    {
                        "name": "state",
                        "value": "Illinois"
                    },
                    {
                        "name": "address",
                        "value": "501 Leuschke Alley"
                    },
                    {
                        "name": "country",
                        "value": "Latvia"
                    }
                ]
            },
            {
                "name": "projectId",
                "value": "764729"
            },
            {
                "name": "description",
                "value": "Atque repellat pariatur reprehenderit quas veniam sed fugit. Velit maiores voluptatum minima. Suscipit perspiciatis nihil fugit voluptatum cupiditate aspernatur sed. Tempora incidunt perspiciatis odit reiciendis. Quam consequatur sint quod fuga magni aliquid doloremque officia voluptatibus."
            },
            {
                "name": "projectInfo",
                "value": [
                    {
                        "name": "id",
                        "value": "4181dd51-5720-476f-a85f-ed5fde29752f"
                    },
                    {
                        "name": "country",
                        "value": "Spain"
                    },
                    {
                        "name": "registryId",
                        "value": "393585"
                    },
                    {
                        "name": "firstYearIssuance",
                        "value": "2022"
                    }
                ]
            }
        ]

        let addAssetResponse = await fgStorage.addAsset(
            assetElements,
            {
                parent: null,
                name: "Asset 300 CLI (rapaygo examples)",
                description: "Asset 300 CLI (rapaygo examples)",
                template: typeCid,    // CID of above defined type
                filesUploadStart: () => {
                    console.log("Upload started")
                },
                filesUpload: async (bytes, path) => {
                    console.log(`${bytes} uploaded`)
                },
                filesUploadEnd: () => {
                    console.log("Upload finished")
                },
                waitingBacalhauJobStart: () => {
                    console.log("Waiting for Bacalhau job to start execution")
                },
                bacalhauJobStarted: () => {
                    console.log("Bacalhau job started execution")
                },
                createAssetStart: () => {
                    console.log("Creating asset")
                },
                createAssetEnd: () => {
                    console.log("Asset created")
                },
                error: (err) => {
                    console.log(err)
                    return
                }
            },
            'rapaygo examples',
            (response) => {
                if (response.status === 'uploading') {
                    this.loading = true
                    console.log(`${response.filename}: ${response.progress.toFixed(2)}%`)
                }
                else {
                    console.dir(response, { depth: null })
                }
            }
        )
        if (addAssetResponse.error != null) {
            console.error(addAssetResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }

        console.dir(addAssetResponse.result, { depth: null })

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    addTemplate = async () => {
        console.log('addTemplate')
        const template = {
            Country: { type: 'string', mandatory: true },
            Retired: { type: 'boolean' },
            Vintage: { type: 'date', mandatory: true }
        }
        const templateName = 'CLI example test template (1.0.3-v1)'
        const templateBase = { title: 'VCS', reference: 'bafyreigenzubua7r7rlxomgpyy2o4q46u6anvw3qvbxmlxhifkbrdbhcwm' }
        const templateDescription = 'Test template (1.0.3-v1)'
        const templateParent = 'bafyreigijwcxu4nda2nol5x3cepjhel6mlvgyiizvivki3dpg3ttegdl2y'
        const chainName = 'sandbox'
        let addTemplateResponse = await fgStorage.addTemplate(template, templateName, templateBase, templateDescription, templateParent, chainName)
        if (addTemplateResponse.error != null) {
            console.error(addTemplateResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }

        console.dir(addTemplateResponse.result, { depth: null })

        await new Promise(resolve => setTimeout(resolve, 1000));

    }

    authenticate = async () => {
        /**
         * Authenticate with a private key
         */

        console.log('authenticate')
        let authResponse = await auth.authenticate()

        if (authResponse.error != null) {
            console.error(authResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }

        console.dir(authResponse.result, { depth: null })

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    getAccount = async () => {
        console.log('getAccount')
        let accountResponse = await fgStorage.getAccount('sandbox')
        if (accountResponse.error != null) {
            console.error(accountResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }

        console.dir(accountResponse.result, { depth: null })

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    getAccounts = async () => {
        console.log('getAccounts')
        let accountsResponse = await fgStorage.getAccounts('sandbox')
        if (accountsResponse.error != null) {
            console.log('ERROR!!!')
            console.error(accountsResponse.error)
        }
        console.log(accountsResponse.result)
    }

    getAsset = async () => {
        /**
         * Search assets
         * parameters: (chainName, phrases, cid, name, base, account, offset, limit, sortBy, sortDir)
         * // default data_chain: 'sandbox', phrases: null, cid: null, name: null, base: null, account: null, offset: 0, limit: 10
         */

        console.log('getAsset')
        let searchAssetsResponse = await fgStorage.searchAssets('sandbox')    // ('SP Audits', 'Water')
        if (searchAssetsResponse.error != null) {
            console.error(searchAssetsResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }

        /**
         * Get asset
         * parameters: asset block CID
         */

        const lastListedAsset = searchAssetsResponse.result.assets[searchAssetsResponse.result.assets.length - 1]
        if (lastListedAsset) {
            let getAssetResponse = await fgStorage.getAsset(lastListedAsset.block)
            if (getAssetResponse.error != null) {
                console.error(getAssetResponse.error)
                await new Promise(reject => setTimeout(reject, 300));
            }

            console.dir(getAssetResponse.result, { depth: null })
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    getRawData = async () => {
        console.log('getRawData')
        const ipfs = await fgStorage.ensureIpfsIsRunning()
        console.log(ipfs)
        const cid = 'bafybeibks5ute3txdug5cy3dyyggogbp7cmav57rylgwllnl6lghsjyml4'

        // Get all at once
        //const bufferAll = await fgStorage.getRawData(cid)

        // Get first 100000 bytes
        const buffer = await fgStorage.getRawData(cid, { offset: 0, length: 100000 }, (bytes) => {
            console.log(`${bytes} bytes received`)
        })
        console.log(buffer)
    }

    getTemplate = async () => {
        console.log('getTemplate')
        /**
         * Search templates
         * parameters: (chainName, phrases, cid, name, base, account, offset, limit, sortBy, sortDir)
         * // default data_chain: 'sandbox', phrases: null, cid: null, name: null, base: null, account: null, offset: 0, limit: 10
         */

        let searchTemplatesResponse = await fgStorage.searchTemplates('sandbox')    // ('SP Audits', 'Water')
        if (searchTemplatesResponse.error != null) {
            console.error(searchTemplatesResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }

        /**
         * Get template
         * parameters: template block CID
         */

        const lastListedTemplate = searchTemplatesResponse.result.templates[searchTemplatesResponse.result.templates.length - 1]
        if (lastListedTemplate) {
            let getTemplateResponse = await fgStorage.getTemplate(lastListedTemplate.block)
            if (getTemplateResponse.error != null) {
                console.error(getTemplateResponse.error)
                await new Promise(reject => setTimeout(reject, 300));
            }

            console.dir(getTemplateResponse.result, { depth: null })
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

    }

    search = async () => {
        console.log('search')
        /**
         * Search
         * parameters: (chainName, phrases, dataStructure, cid, parent, name, description, base, 
        reference, contentCid, creator, createdFrom, createdTo, version, offset, limit, sortBy, sortDir)
        */

        let searchResponse = await fgStorage.search(null, null, 'asset', null, null, null, null, null,
            'bafyreigcprw3dp3mrsv2xgysomratgv3oz4cpl3rsiij2hzucckyxfbpd4')
        if (searchResponse.error != null) {
            console.error(searchResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }

        console.dir(searchResponse.result, { depth: null })

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    searchAssets = async () => {
        console.log('searchAssets')
        let SearchAssetsResponse = await fgStorageForAsset.searchAssets('sandbox')
        if (SearchAssetsResponse.error != null) {
            console.error(SearchAssetsResponse.error)
        }
        console.log('Total assets:', SearchAssetsResponse.result.total)
        console.dir(SearchAssetsResponse.result.assets, { depth: null })
    }

    searchTemplates = async () => {
        console.log('searchTemplates')
        /**
         * Search templates
         * parameters: (chainName, phrases, cid, name, base, account, offset, limit, sortBy, sortDir)
         * default data_chain: 'sandbox', phrases: null, cid: null, name: null, base: null, account: null, offset: 0, limit: 10
         */

        let searchTemplatesResponse = await fgStorageForTemplate.searchTemplates('sandbox')    // ('SP Audits', 'Water')
        if (searchTemplatesResponse.error != null) {
            console.error(searchTemplatesResponse.error)
        }
        console.log(searchTemplatesResponse.result)
    }



    render() {
        return (
            <div className="container">
                <div className="row">


                    <p>
                        Filecoin CO2.Storage examples.
                    </p>
                </div>
                <div className='row'>
                    <button onClick={this.addAssetWithNestedAssets}>addAssetWithNestedAssets</button>
                </div>

                <div className='row' align-items='center'>
                    <button onClick={this.addAssetWithNestedTemplates}>addAssetWithNestedTemplates</button>
                </div>
                <div className='row'>
                    <button onClick={this.addTemplate}>addTemplate</button>
                </div>
                <div className='row'>
                    <button onClick={this.authenticate}>Authenticate</button>
                </div>
                <div className='row'>
                    <button onClick={this.getAccount}>getAccount</button>
                </div>
                <div className='row'>
                    <button onClick={this.getAccounts}>getAccounts</button>
                </div>
                <div className='row'>
                    <button onClick={this.getAsset}>getAsset</button>
                </div>
                <div className='row'>
                    <button onClick={this.getRawData}>getRawData</button>
                </div>
                <div className='row'>
                    <button onClick={this.getTemplate}>getTemplate</button>
                </div>
                <div className='row'>
                    <button onClick={this.search}>search</button>
                </div>
                <div className='row'>
                    <button onClick={this.searchAssets}>searchAssets</button>
                </div>
                <div className='row'>
                    <button onClick={this.searchTemplates}>searchTemplates</button>
                </div>
            </div>
        );
    }
}


export default App;
