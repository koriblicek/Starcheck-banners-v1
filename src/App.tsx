import { Fragment, useEffect, useState } from "react";
import { IAppDeviceData, IAppInputData } from "./types";
import { useDispatch } from "react-redux";
import { bannersAppActions } from "./store/banners-data/bannersAppSlice";
import { Wrapper } from "./components/Wrapper";
import useGetFromAPI from "./hooks/useGetFromAPI";

interface IAppProps {
	inputData: IAppInputData;
}

/**
 * data loader
 * @param {IAppInputData} inputData input data used to load settings
 * @returns 
 */
function App({ inputData }: IAppProps) {
	const dispatch = useDispatch();

	const { error, data } = useGetFromAPI<IAppDeviceData>(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/" + inputData.dataVersion + "/settings");

	const [proceed, setProceed] = useState<boolean>(false);

	useEffect(() => {
		if (data) {
			dispatch(bannersAppActions.initialize({ data: data }));
			setProceed(true);
		}
		if (error) {
			// console.log(error);
			dispatch(bannersAppActions.initialize({ data: null }));
			setProceed(true);
		}
	}, [data, error, dispatch]);

	return (
		<Fragment>
			{proceed && <Wrapper />}
		</Fragment>
	);
}

export default App;
