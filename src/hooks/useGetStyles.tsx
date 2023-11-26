import { useEffect, useReducer } from 'react';
import { EPositions, TAnchor, TPosition } from '../types';

export interface IStick {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}

export interface IExtraStick extends IStick {
    transformOrigin?: string;
    transform?: string;
}
interface ISize {
    width?: string;
    height?: string;
    minHeight?: string;
}

interface IOffset {
    transform?: string;
}

type State = {
    alignment: EPositions;
    closeButtonSticking: IStick;
    extraButtonOpacity: number;
    extraButtonVisibility: "visible" | "hidden";
    extraButtonSticking: IExtraStick;
    errorButtonSticking: IExtraStick;
    sticking: IStick;
    offsets: IOffset;
    width: string;
    height: string;
    direction: "row" | "column";
    opacity: number;
    imageSize: ISize;
};

type Action =
    | { type: "CALCULATE"; payload: IUseStylesProps; };

const initialState = {
    opacity: 0
} as State;

function reducer(state: State, action: Action): State {
    let sticking: IStick = {};
    let offsets: IOffset = {};
    let closeButtonSticking: IStick = {};
    let extraButtonSticking: IExtraStick = {};
    let errorButtonSticking: IExtraStick = {};
    switch (action.type) {
        case "CALCULATE":
            switch (action.payload.anchor) {
                case "left":
                    sticking = { left: 0, top: 0 };
                    offsets = { transform: `translate(${(-100 + (action.payload.opened ? 100 : 0)).toString()}%, 0)` };
                    closeButtonSticking = { right: 1, top: 1 };
                    extraButtonSticking = { top: 0, right: 0, transformOrigin: '100% 0', transform: 'rotate(90deg) translate(100%,-100%)' };
                    errorButtonSticking = { top: 0, left: 0,transformOrigin: '0 0', transform: 'rotate(90deg) translate(0,-100%)'};
                    break;
                case "right":
                    sticking = { right: 0, top: 0 };
                    offsets = { transform: `translate(${(100 + (action.payload.opened ? -100 : 0)).toString()}%, 0)` };
                    closeButtonSticking = { left: 1, top: 1 };
                    extraButtonSticking = { top: 0, left: 0, transformOrigin: '0 0', transform: 'rotate(-90deg) translate(-100%,-100%)' };
                    errorButtonSticking = { bottom: 0, right: 0, transformOrigin: '100% 100%', transform: 'rotate(-90deg) translate(100%,0)'};
                    break;
                case "top":
                    sticking = { left: 0, top: 0 };
                    offsets = { transform: `translate(0,${(-100 + (action.payload.opened ? 100 : 0)).toString()}%)` };
                    closeButtonSticking = { right: 1, bottom: 1 };
                    extraButtonSticking = { bottom: 0, right: 0, transformOrigin: '100% 0', transform: ' translate(0%,100%)' };
                    errorButtonSticking = { top: 0, right: 0};
                    break;
                case "bottom":
                    sticking = { left: 0, bottom: 0 };
                    offsets = { transform: `translate(0, ${(100 + (action.payload.opened ? -100 : 0)).toString()}%)` };
                    closeButtonSticking = { right: 1, top: 1 };
                    extraButtonSticking = { top: 0, right: 0, transformOrigin: '0 0', transform: ' translate(0%,-100%)' };
                    errorButtonSticking = { bottom: 0, left: 0};
                    break;
            }

            const width = (action.payload.anchor === "left" || action.payload.anchor === "right") ? "auto" : "100%";
            const height = (action.payload.anchor === "top" || action.payload.anchor === "bottom") ? "auto" : "100%";
            const direction = (action.payload.anchor === "left" || action.payload.anchor === "right") ? "row" : "column";
            const imageSize: ISize = (action.payload.stretch) ?
                (direction === "row") ? { height: '100%' } : { width: '100%' }
                :
                {};
            const opacity = action.payload.opened ? 1 : 0;
            const alignment = EPositions[action.payload.position];
            //extra open button visible if no bar is visible
            const extraButtonOpacity = action.payload.opened ? 0 : 1;
            const extraButtonVisibility = action.payload.opened ? "hidden" : "visible";
            return {
                ...state,
                sticking, offsets,
                extraButtonSticking, extraButtonVisibility, extraButtonOpacity,
                closeButtonSticking,
                errorButtonSticking,
                width, height, direction, opacity, alignment, imageSize
            };

        default:
            throw new Error("Unhandled action type!");
    }
}

interface IUseStylesProps {
    position: TPosition;
    anchor: TAnchor;
    opened: boolean;
    stretch: boolean;
}
function useGetStyles({ position, anchor, stretch, opened }: IUseStylesProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "CALCULATE", payload: { position, anchor, stretch, opened } });
    }, [position, anchor, opened, stretch]);
    return state;
}

export default useGetStyles;