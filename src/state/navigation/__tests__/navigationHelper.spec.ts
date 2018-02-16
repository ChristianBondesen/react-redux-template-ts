import { RouteNames } from '../../../enums/navigationEnums';
import { navigateToRouteWithDispatch } from '../navigationHelper';

it('dispatches the correct action when called', () => {
  const dispatchMock = jest.fn();

  navigateToRouteWithDispatch(RouteNames.AppContainer, dispatchMock);
  expect(dispatchMock.mock.calls.length).toBe(1);
  expect(dispatchMock.mock.calls[0][0]).toEqual({
    routeName: RouteNames.AppContainer,
    type: 'Navigation/NAVIGATE',
  });
});
