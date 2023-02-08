-- CreateTable
CREATE TABLE IF NOT EXISTS courses (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,

  PRIMARY KEY ("id")
);

-- Seed
INSERT INTO courses2 (id, name) VALUES ('403', 'software-engineering');