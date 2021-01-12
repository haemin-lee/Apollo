import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        drchrono_id: Number,
        // TODO: not store password as plaintext
        password: String,
        data: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Patient', schema)
