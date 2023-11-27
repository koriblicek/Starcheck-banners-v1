import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppData, IAppGlobalData, IAppSettings, LOCALSTORAGE_SHOWBANNERS, LOCALSTORAGE_TIMESTAMP, TViewPortOrientation, TViewPortSize } from '../../types';

interface IState {
    data: IAppData;
    settings: IAppSettings;
}

const initialState = {
    data: {
        global: {
            initTime: 1000,
            hrefUrl: "https://www.starcheck.sk",
            timeOut: 3600000,
            tabColor: "#00bb55",
            tabText: "Reklama"
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
        initialize: (state, action: PayloadAction<{ data: IAppData | null; }>) => {
            //set data
            state.data = { ...state.data, ...action.payload.data };
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