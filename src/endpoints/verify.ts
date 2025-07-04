import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Task } from "../types";
import { Context } from "hono";

export class Verify extends OpenAPIRoute {
  schema = {
    tags: ["Verification"],
    summary: "Check if the verification code is valid",
    request: {
      body: {
        content: {
          "application/json": {
            schema: z.object({
              verification_code: z.string(),
            }),
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Returns the verification result",
        content: {
          "application/json": {
            schema: z.object({
              success: Bool(),
            }),
          },
        },
      },
    },
  };

  async handle(context: Context) {
    const data = await this.getValidatedData<typeof this.schema>();
    const formIds = context.env.PAYMENT_FORM_IDENTIFIERS.split(",");
    const jotformApiKey = context.env.JOTFORM_API_KEY;
    const jotformApiUrl = context.env.JOTFORM_API_URL;
    const verificationCode = data.body.verification_code.trim();
    let success = false;

    const transformForCompare = (v: string) => {
      return v.toLocaleUpperCase().replace(/\W/g, "");
    };

    for (const formId of formIds) {
      if (success) break;

      const response = await fetch(
        `${jotformApiUrl}/form/${formId}/submissions?apiKey=${jotformApiKey}`
      );
      const data: any = await response.json();
      for (const entity of data.content) {
        try {
          const { answers } = entity;
          const orderNumberAnswer: any = Object.values(answers).find(
            (a: any) => a.name === "uniqueId"
          );
          if (!orderNumberAnswer) continue;
          const orderNumber = orderNumberAnswer.answer;

          if (
            transformForCompare(orderNumber) ===
            transformForCompare(verificationCode)
          ) {
            success = true;
            break;
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    return {
      success,
    };
  }
}
