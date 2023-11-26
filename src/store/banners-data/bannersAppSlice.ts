import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAppData, IAppDeviceData, IAppSettings, LOCALSTORAGE_SHOWBANNERS, LOCALSTORAGE_TIMESTAMP, SHOW_BANNERS_DELAY, TViewPortOrientation, TViewPortSize } from '../../types';

interface IState {
    data: IAppDeviceData;
    noData: IAppDeviceData;
    settings: IAppSettings;
}

const initialState = {
    data: {
    } as IAppDeviceData,
    noData: {
        "mobile": {
            imageSrc: "https://placehold1.co/320x50?text=www.starcheck.sk (320x50)&font=oswald",
            hrefUrl: "www.starcheck.sk",
            initTime: 1000,
            anchor: "bottom",
            position: "center",
            stretch: true,
            breakpoint: 0
        } as IAppData,
        "tablet": {
            imageSrc: "https://placehold.co/468x60?text=www.starcheck.sk (468x60)&font=oswald",
            anchor: "bottom",
            hrefUrl: "www.starcheck.sk",
            initTime: 1000,
            position: "center",
            stretch: false,
            breakpoint: 600
        } as IAppData,
        "desktop": {
            //imageSrc: "https://placehold.co/728x90?text=www.starcheck.sk (728x90)&font=oswald",
            //anchor: "bottom",
            imageSrc: "https://placehold.co/160x600?text=www.starcheck.sk (160x600)&font=oswald",
            anchor: "right",
            hrefUrl: "www.starcheck.sk",
            initTime: 1000,
            position: "end",
            stretch: false,
            breakpoint: 992
        } as IAppData
    },
    settings: {
    } as IAppSettings
} as IState;

export const bannersAppSlice = createSlice({
    name: 'bannersApp',
    initialState,
    reducers: {
        initialize: (state, action: PayloadAction<{ data: IAppDeviceData | null; }>) => {
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
            //if data
            //and show banners === false - check timestamp if in range (keep not showing), or if not (start showing)
            if (showBanners === "false") {
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
                if (diff >= SHOW_BANNERS_DELAY) {
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