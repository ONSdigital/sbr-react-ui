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