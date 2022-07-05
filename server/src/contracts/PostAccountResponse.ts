/**
 * @swagger
 * components:
 *  schemas:
 *    POST Account Response:
 *      type: object
 *      properties:
 *       email:
 *          type: string
 *          description: Email
 *       firstName:
 *         type: string
 *         description: First Name
 *       lastName:
 *         type: string
 *         description: Last Name
 *       id:
 *         type: string
 *         description: Account ID
 *       created:
 *         type: string
 *         description: Created timestamp
 *       updated:
 *         type: string
 *         description: Last update timestamp
 *      example:
 *        email: test@test.com
 *        firstName: John
 *        lastName: Doe
 *        id: de8929839298d89sdfjiw8er
 *        created: 2022-07-04T19:06:00.657Z
 *        updated: 2022-07-04T19:06:00.657Z
 */
export type PostAccountResponse = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  created: string;
  updated: string;
};
