import './App.css';
import { FGStorage } from '@co2-storage/js-api';

const ipfsNodeAddr = "/dns4/web2.co2.storage/tcp/5002/https"
const fgApiUrl = "https://web2.co2.storage"

const fgStorage = new FGStorage({
  authType: "metamask", 
  ipfsNodeType: "browser", 
  ipfsNodeAddr: ipfsNodeAddr, 
  fgApiHost: fgApiUrl
})

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
        <button onClick={searchTemplates}>searchTemplates</button>
      </header>
    </div>
  );
}

export default App;
