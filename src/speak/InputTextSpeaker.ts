import { SpeakerInterface } from "./SpeakerInterface";
import { InputSpeaker } from "./InputSpeaker";

export class InputTextSpeaker implements SpeakerInterface {
    constructor(private inputSpeaker: InputSpeaker) { }

    public getText(node: HTMLInputElement): string {
        let inputText = this.inputSpeaker.getText(node);
        let typeText = node.type;
        
        let placeholder = node.placeholder || node.getAttribute("aria-placeholder");
        let placeholderText = placeholder ? ` Placeholder is: ${placeholder}.` : '';
        
        let value = node.value;
        let valueText = value ? ` Current value is: ${value}.` : ``;

        return `${typeText} input.. ` + inputText + placeholderText + valueText;
    }
}