import { AbstractMutationHandler } from "./AbstractMutationHandler";

export class AddedNodesMutationHandler extends AbstractMutationHandler {
    protected analyze(mutation: MutationRecord, elementsModified: Set<HTMLElement>): boolean {
        this.findTextElements(mutation.addedNodes, elementsModified);
        return mutation.addedNodes.length > 0;
    }

    protected findTextElements(nodes: NodeList, elementsModified: Set<HTMLElement>): void {
        for (let node of nodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                let parentNode = node.parentElement;
                if (parentNode) {
                    // make sure it's not a floating text
                    elementsModified.add(parentNode);
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                this.findTextElements(node.childNodes, elementsModified);
            } else {
                console.error("Detected unsupported node value! this needs to be handled", node);
            }
        }
    }
};