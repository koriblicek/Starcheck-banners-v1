import { createTheme } from "@mui/material/styles";
import { GridContainer } from "../GridContainer";
import { useAppSelector } from "../../store/hooks";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { bannersAppActions } from "../../store/banners-data/bannersAppSlice";
import { TViewPortSize } from "../../types";
import useMediaQuery from "@mui/material/useMediaQuery";

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        mobile: true; // adds the `mobile` breakpoint
        tablet: true;
        desktop: true;
    }
}

//detects size and orientation and inject correct data to GridContainer
export function Wrapper() {
    const dispatch = useDispatch();

    const { data, noData } = useAppSelector(state => state.bannersApp);

    //detect oriantation
    const landscape = useMediaQuery('(orientation: landscape)');

    useEffect(() => {
        dispatch(bannersAppActions.setViewPortOrientation({ orientation: landscape ? "landscape" : "portrait" }));
    }, [landscape, dispatch]);

    const theme = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
                mobile: data["mobile"] ? data["mobile"].breakpoint : noData["mobile"].breakpoint,
                tablet: data["tablet"] ? data["tablet"].breakpoint : noData["tablet"].breakpoint,
                desktop: data["desktop"] ? data["desktop"].breakpoint : noData["desktop"].breakpoint
            },
        },
    });
    // const mobile = useMediaQuery(theme.breakpoints.only("xs"));
    const tablet = useMediaQuery(theme.breakpoints.between("tablet", "desktop"));
    const desktop = useMediaQuery(theme.breakpoints.up("desktop"));
    const size: TViewPortSize = useMemo(() => (desktop ? "desktop" : (tablet ? "tablet" : "mobile")), [desktop, tablet]);

    useEffect(() => {
        dispatch(bannersAppActions.setViewPortSize({ size: size }));
    }, [tablet, desktop, dispatch, size]);

    return (
        <GridContainer key="banner_grid" data={data[size] ? data[size] : noData[size]} />
    );
}
