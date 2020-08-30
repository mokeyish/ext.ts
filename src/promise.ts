
declare interface PromiseConstructor {
    /**
     * Creates an Promise that asynchronously yields back to the current context when awaited after a specified number of milliseconds.
     * @param  [ms=1] number of milliseconds
     */
    yield(ms?: number): Promise<void>;
}


Promise.yield = (ms: number = 1) => new Promise<void>( r => setTimeout(r, ms));
