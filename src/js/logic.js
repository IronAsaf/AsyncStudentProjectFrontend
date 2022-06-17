import ReactDOM from "react-dom/client";
import Dashboard from "./dashboard";


const root = ReactDOM.createRoot(
    document.getElementById("root")
  );

export function loadDash()
{
    root.render(<Dashboard/>);
}