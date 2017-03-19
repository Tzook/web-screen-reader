import { AbstractSpeaker } from "./AbstractSpeaker";

export class CheckboxSpeaker extends AbstractSpeaker {
    protected speak(node: HTMLInputElement): string {
        let isChecked = this.isChecked(node);
        let nameText = node.name ? `${node.name}. ` : ``;
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