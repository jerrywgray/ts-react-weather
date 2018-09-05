interface IAppConfig {
  browserURL: string;
  cacheControl: (prod: boolean, days: number) => string;
  contentTypes: (url: string) => string;
  propsURL: string;
  reactDomURL: (prod: boolean) => string;
  reactURL: (prod: boolean) => string;
  rootContainer: string;
}

declare module "loadable-components/server" {
  export function getLoadableState(element: JSX.Element): Promise<any>;
}

/**
 * Routes type. Maps the route as a key to the Loadable React Component
 */
interface IRoutes {
  /** Key mapped to Loadable interface */
  [route: string]: import ("loadable-components").Loadable<any>;
}
