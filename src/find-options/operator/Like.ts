import { FindOperator } from "../FindOperator";

/**
 * Find Options Operator.
 * Example: { someField: Like("%some sting%") }
 */
export function Like<T>(value: T | FindOperator<T>) {
    return new FindOperator("like", value);
}
