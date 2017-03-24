import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class HiddenAnalyzer extends AbstractAnalyzer {
    protected analyze(node: HTMLElement, config: SpeakConfigInterface): boolean {
        return !config.isRef && (this.isHidden(node) || this.nodeTreeIsAriaHidden(node));
    }

    protected getRole(): string {
        return "presentation";
    }

    protected nodeTreeIsAriaHidden(node: HTMLElement): boolean {
        // stop either when theres no further node and then result is false or if found an element with truthy aria-hidden 
        return node && (node.getAttribute("aria-hidden") === "true" || this.nodeTreeIsAriaHidden(node.parentElement));
    }

    protected isHidden(node: HTMLElement): boolean {
        // see http://stackoverflow.com/a/36267487
        return !node.offsetParent && node.offsetWidth === 0 && node.offsetHeight === 0;
    }
}