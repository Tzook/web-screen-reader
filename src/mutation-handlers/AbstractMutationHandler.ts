import { ProcessingLinkInterface } from "../chain-of-responsibility/ProcessingLinkInterface";

export abstract class AbstractMutationHandler implements ProcessingLinkInterface {
    private successor: AbstractMutationHandler;

    public handle(mutation: MutationRecord, elementsModified: Set<HTMLElement>) {
        let insertedElements = this.analyze(mutation, elementsModified);
        if (!insertedElements && this.successor) {
            this.successor.handle(mutation, elementsModified);
        }
    }

    protected abstract analyze(mutation: MutationRecord, elementsModified: Set<HTMLElement>): boolean;

    public setSuccessor(successor: AbstractMutationHandler) {
        this.successor = successor;
    }
};