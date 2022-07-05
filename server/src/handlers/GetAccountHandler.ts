import { Request, Response } from "express";
import Joi from "joi";
import { ErrorResponse } from "../contracts/ErrorResponse";
import { GetAccountResponse } from "../contracts/GetAccountResponse";
import { WithConnectionAsync } from "../database/WithConnection";
import { BuildAccountsRepository } from "../utils/DependencyBuilders";

/**
 * @swagger
 * /accounts/{id}:
 *  get:
 *      summary: Returns the Account
 *      tags: [Get Account]
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: id
 *          description: Account ID
 *          in: path
 *          required: true
 *          schema:
 *           type: string
 *      responses:
 *        200:
 *          description: OK
 *          content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/GET Account Response'
 *        500:
 *          description: Internal Error
 *          content:
 *           application/json:
 *            schema:
 *              $ref: '#/components/schemas/ErrorResponse'
 */
export const GetAccountHandler = async (req: Request, res: Response) => {
  try {
    const {
      value: { id },
      error,
    } = Joi.object({ id: Joi.string().required() }).validate(req.params);

    if (error) {
      console.error("GetAccountHandler", "Validation error ", error);
      return res.status(400).json(new ErrorResponse("Invalid request"));
    }

    await WithConnectionAsync(async (connection) => {
      const accountsRepository = BuildAccountsRepository(connection);

      const account = await accountsRepository.Get(id);

      if (!account) {
        console.info("GetAccountHandler", "Account not found", id);
        return res.status(404).json(new ErrorResponse("Not Found"));
      }

      const response: GetAccountResponse = {
        id: account.id,
        created: account.created.toISOString(),
        updated: account.updated.toISOString(),
        email: account.email,
        firstName: account.firstName,
        lastName: account.lastName,
      };

      return res.status(200).json(response);
    });
  } catch (error) {
    console.error("GetAccountHandler", "An unknown error occurred");

    return res.status(500).json(new ErrorResponse("Internal Error"));
  }
};
