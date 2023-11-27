import { useReducer } from 'react';
import { IErrorObject } from '../types';
import axios, { AxiosError } from 'axios';

type State = {
    isUploading: boolean;
    isCompleted: boolean;
    error: IErrorObject | null;
};

type Action =
    | { type: "PUT_INIT"; }
    | { type: "PUT_SUCCESS"; }
    | { type: "PUT_FAILURE"; payload: IErrorObject; };

type Reducer = (state: State, action: Action) => State;

const initialState = {
    isUploading: false,
    isCompleted: false,
    error: null

} as State;

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "PUT_INIT":
            return {
                ...state,
                isUploading: true,
                isCompleted: false,
                error: null,
            };
        case "PUT_SUCCESS":
            return {
                ...state,
                isUploading: false,
                isCompleted: true,
                error: null,
            };
        case "PUT_FAILURE":
            return {
                ...state,
                isUploading: false,
                isCompleted: true,
                error: action.payload,
            };
        default:
            throw new Error("Unhandled action type!");
    }
}

/**
 * Hook to PUT data back to REST Api
 * 
 * @param url Request url
 * @returns [ isUploading: boolean, isCompleted: boolean, error: IErrorObject | null, handleSubmit: callback for submit]
 */
function usePutToAPI<T>(url: string) {

    const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

    function putData(data: T) {
        dispatch({ type: "PUT_INIT" });
        axios
            .put(url, data)
            .then((response) => {
                dispatch({ type: "PUT_SUCCESS" });
            })
            .catch((error: AxiosError) => {
                dispatch({ type: "PUT_FAILURE", payload: { code: error.code ? error.code : "n/a", codeText: error.message, url: url } });
            });
    };

    function handleSubmit(data: T) {
        if (url !== "") {
            putData(data);
        }
    }

    return { ...state, handleSubmit };
}

export default usePutToAPI;