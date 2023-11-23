import { Fade, Grid, IconButton } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import useStyles from "../../hooks/useStyles";

export function GridContainer() {
    const { anchor, imageSrc, position, hrefUrl, initTime } = useAppSelector(state => state.bannersApp);

    const [open, setOpen] = useState<boolean>(false);

    const [closeButtonVisibility, setCloseButtonVisibility] = useState<boolean>(false);

    const { width, height, direction, alignment, sticking, offsets, visibility, closeButtonSticking } = useStyles({ position: position, anchor: anchor, opened: open });

    const closeButton = useMemo(() => {
        return <IconButton size='small' sx={{ position: 'absolute', borderRadius: 1, ...closeButtonSticking }} onClick={() => setOpen(false)}><CloseIcon fontSize="inherit" /></IconButton>;
    }, [closeButtonSticking]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setOpen(true);
            clearTimeout(timeout);
        }, initTime);

        return () => clearTimeout(timeout);
    }, [initTime]);

    return (
        <Grid container direction={direction} alignItems={alignment} alignContent={alignment} sx={{ boxSizing: 'border-box', visibility: visibility, height: height, width: width, border: 0, position: 'fixed', pointerEvents: 'none', transition: 'all .4s ease-in-out', ...sticking, ...offsets }}>
            <Grid item sx={{ position: 'relative', pointerEvents: 'auto' }} onPointerEnter={() => setCloseButtonVisibility(true)} onPointerLeave={() => setCloseButtonVisibility(false)}>
                <Fade in={closeButtonVisibility}>{closeButton}</Fade>
                <a href={hrefUrl} target="_blank" rel="noreferrer" >
                    <img src={imageSrc} style={{ display: 'block' }} alt="" />
                </a>
            </Grid>
        </Grid>
    );
}
