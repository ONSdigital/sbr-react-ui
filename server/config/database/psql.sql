-- SQL
-- https://stackoverflow.com/questions/6763692/postgres-update-after-select
-- http://www.the-art-of-web.com/sql/trigger-delete-old/

Instructions:
psql
CREATE DATABASE sbr;
\c sbr;

CREATE TABLE IF NOT EXISTS sbr_sessions (
  accessToken varchar(36) NOT NULL,
  username varchar(255) NOT NULL,
  role varchar(255) NOT NULL,
  remoteAddress varchar(39) NOT NULL,
  apiKey varchar(36) NOT NULL,
  sessionExpire timestamp DEFAULT now() + INTERVAL '1 minute'
);

CREATE FUNCTION expire_table_delete_old_rows() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  DELETE FROM sbr_sessions WHERE sessionExpire < now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER expire_table_delete_old_rows_trigger
    BEFORE UPDATE ON sbr_sessions
    EXECUTE PROCEDURE expire_table_delete_old_rows();

-- Create a session
-- 1. Create the new session

INSERT INTO SBR_SESSIONS
(accessToken, username, role, remoteAddress, apiKey)
VALUES
('abc', 'admin', 'admin', '192.168.1.1', 'abc123-def'),
('def', 'test', 'user', '192.168.2.2', 'def-345-cba');

-- Get an API key relating to a session
-- 1. Update the sessionExpire
-- 2. Get the API key

UPDATE sbr_sessions
SET sessionExpire=now() + INTERVAL '8 hours'
FROM (SELECT username, apiKey FROM sbr_sessions) AS subquery
WHERE accessToken='abc'
RETURNING subquery.username, subquery.apiKey

-- Get a session relating to an accessToken
-- 1. Update the sessionExpire
-- 2. Get the username from the session

UPDATE sbr_sessions
SET sessionExpire=now() + INTERVAL '8 hours'
FROM (SELECT username FROM sbr_sessions) AS subquery
WHERE accessToken='abc'
RETURNING subquery.username

-- Kill the user session
DELETE FROM SBR_SESSIONS
WHERE accessToken='qwe';