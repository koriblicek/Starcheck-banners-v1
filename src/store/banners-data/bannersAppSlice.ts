import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppData } from '../../types';

const initialState = {
    imageSrc: "",
    hrefUrl: "",
    initTime: 1000,
    anchor: "left",
    position: "start"
} as IAppData;

export const bannersAppSlice = createSlice({
    name: 'bannersApp',
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<{ data: IAppData | null; }>) => {
            if (action.payload.data===null) {
                return { ...state, imageSrc: "https://placehold.co/60x400", hrefUrl: "http://www.google.com" };
            }
            return { state, ...action.payload.data };
        }
    }
});

// Action creators are generated for each case reducer function
export const bannersAppActions = bannersAppSlice.actions;
export const bannersAppReducer = bannersAppSlice.reducer;