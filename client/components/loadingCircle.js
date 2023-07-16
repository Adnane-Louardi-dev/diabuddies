import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingCircle({ hidden = false }) {
  return (
    <div className={`${hidden ? "hidden" : "grid"} items-center justify-center  z-10 w-full h-full`}>
      <CircularProgress />
    </div>
  );
}
