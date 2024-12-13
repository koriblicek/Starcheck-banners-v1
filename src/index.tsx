import { Provider } from 'react-redux';
import { store } from './store/store';
import { APP_ERROR_LINK, APP_NAME, IAppInputData } from './types';
import { ErrorReporter } from './components/ErrorReporter';
import ReactDOM from 'react-dom/client';
import App from './App';

//input data
let inputData: IAppInputData | undefined;

//error logs
let errorMessage = "";
let error = false;

//find root element
const rootElement = document.getElementById(`${APP_NAME}-root`) as HTMLElement;
//if no root found
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  //check for div and loading error
  const dal = "https://www.starcheck.sk/apijs/";
  const di = rootElement.getAttribute("data-id");
  const dm = rootElement.getAttribute("data-module");
  const dv = rootElement.getAttribute("data-version");
  if ((dal !== null) && (di !== null) && (dm !== null) && (dv !== null)) {
    inputData = {
      dataApiLink: dal,
      dataId: di,
      dataModule: dm,
      dataVersion: dv
    };
    console.log(inputData);
  } else {
    error = true;
    errorMessage = `Some of required input data are missing! 'data-id'='${di}','data-module'='${dm}','data-version'='${dv}'`;
    console.log(`(Starcheck-banners): ${errorMessage}`);
  }
  root.render(
    // <React.StrictMode>
    <Provider store={store}>
      {inputData && <App inputData={inputData} />}
      {error && <ErrorReporter app={APP_NAME} errorMessage={errorMessage} referrer={window.location.href} errorUrl={APP_ERROR_LINK} />}
    </Provider>
    // </React.StrictMode>
  );
} else {
  error = true;
  errorMessage = `Root node id '${APP_NAME}-root' not found!`;
  console.log(`(Starcheck-banners): ${errorMessage}`);
}

