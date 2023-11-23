import { useEffect, useReducer } from 'react';
import { EPositions, TAnchors, TPositions } from '../types';

interface IStick {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
}

interface IOffset {
    transform?: string;
}

type State = {
    alignment: EPositions;
    closeButtonSticking: IStick;
    sticking: IStick;
    offsets: IOffset;
    width: string;
    height: string;
    direction: "row" | "column";
    visibility: 'visible' | 'hidden';
};

type Action =
    | { type: "CALCULATE"; payload: IUseStylesProps; };

const initialState = {
    visibility: "hidden"
} as State;

function reducer(state: State, action: Action): State {
    let newSticking: IStick = {};
    let newOffsets: IOffset = {};
    let newCloseButtonSticking: IStick = {};
    switch (action.type) {
        case "CALCULATE":
            switch (action.payload.anchor) {
                case "left":
                    newSticking = { left: 0, top: 0 };
                    newCloseButtonSticking = { right: 3, top: 3 };
                    newOffsets = { transform: `translate(${(-100 + (action.payload.opened ? 100 : 0)).toString()}%, 0)` };
                    break;
                case "right":
                    newCloseButtonSticking = { left: 3, top: 3 };
                    newSticking = { right: 0, top: 0 };
                    newOffsets = { transform: `translate(${(100 + (action.payload.opened ? -100 : 0)).toString()}%, 0)` };
                    break;
                case "top":
                    newCloseButtonSticking = { right: 3, bottom: 3 };
                    newSticking = { left: 0, top: 0 };
                    newOffsets = { transform: `translate(0,${(-100 + (action.payload.opened ? 100 : 0)).toString()}%)` };
                    break;
                case "bottom":
                    newCloseButtonSticking = { right: 3, top: 3 };
                    newSticking = { left: 0, bottom: 0 };
                    newOffsets = { transform: `translate(0, ${(100 + (action.payload.opened ? -100 : 0)).toString()}%)` };
                    break;
            }

            const width = (action.payload.anchor === "left" || action.payload.anchor === "right") ? "auto" : "100%";
            const height = (action.payload.anchor === "top" || action.payload.anchor === "bottom") ? "auto" : "100%";
            const direction = (action.payload.anchor === "left" || action.payload.anchor === "right") ? "row" : "column";
            const visibility = action.payload.opened ? 'visible' : 'hidden';
            const alignment = EPositions[action.payload.position];
            return {
                ...state, sticking: newSticking, offsets: newOffsets, closeButtonSticking: newCloseButtonSticking, width, height, direction, visibility, alignment,
            };

        default:
            throw new Error("Unhandled action type!");
    }
}

interface IUseStylesProps {
    position: TPositions;
    anchor: TAnchors;
    opened: boolean;
}
function useStyles({ position, anchor, opened }: IUseStylesProps) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: "CALCULATE", payload: { position, anchor, opened } });
    }, [position, anchor, opened]);

    return state;
}

export default useStyles;