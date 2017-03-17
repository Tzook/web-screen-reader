import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class HiddenAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        return node.getAttribute("aria-hidden") === "true";
    }

    protected getRole(): string {
        return "presentation";
    }
}