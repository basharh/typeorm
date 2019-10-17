export class PrimaryColumnCannotBeNullableError extends Error {
    name = "PrimaryColumnCannotBeNullableError";

    constructor(object: Record<string, any>, propertyName: string) {
        super();
        Object.setPrototypeOf(
            this,
            PrimaryColumnCannotBeNullableError.prototype
        );
        this.message =
            `Primary column ${
                (<any>object.constructor).name
            }#${propertyName} cannot be nullable. ` +
            `Its not allowed for primary keys. Try to remove nullable option.`;
    }
}
