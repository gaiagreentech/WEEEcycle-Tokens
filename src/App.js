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
                if(response.status === 'uploading') {
                    this.loading = true
                    console.log(`${response.filename}: ${response.progress.toFixed(2)}%`)
                }
                else {
                    console.dir(response, {depth: null})
                }
            }
        )
        if(addAssetResponse.error != null) {
            console.error(addAssetResponse.error)
            await new Promise(reject => setTimeout(reject, 300));
        }
        
        console.dir(addAssetResponse.result, {depth: null})
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <p>
                Filecoin CO2.Storage examples.
              </p>        
              <button onClick={this.addAssetWithNestedAssets}>addAssetWithNestedAssets</button>
            </header>
          </div>
        );
    }
}


export default App;
