import './promise';

declare global {
    interface Window {
        yield(ms?: number): Promise<void>;
        sleep(ms?: number): Promise<void>;
    }
}

Window.prototype.sleep = Window.prototype.sleep = Promise.yield;
