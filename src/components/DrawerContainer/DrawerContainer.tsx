import { Drawer, Fade, Grid, IconButton, styled } from "@mui/material";
import { useAppSelector } from "../../store/hooks";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export function DrawerContainer() {
    const { anchor, imageSrc, position, hrefUrl } = useAppSelector(state => state.bannersApp);
    const direction = (anchor === "left" || anchor === "right") ? "row" : "column";

    function handleCloseClick() {
        setOpen(false);
    }
    const [open, setOpen] = useState<boolean>(true);

    const [closeButtonVisibility, setCloseButtonVisibility] = useState<boolean>(false);

    const closeButton = <IconButton size='small' sx={{ position: 'absolute', right: 0 }} onClick={handleCloseClick}><CloseIcon /></IconButton>;

    return (
        // <Fade in={open}><div style={{position:'absolute', top:0, left:'50%'}}>
        //     <a href={hrefUrl} target="_blank"
        //     >
        //         <img src={imageSrc} />
        //     </a>
        // </div></Fade>
        <Drawer
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    backgroundSize: 0,
                    border: 0,
                    boxShadow: 'none'
                },
            }}
            hideBackdrop
            variant='persistent'
            anchor={anchor}
            open={open}
        >
            <Grid container direction={direction} alignItems={position} alignContent={position} sx={{ height: '100vh', pointerEvents: 'none' }}>
                <Grid item sx={{ position: 'relative', pointerEvents: 'auto' }}
                    onMouseEnter={() => setCloseButtonVisibility(true)}
                    onMouseLeave={() => setCloseButtonVisibility(false)}
                >
                    <Fade in={closeButtonVisibility}>{closeButton}</Fade>
                    <a href={hrefUrl} target="_blank" >
                        <img src={imageSrc} style={{ display: 'block' }} />
                    </a>
                </Grid>
            </Grid>
        </Drawer >
    );
}
