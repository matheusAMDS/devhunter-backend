import { getModelForClass, prop } from "@typegoose/typegoose"
import { Base } from "@typegoose/typegoose/lib/defaultClasses"

class Job extends Base {
  @prop({ required: true })
  title: string 

  @prop({ required: true })
  description: string 

  @prop({ required: true })
  company: string 

  @prop({ required: true })
  location: string

  @prop({ required: true })
  work_regime: string

  @prop({ type: [String], required: true })
  tags: String[]

  @prop({ type: Date, required: true })
  created_at: Date
}

export default getModelForClass(Job)