import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingCircle({hidden = false}) {
    return (
        <div className={`${hidden ? "hidden" : "absolute"} top-0 right-0 z-10 w-full h-full bg-black bg-opacity-20`}>
            <CircularProgress
                className={`absolute top-[50%] right-[50%] translate-x-[calc(-50%+20px)] translate-y-[-50%]`}/>
        </div>
    );
}
