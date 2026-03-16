CREATE INDEX idx_messages_conversation
ON messages(conversation_id);

CREATE INDEX idx_messages_created_at
ON messages(created_at);

CREATE INDEX idx_members_user
ON conversation_members(user_id);