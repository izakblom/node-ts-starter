import Joi from "joi";

/**
 * @swagger
 * components:
 *  schemas:
 *    POST Account Request:
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
 *      example:
 *        email: test@test.com
 *        firstName: John
 *        lastName: Doe
 */
export type PostAccountRequest = {
  email: string;
  firstName: string;
  lastName: string;
};

export const PostAccountRequestValidationSchema =
  Joi.object<PostAccountRequest>({
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }).required();
