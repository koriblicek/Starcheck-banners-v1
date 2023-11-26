export type TAnchor = "left" | "right" | "top" | "bottom";
export type TPosition = "start" | "center" | "end";
export type TViewPortSize = "mobile" | "tablet" | "desktop";
export type TViewPortOrientation = "landscape" | "portrait";

export enum EPositions {
    "start" = "flex-start",
    "center" = "center",
    "end" = "flex-end",
}

export const LOCALSTORAGE_SHOWBANNERS = "banners-show_banners";
export const LOCALSTORAGE_TIMESTAMP = "banners-timestamp";
//do not to show banners for specified time frame ms*sec*min*hours = days
export const SHOW_BANNERS_DELAY = 1000 * 60 * 60 * 24;

//#region APP
//Input data via div/script
export interface IAppInputData {
    dataApiLink: string;
    dataId: string;
    dataModule: string;
    dataVersion: string;
    dataSrc?: string;
    dataLink?: string;
}

//Data from API
export interface IAppData {
    imageSrc: string;
    hrefUrl: string;
    initTime: number;
    anchor: TAnchor;
    position: TPosition;
    stretch: boolean;
    breakpoint: number;
}

export interface IAppDeviceData {
    [viewPortSize: string]: IAppData;
}

//Settings
export interface IAppSettings {
    viewPortSize: TViewPortSize;
    viewPortOrientations: TViewPortOrientation;
    showBanner: boolean;
}

//Error object
export interface IErrorObject {
    code: string;
    codeText: string;
    url: string;
}
//#endregion
