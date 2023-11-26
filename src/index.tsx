import { Provider } from 'react-redux';
import { store } from './store/store';
import { IAppInputData } from './types';
import ReactDOM from 'react-dom/client';
import App from './App';

//find root element
const rootElement = document.getElementById('MODAPIBANNERS-root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

//input data
let inputData: IAppInputData | undefined;

//error 
let errorMessage = "";

//check for div and loading error
if (root) {
  const dal = "https://www.starcheck.sk/apijs/";
  const di = rootElement.getAttribute("data-id");
  const dm = rootElement.getAttribute("data-module");
  const dv = rootElement.getAttribute("data-version");
  const ds = rootElement.getAttribute("data-src");
  const dl = rootElement.getAttribute("data-link");
  if ((dal !== null) && (di !== null) && (dm !== null) && (dv !== null)) {
    inputData = {
      dataApiLink: dal,
      dataId: di,
      dataModule: dm,
      dataVersion: dv
    };
    //if extra data presented
    if (ds) {
      inputData = { ...inputData, dataSrc: ds };
    }
    //if extra data presented
    if (dl) {
      inputData = { ...inputData, dataLink: dl };
    }
  } else {
    errorMessage = `(Starcheck-banners: Some of reuiqred input data are missing!`;
    console.log(errorMessage);
  }
} else {
  errorMessage = `(Starcheck-banners): Root node id 'banners-root' not found!`;
  console.log(errorMessage);
}

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {inputData && <App inputData={inputData} />}
  </Provider>
  // </React.StrictMode>
);
