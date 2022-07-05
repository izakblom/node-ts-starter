import { Request, Response } from "express";
import { ErrorResponse } from "../contracts/ErrorResponse";
import { PostAccountRequestValidationSchema } from "../contracts/PostAccountRequest";
import { PostAccountResponse } from "../contracts/PostAccountResponse";
import { WithConnectionAsync } from "../database/WithConnection";
import {
  BuildAccountsRepository,
  BuildAccountsService,
} from "../utils/DependencyBuilders";

/**
 * @swagger
 * /accounts/:
 *  post:
 *      summary: Creates an Account
 *      tags: [POST Account]
 *      produces:
 *        - application/json
 *      requestBody:
 *        required: true
 *        content:
 *         application/json:
 *          schema:
 *              $ref: '#/components/schemas/POST Account Request'
 *      responses:
 *        201:
 *          description: Created
 *          content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/POST Account Response'
 *        400:
 *          description: Bad request
 *          content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *
 *        409:
 *          description: Duplicate request
 *          content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *        500:
 *          description: Internal Error
 *          content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 *
 */
export const PostAccountHandler = async (req: Request, res: Response) => {
  try {
    const { value, error } = PostAccountRequestValidationSchema.validate(
      req.body,
      { abortEarly: false }
    );

    if (error) {
      console.error("PostAccountHandler", "Validation error ", error);
      return res
        .status(400)
        .json(
          new ErrorResponse("Invalid Request", [{ message: error.message }])
        );
    }
    await WithConnectionAsync(async (connection) => {
      const accountsService = BuildAccountsService(connection);
      const accountsRepository = BuildAccountsRepository(connection);

      const existing = await accountsRepository.GetByEmail(value.email);

      if (existing) {
        return res.status(409).json(new ErrorResponse("Existing Account"));
      }

      const account = await accountsService.Create(value);

      console.error("PostAccountHandler", "Account created", account);

      const response: PostAccountResponse = {
        id: account.id,
        created: account.created.toISOString(),
        updated: account.updated.toISOString(),
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
      };

      return res.status(201).json(response);
    });
  } catch (error) {
    console.error("PostAccountHandler", "Error", error);

    return res.status(500).json(new ErrorResponse("Internal Error"));
  }
};
