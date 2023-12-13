import { Button } from "@mui/material";
import { keyframes } from "@emotion/react";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
//import styles from './ExtraOpenButton.module.css';
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
  opacity: number;
  visibility: "visible" | "hidden";
  sticking: IExtraStick;
  transitionTime: number;
  label: string;
  color: string;
  onOpen: (status: boolean) => void;
}

export function ExtraOpenButton({ showBanner, opacity, visibility, sticking, transitionTime, label, color, onOpen }: IExtraOpenButtonProps) {

  const dispatch = useDispatch();

  return (
    <Button size="small" variant="text"
      endIcon={<CampaignOutlinedIcon sx={{
        paddingRight: 1,
        animation: `${myEffect} ${showBanner ? '.5s' : '2s'} infinite`
      }} />}
      sx={{
        borderColor: { color },
        transition: `opacity ${transitionTime}ms ${transitionTime}ms ease-in-out, visibility ${transitionTime}ms ${transitionTime}ms ease-in-out`,
        WebkitTransition: `opacity ${transitionTime}ms ${transitionTime}ms ease-in-out, visibility ${transitionTime}ms ${transitionTime}ms ease-in-out`,
        MozTransition: `opacity ${transitionTime}ms ${transitionTime}ms ease-in-out, visibility ${transitionTime}ms ${transitionTime}ms ease-in-out`,
        MsTransition: `opacity ${transitionTime}ms ${transitionTime}ms ease-in-out, visibility ${transitionTime}ms ${transitionTime}ms ease-in-out`,
        OTransition: `opacity ${transitionTime}ms ${transitionTime}ms ease-in-out, visibility ${transitionTime}ms ${transitionTime}ms ease-in-out`,
        padding: '0px',
        color: { color },
        backgroundColor: '#DCDCDC',
        "&:hover": {
          backgroundColor: '#ECECEC',
        },
        paddingLeft: 1,
        position: 'absolute',
        borderRadius: 0,
        opacity: opacity,
        visibility: visibility,
        ...sticking
      }}
      onClick={() => {
        onOpen(true);
        dispatch(bannersAppActions.showBanners({ show: true }));
      }}
    >
      {label}
    </Button>
  );
}
