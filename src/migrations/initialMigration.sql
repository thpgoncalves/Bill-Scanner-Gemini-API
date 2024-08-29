CREATE TABLE IF NOT EXISTS measurements (
  id SERIAL PRIMARY KEY,
  measure_uuid VARCHAR(255) NOT NULL UNIQUE,
  customer_code VARCHAR(255) NOT NULL,
  measure_datetime TIMESTAMP NOT NULL,
  measure_type VARCHAR(50) NOT NULL CHECK (measure_type IN ('WATER', 'GAS')),
  value INTEGER NOT NULL,
  image_link VARCHAR(255) NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE
);
