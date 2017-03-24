import { AbstractSpeaker } from "./SpeakerInterface";
import { InputSpeaker } from "./InputSpeaker";
import { TextSpeaker } from "./TextSpeaker";

export class SelectSpeaker extends AbstractSpeaker {
    constructor(private textSpeaker: TextSpeaker,
        private inputSpeaker: InputSpeaker) { super() }

    public getText(node: HTMLInputElement, config: SpeakConfigInterface): string {
        let inputText = this.inputSpeaker.getText(node, config);
        
        let optionsText = '';
        let children = node.children;

        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            if (child instanceof HTMLOptionElement) {
                let optionText = this.textSpeaker.getText(<HTMLElement>child, config);
                if ((<HTMLOptionElement>child).selected) {
                    optionText += " (currently selected)";
                }
                if (optionText) {
                    optionsText += `${optionText}..`;
                }
            }
        }

        optionsText = optionsText ? `Options are: ${optionsText}` : `There are no options`;

        return `Select.. ` + inputText + optionsText;
    }
}