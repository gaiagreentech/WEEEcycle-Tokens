import './App.css';
import { FGStorage } from '@co2-storage/js-api';

const authType = "metamask"
const ipfsNodeType = "browser"
const ipfsNodeAddr = "/dns4/web2.co2.storage/tcp/5002/https"
const fgApiUrl = "https://web2.co2.storage"

const fgStorage = new FGStorage({authType: authType, ipfsNodeType: ipfsNodeType, ipfsNodeAddr: ipfsNodeAddr, fgApiHost: fgApiUrl})

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Filecoin CO2.Storage examples.
        </p>
      </header>
    </div>
  );
}

export default App;
