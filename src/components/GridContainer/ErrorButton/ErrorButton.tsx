import { Button } from "@mui/material";
import { IExtraStick } from "../../../hooks/useGetStyles";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface IErrorButtonProps {
    errorButtonSticking: IExtraStick;
}
export function ErrorButton({ errorButtonSticking }: IErrorButtonProps) {
    return (
        <Button size="small" variant="text" color='error'
            endIcon={<ErrorOutlineOutlinedIcon sx={{
                paddingRight: 1
            }} />}
            sx={{
                transition: 'opacity 0.4s ease-in-out, visibility 0.4s ease-in-out',
                padding: '0px',
                paddingLeft: 1,
                position: 'fixed',
                borderRadius: 0,
                ...errorButtonSticking
            }}
            onClick={() => {
            }}
        >
            ADV. ERROR
        </Button>
    );
}
