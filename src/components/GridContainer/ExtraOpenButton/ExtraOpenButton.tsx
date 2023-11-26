import { Button } from "@mui/material";
import { keyframes } from "@emotion/react";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import styles from './ExtraOpenButton.module.css';
import { useDispatch } from "react-redux";
import { bannersAppActions } from "../../../store/banners-data/bannersAppSlice";
import { IExtraStick } from "../../../hooks/useGetStyles";

const myEffect = keyframes`
  0% {
    opacity: .6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: .6;
  }
`;

interface IExtraOpenButtonProps {
    showBanner: boolean;
    extraButtonOpacity: number;
    extraButtonVisibility: "visible" | "hidden";
    extraButtonSticking: IExtraStick;
    onOpen: (status: boolean) => void;
}

export function ExtraOpenButton({ showBanner, extraButtonOpacity, extraButtonVisibility, extraButtonSticking, onOpen }: IExtraOpenButtonProps) {

    const dispatch = useDispatch();

    return (
        <Button size="small" variant="text" color={(showBanner) ? 'primary' : 'warning'}
            endIcon={<CampaignOutlinedIcon sx={{
                paddingRight: 1,
                animation: `${myEffect} ${showBanner ? '.5s' : '2s'} infinite`
            }} />}
            className={styles.extraOpenButton}
            sx={{
                transition: 'opacity 0.4s ease-in-out, visibility 0.4s ease-in-out',
                padding: '0px',
                paddingLeft: 1,
                position: 'absolute',
                borderRadius: 0,
                opacity: extraButtonOpacity,
                visibility: extraButtonVisibility,
                ...extraButtonSticking
            }}
            onClick={() => {
                onOpen(true);
                dispatch(bannersAppActions.showBanners({ show: true }));
            }}
        >
            Advert
        </Button>
    );
}
