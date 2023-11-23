import { useEffect, useState } from "react";
import { GridContainer } from "./components/GridContainer";
import { IAppData, IAppInputData } from "./types";
import useGetFromAPI from "./hooks/useGetFromAPI";
import { useDispatch } from "react-redux";
import { bannersAppActions } from "./store/banners-data/bannersAppSlice";

interface IAppProps {
	inputData: IAppInputData;
}

function App({ inputData }: IAppProps) {
	const dispatch = useDispatch();

	const { isLoading, error, data } = useGetFromAPI<IAppData>(inputData.dataApiLink + inputData.dataId + "/" + inputData.dataModule + "/settings");

	const [proceed, setProceed] = useState<boolean>(false);

	useEffect(() => {
		if (data) {
			dispatch(bannersAppActions.initialize({ data: data }));
			setProceed(true);
		}
		if (error) {
			console.log(error);
			dispatch(bannersAppActions.initialize({ data: null }));
			setProceed(true);
		}
	}, [data, error, inputData]);

	return (
		<>
			{proceed && <GridContainer />}
		</>
	);
}

export default App;
