
declare interface PromiseConstructor {
    yield(ms?: number): Promise<void>;
}


Promise.yield = (ms: number = 1) => new Promise<void>( r => setTimeout(r, ms));
