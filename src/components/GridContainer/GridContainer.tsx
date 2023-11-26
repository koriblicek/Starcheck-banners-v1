import { Box, Button, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bannersAppActions } from "../../store/banners-data/bannersAppSlice";
import { IAppData } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { ExtraOpenButton } from "./ExtraOpenButton";
import { ErrorButton } from "./ErrorButton";
import CloseIcon from '@mui/icons-material/Close';
import useGetStyles from "../../hooks/useGetStyles";
import styles from './GridContainer.module.css';


interface IGridContainerProps {
    data: IAppData;
}
export function GridContainer({ data }: IGridContainerProps) {

    const dispatch = useDispatch();

    const { showBanner } = useAppSelector(state => state.bannersApp.settings);

    const [open, setOpen] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);

    const { width, height, direction, alignment, sticking, offsets, opacity, imageSize,
        extraButtonVisibility, extraButtonOpacity, extraButtonSticking,
        closeButtonSticking,
        errorButtonSticking } = useGetStyles({ position: data.position, anchor: data.anchor, stretch: data.stretch, opened: open });

    function handleError() {
        console.log("error loading");
        setIsError(true);
    }

    function handleOpen(status: boolean) {
        setOpen(status);
    }

    useEffect(() => {
        setIsError(false);
    }, [data.imageSrc]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (showBanner) {
                if (!isError) {
                    setOpen(true);
                }
            }
            clearTimeout(timeout);
        }, data.initTime);

        return () => clearTimeout(timeout);
    }, [data.initTime, isError]);

    return (
        <Box sx={{ position: 'absolute' }} id="box">
            {/* if imageSrc provided */}
            {width &&
                <Grid container direction={direction} alignItems={alignment} alignContent={alignment} className={styles.wrapper}
                    sx={{
                        transition: 'transform 0.4s ease-in-out',
                        position: 'fixed',
                        pointerEvents: 'none',
                        height: height,
                        width: width,
                        ...sticking,
                        ...offsets
                    }}>
                    <Grid item mobile={12}
                        sx={{
                            position: 'relative',
                            pointerEvents: 'auto',
                            ...imageSize
                        }}>
                        {/* Banner container */}
                        <Box className={styles.banner}
                            sx={{
                                transition: 'opacity 0.4s ease-in-out',
                                height: '100%',
                                width: '100%',
                                opacity: opacity
                            }}>
                            <IconButton size='small'
                                sx={{
                                    padding: '2px',
                                    position: 'absolute',
                                    borderRadius: '1px',
                                    ...closeButtonSticking
                                }}
                                onClick={() => {
                                    setOpen(false);
                                    dispatch(bannersAppActions.showBanners({ show: false }));
                                }}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                            <a href={data.hrefUrl} target="_blank" rel="noreferrer" >
                                <img src={data.imageSrc} style={{ display: 'block', ...imageSize }} alt="" onError={() => handleError()} />
                            </a>
                        </Box>
                        {/* Extra open button - if no error*/}
                        {!isError &&
                            <ExtraOpenButton showBanner={showBanner} extraButtonOpacity={extraButtonOpacity} extraButtonVisibility={extraButtonVisibility} extraButtonSticking={extraButtonSticking} onOpen={handleOpen} />
                        }
                    </Grid>
                </Grid>
            }
            {isError && <ErrorButton errorButtonSticking={errorButtonSticking} />}

        </Box >
    );
}
