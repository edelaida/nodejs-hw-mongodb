//mport { required } from "joi";
import { model, Schema } from "mongoose";

const contactsSchema = new Schema(
    {  
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        isFavourite: {
            type: Boolean,
            required: true,
            default: false,
        },
        contactType: {
            type: String,
            enum: ['work', 'home', 'personal'],
            required: true,
            default: 'personal',
        },
        // userId: {
        //     type: Schema.Types.ObjectId,
        //     required: true,
        // },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const ContactsCollection = model('contacts', contactsSchema);