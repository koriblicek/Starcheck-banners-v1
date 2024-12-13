import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppData, IAppGlobalData, IAppInputData, IAppSettings, LOCALSTORAGE_SHOWBANNERS, LOCALSTORAGE_TIMESTAMP, TViewPortOrientation, TViewPortSize } from '../../types';

interface IState {
    inputData: IAppInputData;
    data: IAppData;
    settings: IAppSettings;
}

const initialState = {
    inputData: {},
    data: {
        global: {
            initTime: 1000,
            hrefUrl: "https://www.starcheck.sk",
            timeOut: 3600000,
            tabColor: "#00bb55",
            tabText: "Reklama",
            transitionTime: 200
        } as IAppGlobalData
    } as IAppData,
    settings: {
        showBanner: true
    } as IAppSettings
} as IState;

export const bannersAppSlice = createSlice({
    name: 'bannersApp',
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<{ data: IAppData; }>) => {
            //set data
            if (action.payload.data.client.mobile.imageSrc !== null) {
                state.data.client = { ...state.data.client, mobile: action.payload.data.client.mobile };
            }
            if (action.payload.data.client.tablet.imageSrc !== null) {
                state.data.client = { ...state.data.client, tablet: action.payload.data.client.tablet };
            }
            if (action.payload.data.client.desktop.imageSrc !== null) {
                state.data.client = { ...state.data.client, desktop: action.payload.data.client.desktop };
            }
            if (action.payload.data.global !== null) {
                state.data.global = { ...state.data.global, ...action.payload.data.global };
            }
            if (action.payload.data.internal !== null) {
                state.data.internal = { ...state.data.internal, ...action.payload.data.internal };
            }
            //state.data = { ...state.data, ...action.payload.data };
            //try to load data from local storage
            const showBanners = localStorage.getItem(LOCALSTORAGE_SHOWBANNERS);
            //if no show banners - store default true settings
            if (showBanners === null) {
                localStorage.setItem(LOCALSTORAGE_SHOWBANNERS, String(true));
                state.settings.showBanner = true;
                return;
            }
            //if show banners data exists
            //and show banners === false - check timestamp if in range (keep not showing), or if not (start showing)
            if (showBanners.toString() === "false") {
                //get timestamp
                const timestamp = localStorage.getItem(LOCALSTORAGE_TIMESTAMP);

                //if no time stamp - show banners and store true
                if (timestamp === null) {
                    localStorage.setItem(LOCALSTORAGE_SHOWBANNERS, String(true));
                    state.settings.showBanner = true;
                    return;
                }
                //if timestamp - compare it with now
                const diff: number = (Date.now() - Number(timestamp));
                //if delay is over - show banners and store true
                if (diff >= state.data.global.timeOut) {
                    localStorage.setItem(LOCALSTORAGE_SHOWBANNERS, String(true));
                    state.settings.showBanner = true;
                    return;
                }
                //set false finally
                state.settings.showBanner = false;
                return;
            }
            //show banners = true
            state.settings.showBanner = true;
        },
        setInputData: (state, action: PayloadAction<{ data: IAppInputData; }>) => {
            state.inputData = action.payload.data;
        },
        showBanners: (state, action: PayloadAction<{ show: boolean; }>) => {
            localStorage.setItem(LOCALSTORAGE_SHOWBANNERS, String(action.payload.show));
            //if show banners = false - write timestamp so we know when to show them again
            if (!action.payload.show) {
                localStorage.setItem(LOCALSTORAGE_TIMESTAMP, Date.now().toString());
            }
            state.settings.showBanner = action.payload.show;
        },
        setViewPortOrientation: (state, action: PayloadAction<{ orientation: TViewPortOrientation; }>) => {
            state.settings.viewPortOrientations = action.payload.orientation;
        },
        setViewPortSize: (state, action: PayloadAction<{ size: TViewPortSize; }>) => {
            state.settings.viewPortSize = action.payload.size;
        }
    }
});

// Action creators are generated for each case reducer function
export const bannersAppActions = bannersAppSlice.actions;
export const bannersAppReducer = bannersAppSlice.reducer;