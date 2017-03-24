import { ProcessingLinkInterface } from "../chain-of-responsibility/ProcessingLinkInterface";

export abstract class AbstractAnalyzer implements ProcessingLinkInterface {
    private successor: AbstractAnalyzer;

    public handle(node: HTMLElement, config: SpeakConfigInterface): AbstractAnalyzer {
        let result: AbstractAnalyzer;
        let role = node.getAttribute("role");
        if (role === this.getRole() || (!role || !this.getRole()) && this.analyze(node, config)) {
            result = this;
        } else if (this.successor) {
            result = this.successor.handle(node, config);
        }
        return result;
    }

    protected abstract analyze(node: HTMLElement, config: SpeakConfigInterface): boolean;

    protected abstract getRole(): string;

    public setSuccessor(successor: AbstractAnalyzer) {
        this.successor = successor;
    }
};