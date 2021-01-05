export default {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    projectId: process.env.projectId, // google cloud project id
    db_connection_url: process.env.db_connection_url,
    drchrono_webhook_secret_token: process.env.drchrono_webhook_secret_token,
}
