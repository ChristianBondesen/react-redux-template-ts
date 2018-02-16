import { NavigationActions } from 'react-navigation';
import { Dispatch } from 'redux';

export const navigateToRouteWithDispatch = (
  route: string,
  dispatch: Dispatch<any>
) => {
  dispatch(
    NavigationActions.navigate({
      routeName: route,
    })
  );
};
