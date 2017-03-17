import { ProcessingLinkInterface } from "../patterns/chain-of-responsibility/ProcessingLinkInterface";

export abstract class AbstractAnalyzer implements ProcessingLinkInterface {
    private successor: AbstractAnalyzer;

    public handle(node: HTMLElement): AbstractAnalyzer {
        let result: AbstractAnalyzer;
        if (this.analyze(node)) {
            result = this;
        } else if (this.successor) {
            result = this.successor.handle(node);
        }
        return result;
    }

    protected abstract analyze(node: HTMLElement): boolean;

    public setSuccessor(successor: AbstractAnalyzer) {
        this.successor = successor;
    }
};