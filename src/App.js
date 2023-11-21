import './App.css';
import { FGStorage, Auth } from '@co2-storage/js-api';

const ipfsNodeAddr = "/dns4/web2.co2.storage/tcp/5002/https"
const fgApiUrl = "https://web2.co2.storage"

const authType = "pk"
const auth = new Auth(authType)

const fgStorage = new FGStorage({
  authType: "metamask", 
  ipfsNodeType: "browser", 
  ipfsNodeAddr: ipfsNodeAddr, 
  fgApiHost: fgApiUrl
})

async function authenticate(){
  /**
   * Authenticate with a private key
   */

  console.log('authenticate')
  let authResponse = await auth.authenticate()

  if(authResponse.error != null) {
      console.error(authResponse.error)
      await new Promise(reject => setTimeout(reject, 300));
  }

  console.dir(authResponse.result, {depth: null})

  await new Promise(resolve => setTimeout(resolve, 1000));
}

async function searchTemplates(){
  console.log('searchTemplates')
  /**
   * Search templates
   * parameters: (chainName, phrases, cid, name, base, account, offset, limit, sortBy, sortDir)
   * default data_chain: 'sandbox', phrases: null, cid: null, name: null, base: null, account: null, offset: 0, limit: 10
   */
  
let searchTemplatesResponse = await fgStorage.searchTemplates('sandbox')    // ('SP Audits', 'Water')
  if(searchTemplatesResponse.error != null) {
      console.error(searchTemplatesResponse.error)
  }
  console.log(searchTemplatesResponse.result)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Filecoin CO2.Storage examples.
        </p>        
        <button onClick={authenticate}>Authenticate</button>
        <button onClick={searchTemplates}>searchTemplates</button>
      </header>
    </div>
  );
}

export default App;
