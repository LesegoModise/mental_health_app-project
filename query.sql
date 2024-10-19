SELECT * FROM journal_entries WHERE entry_date = '2024-10-18';

ALTER TABLE journal_entries
ADD COLUMN mood TEXT;

UPDATE journal_entries
SET mood = 'Content'
WHERE entry_id = 1;

SELECT * FROM journal_entries;


SELECT * FROM weekly_reports WHERE user_id = 1 AND start_date = '2024-10-14';

ALTER TABLE weekly_reports
ADD COLUMN mood TEXT;