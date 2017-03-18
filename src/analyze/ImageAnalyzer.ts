import { AbstractAnalyzer } from "./AbstractAnalyzer";

export class ImageAnalyzer extends AbstractAnalyzer {
    constructor(private window: Window) { 
        super(); 
    }

    protected analyze(node: HTMLElement): boolean {
        let isImage = node.localName === "img"
        if (!isImage && !node.innerText) {
            // only if it has no text then we should check if it has a background image
            let computedStyle = this.window.getComputedStyle(node);
            isImage = this.hasImageUrl(computedStyle.backgroundImage) || this.hasImageUrl(computedStyle.background);
        } 
        return isImage;
    }

    protected getRole(): string {
        return "img";
    }

    protected hasImageUrl(style: string): boolean {
        return style.indexOf("url(") !== -1;
    }
}