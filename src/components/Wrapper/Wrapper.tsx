import { createTheme } from "@mui/material/styles";
import { GridContainer } from "../GridContainer";
import { useAppSelector } from "../../store/hooks";
import { Fragment, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { bannersAppActions } from "../../store/banners-data/bannersAppSlice";
import { IAppData, TViewPortSize } from "../../types";
import useMediaQuery from "@mui/material/useMediaQuery";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        mobile: true;
        tablet: true;
        desktop: true;
    }
}

interface IWrapperProps {
    data: IAppData;
}
//detects size and orientation and inject correct data to GridContainer
export function Wrapper({ data }: IWrapperProps) {
    const dispatch = useDispatch();

    //detect oriantation
    const landscape = useMediaQuery('(orientation: landscape)');
    useEffect(() => {
        dispatch(bannersAppActions.setViewPortOrientation({ orientation: landscape ? "landscape" : "portrait" }));
    }, [landscape, dispatch]);

    //set breakpoints
    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
                mobile: data.client["mobile"] ? data.client["mobile"].breakpoint : 0,
                tablet: data.client["tablet"] ? data.client["tablet"].breakpoint : 600,
                desktop: data.client["desktop"] ? data.client["desktop"].breakpoint : 992
            },
        },
    });

    //detect device size
    const tablet = useMediaQuery(theme.breakpoints.between("tablet", "desktop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const size: TViewPortSize = useMemo(() => (desktop ? "desktop" : (tablet ? "tablet" : "mobile")), [desktop, tablet]);
    useEffect(() => {
        dispatch(bannersAppActions.setViewPortSize({ size: size }));
    }, [tablet, desktop, dispatch, size]);

    return (
        <Fragment>
            {data.client[size] && <GridContainer key="banner_grid" deviceData={data.client[size]} globalData={data.global} internalData={data.internal} />}
        </Fragment>
    );
}
