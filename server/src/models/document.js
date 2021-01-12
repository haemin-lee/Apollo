import mongoose from 'mongoose'

const schema = mongoose.Schema(
    {
        appointment: Number,
        patient: Number,
        name: String,
        data: mongoose.Schema.Types.Mixed,
        type: {
            type: String,
            enum: [
                'IMAGE',
                'DOCUMENT',
                'DOCUSIGN',
                'BAR_GRAPH',
                'LINE_GRAPH',
                'PIE_GRAPH',
            ],
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model('Document', schema)
