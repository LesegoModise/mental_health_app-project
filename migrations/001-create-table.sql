-- Table for users
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
);

-- Table for journal entries
CREATE TABLE journal_entries (
    entry_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    entry_date DATE NOT NULL,
    content TEXT NOT NULL,
    mood TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

-- Table for weekly reports
CREATE TABLE weekly_reports (
    report_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    report_content TEXT,
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

