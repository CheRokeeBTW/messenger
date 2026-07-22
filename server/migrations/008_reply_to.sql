ALTER TABLE messages
ADD COLUMN reply_to UUID
REFERENCES messages(id);