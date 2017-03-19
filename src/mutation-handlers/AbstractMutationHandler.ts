import { ProcessingLinkInterface } from "../patterns/chain-of-responsibility/ProcessingLinkInterface";

export abstract class AbstractMutationHandler implements ProcessingLinkInterface {
    private successor: AbstractMutationHandler;

    public handle(mutation: MutationRecord, elementsAdded: Set<HTMLElement>) {
        let insertedElements = this.analyze(mutation, elementsAdded);
        if (!insertedElements && this.successor) {
            this.successor.handle(mutation, elementsAdded);
        }
    }

    protected abstract analyze(mutation: MutationRecord, elementsAdded: Set<HTMLElement>): boolean;

    public setSuccessor(successor: AbstractMutationHandler) {
        this.successor = successor;
    }
};