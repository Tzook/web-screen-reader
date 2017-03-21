import { SpeakerInterface } from "./SpeakerInterface";
import { SpeakConfigInterface } from "./SpeakConfigInterface";
import { InputSpeaker } from "./InputSpeaker";

export class InputTextSpeaker implements SpeakerInterface {
    constructor(private inputSpeaker: InputSpeaker) { }

    public getText(node: HTMLInputElement, config: SpeakConfigInterface): string {
        let inputText = this.inputSpeaker.getText(node, config);
        let typeText = node.type;
        
        let placeholder = node.placeholder || node.getAttribute("aria-placeholder");
        let placeholderText = placeholder ? ` Placeholder is: ${placeholder}.` : '';
        
        let value = node.value;
        let valueText = value ? ` Current value is: ${value}.` : ``;

        return `${typeText} input.. ` + inputText + placeholderText + valueText;
    }
}