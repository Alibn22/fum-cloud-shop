import { Typegoose, prop, Ref } from "typegoose";
import Profile from "./Profile";
import * as mongoose from 'mongoose';
import config from "../config";

export class Transaction extends Typegoose {
    @prop()
    type: string

    @prop({required:true})
    createdAt: Date

    @prop()
    modifiedAt: Date

    @prop({required:true})
    amount: number

    @prop()
    refId: number

    @prop()
    statusCode: number

    @prop()
    orderId: number

    @prop({ ref: Profile,required:true })
    profile: Ref<Profile>
}

export default Transaction

export const TransactionModel = new Transaction().getModelForClass(Transaction)
