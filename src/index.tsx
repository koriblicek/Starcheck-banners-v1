import { Provider } from 'react-redux';
import { store } from './store/store';
import { IAppInputData } from './types';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';

const rootElement = document.getElementById('banners-v1-root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

//input data
let inputData: IAppInputData | undefined;

//error 
let errorStatus = false;
let errorMessage = "";

if (root) {
  const dal = "https://www.starcheck.sk/apijs/";
  const di = rootElement.getAttribute("data-id");
  const dm = rootElement.getAttribute("data-module");
  if ((dal !== null) && (di !== null) && (dm !== null)) {
    inputData = {
      dataApiLink: dal,
      dataId: di,
      dataModule: dm
    };
  } else {
    errorMessage = "(Starcheck-banners-v1): Some of reuiqred input data are missing!";
    console.log(errorMessage);
  }
} else {
  errorMessage = "(Starcheck-banners-v1): Root node id 'banners-v1-root' not found!";
}

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      {inputData && <App inputData={inputData} />}
    </Provider>
  // </React.StrictMode>
);
