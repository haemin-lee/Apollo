export default {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    projectId: process.env.projectId, // google cloud project id
    db_connection_url: process.env.db_connection_url,
    db_username: process.env.db_username,
    db_password: process.env.db_password,
    drchrono_webhook_secret_token: process.env.drchrono_webhook_secret_token,
    drchrono_authorize_path: process.env.drchrono_authorize_path,
    drchrono_client_id: process.env.drchrono_client_id,
    drchrono_client_secret: process.env.drchrono_client_secret,
    drchrono_redirect_uri: process.env.drchrono_redirect_uri,
}
