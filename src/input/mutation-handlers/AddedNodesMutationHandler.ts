import { AbstractMutationHandler } from "./AbstractMutationHandler";

export class AddedNodesMutationHandler extends AbstractMutationHandler {
    protected analyze(mutation: MutationRecord, elementsAdded: Set<HTMLElement>): boolean {
        this.findTextElements(mutation.addedNodes, elementsAdded);
        return mutation.addedNodes.length > 0;
    }

    protected findTextElements(nodes: NodeList, elementsAdded: Set<HTMLElement>): void {
        for (let node of nodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                let parentNode = node.parentElement;
                if (parentNode) {
                    // make sure it's not a floating text
                    elementsAdded.add(parentNode);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                this.findTextElements(node.childNodes, elementsAdded);
            } else {
                console.error("Detected unsupported node value! this needs to be handled", node);
            }
        }
    }
};