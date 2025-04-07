-- Add migration script here
CREATE TABLE IF NOT EXISTS
    "messages" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "chat_id" TEXT NOT NULL,
        "role" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chat_id) REFERENCES chats (id) ON DELETE CASCADE
    );

CREATE INDEX IF NOT EXISTS idx_chat_id ON messages (chat_id);