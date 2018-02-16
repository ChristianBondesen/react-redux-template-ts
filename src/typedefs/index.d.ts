// Missing @types on NPM
declare module 'expo';

declare module '*.json' {
  const value: any;
  export default value;
}
