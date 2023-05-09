import { Prop, getModelForClass,pre } from "@typegoose/typegoose"
import bycript from 'bcryptjs'

@pre<User>('save', async function hashPassword(next) {
    const salt = await bycript.genSalt(10)
    this.password = await bycript.hash(this.password, salt)
    
    if(this.isModified('password')){
        return next()
    }
})

export class User{
    
    @Prop({
        required:true,
        type:String,
        trim:true,
        lowercase:true,
        index:{unique:true}
        
    })
    email!:string

    @Prop({
        required:true,
        type:String
    })
    password!:string
    
    async comparePassword(clientPassword:string){
        return await bycript.compare(clientPassword,this.password)
    }
}

const modelUser = getModelForClass(User)

export default modelUser