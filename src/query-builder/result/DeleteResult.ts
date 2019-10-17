/**
 * Result object returned by DeleteQueryBuilder execution.
 */
export class DeleteResult {
    /**
     * Raw SQL result returned by executed query.
     */
    raw: any;

    /**
     * Number of affected rows/documents
     * Not all drivers support this
     */
    affected?: number;
}
