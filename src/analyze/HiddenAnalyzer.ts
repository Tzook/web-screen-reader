import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class HiddenAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        return node.getAttribute("aria-hidden") === "true" || this.isHidden(node);
    }

    protected getRole(): string {
        return "presentation";
    }

    protected isHidden(node: HTMLElement): boolean {
        // see http://stackoverflow.com/a/36267487
        return !node.offsetParent && node.offsetWidth === 0 && node.offsetHeight === 0;
    }
}