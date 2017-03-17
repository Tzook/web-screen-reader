export abstract class AbstractOutputHandler {
    constructor(protected window: Window) { }

    public init(): void { };

    public abstract output(text: string): void;

    public abstract abort(): void;
}