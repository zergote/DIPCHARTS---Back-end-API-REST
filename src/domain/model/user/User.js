import { Model } from 'objection'

export default class User extends Model {
  // Table name is the only required property.
  static tableName = 'USER'

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: [
      'ID',
      'USER_NAME',
      'PASSWORD',
      'FIRST_NAME',
      'LAST_NAME',
      'ROL',
      'EMAIL',
      'USER_LEVEL',
    ],

    properties: {
      ID: { type: 'string' },
      USER_NAME: { type: 'string', maxLength: 255 },
      PASSWORD: { type: 'string' },
      FIRST_NAME: { type: 'string', maxLength: 255 },
      LAST_NAME: { type: 'string', maxLength: 255 },
      ROL: { type: 'string', minLength: 1, maxLength: 255 },
      EMAIL: { type: 'string' },
      USER_LEVEL: { type: 'number' },
      ACTIVE_STATUS: { type: 'boolean' },
    },
  }

  // Add defines the relations to other models.
}
