import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        drchrono_id: Number,
        data: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Appointment', schema)
