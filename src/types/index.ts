export type TAnchor = "left" | "right" | "top" | "bottom";
export type TPosition = "start" | "center" | "end";
export type IDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type TViewPortSize = "mobile" | "tablet" | "desktop";
export type TViewPortOrientation = "landscape" | "portrait";
export enum EPositions {
    "start" = "flex-start",
    "center" = "center",
    "end" = "flex-end",
}

export const LOCALSTORAGE_SHOWBANNERS = "banners-show_banners";
export const LOCALSTORAGE_TIMESTAMP = "banners-timestamp";
export const APP_NAME = "APIBANNERS";
export const APP_ERROR_LINK = "https://www.starcheck.sk/ApiErrorNote";

//#region APP
//Input data via div/script
export interface IAppInputData {
    dataApiLink: string;
    dataId: string;
    dataModule: string;
    dataVersion: string;
}

//Device sub data from API
export interface IAppDeviceData {
    imageSrc: string;
    anchor: TAnchor;
    position: TPosition;
    stretch: boolean;
    breakpoint: number;
}
export interface IAppClientData {
    [viewPortSize: string]: IAppDeviceData;
}

//Global data from API
export interface IAppGlobalData {
    initTime: number;
    hrefUrl: string;
    timeOut: number;
    tabColor: string;
    tabText: string;
    transitionTime: number;
}

//Internal data from API
export interface IAppInternalData {
    infoLink: string;
}

// Data from API
export interface IAppData {
    client: IAppClientData;
    global: IAppGlobalData;
    internal: IAppInternalData;
}

//APP Settings
export interface IAppSettings {
    viewPortSize: TViewPortSize;
    viewPortOrientations: TViewPortOrientation;
    showBanner: boolean;
}
//#endregion



//Error object
export interface IErrorObject {
    code: string;
    codeText: string;
    url: string;
}