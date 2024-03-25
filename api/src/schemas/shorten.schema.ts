import { Static, Type } from '@sinclair/typebox';

const shortenRequestSchema = Type.Object({
  urls: Type.Array(Type.String({ format: 'uri' }), { minItems: 1 }),
  command: Type.Union([Type.Literal('short'), Type.Literal('nyart')]),
  expiration: Type.Integer({ minimum: 1, maximum: 15768000 }),
  maxClicks: Type.Optional(Type.String({ pattern: '^[0-9]+$' })),
  customPrefix: Type.Optional(Type.String({ maxLength: 12 })),
  hashLength: Type.Optional(Type.Integer({ minimum: 2, maximum: 8 })),
});

export type ShortenRequest = Static<typeof shortenRequestSchema>;

export const shortenRequestSchemaValidator = {
  body: shortenRequestSchema,
};
