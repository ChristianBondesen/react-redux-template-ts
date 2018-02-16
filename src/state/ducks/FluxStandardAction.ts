/**
 * The app uses Flux Standard Actions
 * https://github.com/acdlite/flux-standard-action
 *
 * This means ALL action types must extend this interface.
 *
 * The optional error property MAY be set to true if the action represents an error.
 *
 * An action whose error is true is analogous to a rejected Promise. By convention, the payload SHOULD be an error object.
 * If error has any other value besides true, including undefined and null, the action MUST NOT be interpreted as an error.
 *
 * @export
 * @interface IFluxStandardAction
 */

export interface IFluxStandardAction {
  type: string;
  payload?: any | IAppError;
  error?: boolean;
  meta?: IActionMeta;
}

/**
 * This is an application-specific interface that extends and complies with FSA.
 * The purpose is to have a typed meta object rather than a wild, unknown object.
 *
 * The 'fetching' variable is used to determine if the resource has been requested,
 * so the app can show a loading indication to the user.
 *
 * @interface IActionMeta
 */
export interface IActionMeta {
  fetching: boolean;
}

/**
 * This is an application-specific interface
 *
 * @interface IAppError
 */
export interface IAppError extends Error {
  // errorCode: number;
  message: string;
}
