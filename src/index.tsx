import { Provider } from 'react-redux';
import { store } from './store/store';
import { IAppInputData } from './types';
import { Alert, AlertTitle } from '@mui/material';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('advertisement-root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

//input data
let inputData: IAppInputData | undefined;

//error 
let errorStatus = false;
let errorMessage = "";

if (root) {
  const dal = "https://api.ralph.sk/apijs/";
  const di = rootElement.getAttribute("data-id");
  const dm = rootElement.getAttribute("data-module");
  if ((dal !== null) && (di !== null) && (dm !== null)) {
    inputData = {
      dataApiLink: "https://api.ralph.sk/apijs/",
      dataId: di,
      dataModule: dm
    };
  } else {
    errorStatus = true;
    errorMessage = "Required input is missing!";
  }
} else {
  errorStatus = true;
  errorMessage = "Root node '<div id=\"debuilder-root\"></div>' not found!";
}

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {inputData && <App inputData={inputData} />}
    {errorStatus && <Alert variant='standard' severity='error' sx={{ m: 1 }} >
      <AlertTitle>Data error</AlertTitle>
      {errorMessage}</Alert>}
  </Provider>
  // </React.StrictMode>
);
