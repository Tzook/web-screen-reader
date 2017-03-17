import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class HiddenAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        let role = node.getAttribute("role");
        return role === "presentation" || node.getAttribute("aria-hidden") === "true";
    }
}