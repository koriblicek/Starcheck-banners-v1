export type TAnchors = "left" | "right" | "top" | "bottom";
export type TPositions = "start" | "center" | "end";
export enum EPositions {
    "start" = "flex-start",
    "center" = "center",
    "end" = "flex-end",
}

//#region APP
//Input data via div/script
export interface IAppInputData {
    dataApiLink: string;
    dataId: string;
    dataModule: string;
}

//Data from API
export interface IAppData {
    imageSrc: string;
    hrefUrl: string;
    initTime: number;
    anchor: TAnchors;
    position: TPositions;
}

//Error object
export interface IErrorObject {
    code: string;
    codeText: string;
    url: string;
}
//#endregion
