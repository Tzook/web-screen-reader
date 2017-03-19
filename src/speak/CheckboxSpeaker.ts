import { SpeakerInterface } from "./SpeakerInterface";

export class CheckboxSpeaker implements SpeakerInterface {
    public getText(node: HTMLInputElement): string {
        let nameText = node.name ? `${node.name}. ` : ``;
        let isChecked = this.isChecked(node);
        let checkedText = `Currently ${isChecked ? "" : "not "}Checked.`;
        return `Checkbox.. ` + nameText + checkedText;
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