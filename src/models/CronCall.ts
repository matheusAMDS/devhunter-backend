import { getModelForClass } from "@typegoose/typegoose"
import { Base, TimeStamps } from "@typegoose/typegoose/lib/defaultClasses"

interface CronCall extends Base {}

class CronCall extends TimeStamps {}

export default getModelForClass(CronCall)