

export enum Routes {
  Main = 'Main',
  Input = 'Input',
}

export const CourtRouteBuilder = (route: Routes) => {

  return {
    name: route,
  };
};