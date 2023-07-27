import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        boxShadow: "none",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      elevation={3}
    >
      <div className="loadg">
        <CircularProgress color="success" />
      </div>
    </Paper>
  );
}
