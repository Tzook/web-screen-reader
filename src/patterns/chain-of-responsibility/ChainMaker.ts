import { ProcessingLinkInterface } from "./ProcessingLinkInterface";

export class ChainMaker {
    public makeChain(iterator: IterableIterator<ProcessingLinkInterface> | ProcessingLinkInterface[]): ProcessingLinkInterface {
        let firstLink: ProcessingLinkInterface;
        let prevLink: ProcessingLinkInterface;
        for (let link of iterator) {
            if (!prevLink) {
                firstLink = link;
            } else {
                prevLink.setSuccessor(link);
            }
            prevLink = link;
        }
        return firstLink;
    }
}