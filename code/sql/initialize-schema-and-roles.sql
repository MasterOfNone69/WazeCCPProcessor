-- create the schema
CREATE SCHEMA waze;

-- create the lambda role
CREATE ROLE lambda_role LOGIN PASSWORD 'LAMBDA_ROLE_PASSWORD_PLACEHOLDER';

-- setup permissions for the lambda role
GRANT ALL ON SCHEMA waze TO lambda_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA waze GRANT ALL ON TABLES TO lambda_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA waze GRANT SELECT, USAGE ON SEQUENCES TO lambda_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA waze	GRANT EXECUTE ON FUNCTIONS TO lambda_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA waze	GRANT USAGE ON TYPES TO lambda_role;


-- Create read-only role
CREATE ROLE waze_readonly LOGIN PASSWORD 'READONLY_ROLE_PASSWORD_PLACEHOLDER';

GRANT CONNECT ON DATABASE waze_data TO waze_readonly;
GRANT USAGE ON SCHEMA waze TO waze_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA waze GRANT SELECT ON SEQUENCES TO waze_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA waze GRANT SELECT ON TABLES TO waze_readonly;
