-- CreateTables
CREATE TABLE IF NOT EXISTS courses (
  "id" INTEGER NOT NULL,
  "name" TEXT NOT NULL,

  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS students (
  "netid" TEXT NOT NULL,
  "fname" TEXT NOT NULL,
  "lname" TEXT NOT NULL,
  "ista" BOOLEAN NOT NULL,

  PRIMARY KEY ("netid")
);

CREATE TABLE IF NOT EXISTS linkStudentToTACourses (
  "netid" TEXT NOT NULL,
  "id" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS linkStudentToCourses (
  "netid" TEXT NOT NULL,
  "id" INTEGER NOT NULL
);

-- Seed
INSERT INTO courses (id, name) VALUES (403, 'software-engineering');
INSERT INTO courses (id, name) VALUES (344, 'data-management');
INSERT INTO students (netid, fname, lname, ista) VALUES ('izzyv', 'Isabelle', 'Velasco', FALSE);
INSERT INTO students (netid, fname, lname, isTA) VALUES ('pfateev', 'Pasha', 'Fateev', TRUE);
INSERT INTO students (netid, fname, lname, isTA) VALUES ('wma5', 'Wendi', 'Ma', FALSE);
INSERT INTO students (netid, fname, lname, isTA) VALUES ('trivuong', 'Tri', 'Vuong', TRUE);
INSERT INTO students (netid, fname, lname, isTA) VALUES ('jaredtran', 'Jared', 'Tran', FALSE);
INSERT INTO linkStudentToTACourses (netid, id) VALUES ('pfateev', 403);
INSERT INTO linkStudentToTACourses (netid, id) VALUES ('trivuong', 344);
INSERT INTO linkStudentToCourses (netid, id) VALUES ('izzyv', 344);
INSERT INTO linkStudentToCourses (netid, id) VALUES ('wma5', 403);
INSERT INTO linkStudentToCourses (netid, id) VALUES ('jaredtran', 403);