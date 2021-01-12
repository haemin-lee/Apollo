import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Doctor', schema)
