declare module '*.png' {
    const url: string;
    export default url;
}

declare module '*.jpg' {
    const url: string;
    export default url;
}

declare module 'url:*' {
    const url: string;
    export default url;
}