import { useEffect } from "react";
import usePutToAPI from "../../hooks/usePutToAPI";

interface IErrorReportingProps {
    app: string;
    referrer: string;
    errorMessage: string;
    errorUrl: string;
}
export function ErrorReporter({ app, referrer, errorMessage, errorUrl }: IErrorReportingProps) {
    
    const { /*isUploading, isCompleted, error,*/ handleSubmit } = usePutToAPI(errorUrl);
    
    useEffect(() => {
        console.log(errorMessage)
        handleSubmit({ app: app, referrer: referrer, errorMessage: errorMessage });
    }, [app, referrer, errorMessage, errorUrl, handleSubmit]);

    return (
        <></>
    );
}
