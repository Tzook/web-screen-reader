import { AbstractMutationHandler } from "../input/mutation-handlers/AbstractMutationHandler";
import { AddedNodesMutationHandler } from "../input/mutation-handlers/AddedNodesMutationHandler";
import { TextMutationHandler } from "../input/mutation-handlers/TextMutationHandler";

export class MutationHandlersListGetter {
    public getList(): AbstractMutationHandler[] {
        return [
            new AddedNodesMutationHandler(),
            new TextMutationHandler(),
        ];
    }
}