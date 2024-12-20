-- Inserting a sample user
INSERT INTO users (username, email) VALUES ('eric_nkosi', 'eric.nkosi@gmail.com');

-- Inserting sample journal entries


INSERT INTO journal_entries (user_id, entry_date, content, mood)
VALUES (1, '2024-10-17', 'i had a very hectic morning meeting, and my day was just all over the place.', 'anxiety');

INSERT INTO journal_entries (user_id, entry_date, content, mood)
VALUES (1, '2024-10-17', 'it was just a normal day', 'neutral');


INSERT INTO journal_entries (user_id, entry_date, content, mood)
VALUES (1, '2024-10-18', 'Worked on the app and felt very productive.', 'Happy');

INSERT INTO journal_entries (user_id, entry_date, content, mood)
VALUES (1, '2024-10-21', 'I feel so depressed. My boss does not want to pay us and I am broke. Never working overtime again!', 'Depressed');


-- Generating a weekly report
INSERT INTO weekly_reports (user_id, start_date, end_date, report_content)
SELECT user_id, '2024-10-14', '2024-10-20', GROUP_CONCAT(content, '\n\n')
FROM journal_entries
WHERE user_id = 1 AND entry_date BETWEEN '2024-10-14' AND '2024-10-20'
GROUP BY user_id;

INSERT INTO moods (user_id, mood) 
VALUES (1, 'happy', 'sad', 'neutral', 'angry');

