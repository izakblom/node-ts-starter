/**
 * @swagger
 * components:
 *  schemas:
 *    ErrorResponse:
 *      type: object
 *      properties:
 *       error:
 *        type: object
 *        description: Contains the error descriptions
 *        properties:
 *         message:
 *          type: string
 *          description: Error message description
 *         errors:
 *          type: object
 *          description: Additional errors related to the request
 *      example:
 *        message: Error message
 *        errors: [{}]
 */
export class ErrorResponse {
  constructor(public message: string, public errors?: { message?: string }[]) {}
}
