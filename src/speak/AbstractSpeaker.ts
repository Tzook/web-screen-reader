export abstract class AbstractSpeaker {
    public getSpeak(node: HTMLElement): string {
        return this.speak(node);
    }

    protected abstract speak(node: HTMLElement): string;
}