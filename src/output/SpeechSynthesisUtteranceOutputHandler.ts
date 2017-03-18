import { AbstractOutputHandler } from "./AbstractOutputHandler";

export class SpeechSynthesisUtteranceOutputHandler extends AbstractOutputHandler {
    public init(): void {
        window.speechSynthesis.getVoices();
    }

    public output(text: string): void {
        console.info("Saying:", text);
        var msg = new (<any>this.window).SpeechSynthesisUtterance(text);
        msg.voice = window.speechSynthesis.getVoices()[17];
        window.speechSynthesis.speak(msg);
    }

    public abort(): void {
        window.speechSynthesis.cancel();
    }
}