//import { required } from 'joi';
import { model, Schema } from 'mongoose';

const sessionsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntsl: { type: Date, required: true },
    refreshTokenValidUntsl: { type: Date, required: true },
},
    { timestamps: true, versionKey: false },
);

export const SessionsCollection = model('sessions', sessionsSchema);
