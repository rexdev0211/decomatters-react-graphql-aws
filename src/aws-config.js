const awsmobile = {
  aws_project_region: process.env.REACT_APP_AWS_REGION,
  aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USERPOOLS_WEB_CLIENT_ID,
  oauth: {},
  federationTarget: process.env.REACT_APP_AWS_FEDERATION_TARGET,
  aws_content_delivery_bucket: process.env.REACT_APP_AWS_CONTENT_BUCKET,
  aws_content_delivery_bucket_region: process.env.REACT_APP_AWS_CONTENT_REGION,
  aws_content_delivery_url: process.env.REACT_APP_AWS_CONTENT_URL
}

export default awsmobile
