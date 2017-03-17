import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class ButtonAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement): boolean {
        let role = node.getAttribute("role");
        // if we have a role and it isn't button, then we shouldn't consider it a button
        let isButton = role === "button" || (node.localName === "button" && !role);
        return isButton;
    }
}