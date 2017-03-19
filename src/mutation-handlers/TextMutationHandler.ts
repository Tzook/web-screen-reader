import { AbstractMutationHandler } from "./AbstractMutationHandler";

export class TextMutationHandler extends AbstractMutationHandler {
    protected analyze(mutation: MutationRecord, elementsModified: Set<HTMLElement>): boolean {
        let isText = mutation.type === "characterData";
        if (isText) {
            let parentNode = mutation.target.parentElement;
            if (parentNode) {
                // make sure it's not a floating text
                elementsModified.add(parentNode);
            }
        }
        return isText;
    }
}; 