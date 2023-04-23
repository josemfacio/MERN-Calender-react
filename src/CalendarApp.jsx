import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import "./styles.css";
export function CalendarApp() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
