-- SQL

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
  sessionExpire timestamp DEFAULT now() + INTERVAL '8 hours'
);

INSERT INTO SBR_SESSIONS
(accessToken, username, role, remoteAddress, apiKey)
VALUES
('abc', 'admin', 'admin', '192.168.1.1', 'abc123-def'),
('def', 'test', 'user', '192.168.2.2', 'def-345-cba');

-- SELECT
SELECT * FROM SBR_SESSIONS
WHERE accessToken='abc';

-- CREATE SESSION
INSERT INTO SBR_SESSIONS
(accessToken, username, remoteAddress, apiKey)
VALUES
('qwe', 'admin', 'admin', '192.168.1.4', 'asdasd-def');

-- GET API KEY
SELECT username, apiKey
FROM SBR_SESSIONS
WHERE accessToken='qwe';

-- GET SESSION
SELECT username
FROM SBR_SESSIONS
WHERE accessToken='qwe';

-- KILL SESSION
DELETE FROM SBR_SESSIONS
WHERE accessToken='qwe';