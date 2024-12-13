import { Box, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { bannersAppActions } from "../../store/banners-data/bannersAppSlice";
import { APP_ERROR_LINK, APP_NAME, IAppDeviceData, IAppGlobalData, IAppInternalData } from "../../types";
import { useAppSelector } from "../../store/hooks";
import { ExtraOpenButton } from "./ExtraOpenButton";
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import useGetStyles from "../../hooks/useGetStyles";
import usePutToAPI from "../../hooks/usePutToAPI";

interface IGridContainerProps {
    deviceData: IAppDeviceData;
    globalData: IAppGlobalData;
    internalData: IAppInternalData;
}
export function GridContainer({ deviceData, globalData, internalData }: IGridContainerProps) {

    const dispatch = useDispatch();

    const hideInfoButton = useAppSelector(state => state.bannersApp.data.global.hideInfoButton);
    console.log(hideInfoButton);

    const { showBanner } = useAppSelector(state => state.bannersApp.settings);

    const [open, setOpen] = useState<boolean>(false);

    const [isError, setIsError] = useState<boolean>(false);

    const { width, height, direction, alignment, sticking, offsets, opacity, imageSize,
        extraButtonVisibility, extraButtonOpacity, extraButtonSticking,
        buttonsBoxSticking, buttonsBoxDirection } = useGetStyles({ position: deviceData.position, anchor: deviceData.anchor, stretch: deviceData.stretch, opened: open });

    const { handleSubmit } = usePutToAPI(APP_ERROR_LINK);

    function handleError() {
        const errorMessage = `Can't load banner: ${deviceData.imageSrc}`;
        setIsError(true);
        handleSubmit({ app: APP_NAME, referrer: window.location.href, errorMessage: errorMessage });
        console.log(`(Starcheck-banners): ${errorMessage}`);
    }

    function handleOpen(status: boolean) {
        setOpen(status);
    }

    useEffect(() => {
        setIsError(false);
    }, [deviceData.imageSrc]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (showBanner) {
                if (!isError) {
                    setOpen(true);
                }
            }
            clearTimeout(timeout);
        }, globalData.initTime);

        return () => clearTimeout(timeout);
    }, [globalData.initTime, isError, showBanner]);

    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) newWindow.opener = null;
    };

    return (
        <Box sx={{ position: 'absolute' }} id="box">
            {/* if imageSrc provided */}
            {width &&
                <Grid container direction={direction} alignItems={alignment} alignContent={alignment}
                    sx={{
                        transition: `transform ${globalData.transitionTime}ms ease-in-out`,
                        WebkitTransition: `transform ${globalData.transitionTime}ms ease-in-out`,
                        MozTransition: `transform ${globalData.transitionTime}ms ease-in-out`,
                        MsTransition: `transform ${globalData.transitionTime}ms ease-in-out`,
                        OTransition: `transform ${globalData.transitionTime}ms ease-in-out`,
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
                        <Box
                            sx={{
                                transition: `opacity ${globalData.transitionTime}ms ease-in-out`,
                                WebkitTransition: `opacity ${globalData.transitionTime}ms ease-in-out`,
                                MozTransition: `opacity ${globalData.transitionTime}ms ease-in-out`,
                                MsTransition: `opacity ${globalData.transitionTime}ms ease-in-out`,
                                OTransition: `opacity ${globalData.transitionTime}ms ease-in-out`,
                                height: '100%',
                                width: '100%',
                                opacity: opacity
                            }}>
                            <Box sx={{
                                position: 'absolute',
                                ...buttonsBoxSticking
                            }}>
                                <Grid container direction={buttonsBoxDirection} sx={{ backgroundColor: '#DCDCDC', p: '1px' }} columnGap={1} rowGap={1}>
                                    {!hideInfoButton &&
                                        <Grid item>
                                            <IconButton size='small'
                                                sx={{
                                                    padding: '2px',
                                                    borderRadius: '1px',
                                                }}
                                                onClick={() => {
                                                    openInNewTab(internalData.infoLink);
                                                }}>
                                                <InfoOutlinedIcon fontSize="inherit" />
                                            </IconButton>
                                        </Grid>
                                    }
                                    <Grid item>
                                        <IconButton size='small'
                                            sx={{
                                                padding: '2px',
                                                borderRadius: '1px',
                                            }}
                                            onClick={() => {
                                                setOpen(false);
                                                dispatch(bannersAppActions.showBanners({ show: false }));
                                            }}>
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                            <a href={globalData.hrefUrl} target="_blank" rel="noreferrer" >
                                <img src={deviceData.imageSrc} style={{ display: 'block', ...imageSize }} alt="" onError={() => handleError()} />
                            </a>
                        </Box>
                        {/* Extra open button - if no error*/}
                        {!isError &&
                            <ExtraOpenButton showBanner={showBanner} opacity={extraButtonOpacity} visibility={extraButtonVisibility} sticking={extraButtonSticking} transitionTime={globalData.transitionTime} label={globalData.tabText} color={globalData.tabColor} onOpen={handleOpen} />
                        }
                    </Grid>
                </Grid>
            }
        </Box >
    );
}
