import { SpeakerInterface } from "./SpeakerInterface";
import { SpeakConfigInterface } from "./SpeakConfigInterface";
import { InputSpeaker } from "./InputSpeaker";

export class CheckboxSpeaker implements SpeakerInterface {
    constructor(private inputSpeaker: InputSpeaker) { }

    public getText(node: HTMLInputElement, config: SpeakConfigInterface): string {
        let inputText = this.inputSpeaker.getText(node, config);
        let isChecked = this.isChecked(node);
        let checkedText = ` Currently ${isChecked ? "" : "not "}Checked.`;
        return `Checkbox.. ` + inputText + checkedText;
    }

    protected isChecked(node: HTMLInputElement): boolean {
        let isChecked: boolean;
        let isAriaChecked = node.getAttribute("aria-checked");
        if (isAriaChecked === "false" || isAriaChecked === "true") {
            isChecked = isAriaChecked === "true";
        } else {
            isChecked = node.checked;
        }
        return isChecked;
    }
}