import loadable from "loadable-components";
import Loading from "./components/Loading";

const routes: IRoutes = {
  "/": loadable(() => import("./components/Home"), {
    LoadingComponent: Loading,
  }),
};

export default routes;
