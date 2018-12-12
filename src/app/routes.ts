import loadable from "@loadable/component";

const routes: IRoutes = {
  "/": loadable(() => import("./components/Home")),
};

export default routes;
