

export enum Routes {
  Main = 'Main',
  Input = 'Input',
  Button = 'Button',
}

export const CourtRouteBuilder = (route: Routes) => {

  return {
    name: route,
  };
};