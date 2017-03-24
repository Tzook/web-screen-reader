export abstract class AbstractSpeaker {
    public abstract getText(node: HTMLElement, config: SpeakConfigInterface): string;
}