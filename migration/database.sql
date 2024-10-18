-- Creating the Users table
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,                  -- Unique identifier for each user
    username VARCHAR(255) NOT NULL,              -- Username for user
    email VARCHAR(255) UNIQUE NOT NULL,          -- User email, must be unique
    password VARCHAR(255) NOT NULL,              -- User's password (hashed)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- When the user was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP  -- When the user information was last updated
);

-- Creating the MentalStates table
CREATE TABLE MentalStates (
    mental_state_id SERIAL PRIMARY KEY,          -- Unique identifier for each mental state
    state_name VARCHAR(255) NOT NULL,            -- Name of the mental state (e.g., Depression, Anxiety)
    description TEXT                             -- Description of the mental state
);

-- Creating the JournalEntries table
CREATE TABLE JournalEntries (
    entry_id SERIAL PRIMARY KEY,                 -- Unique identifier for each journal entry
    user_id INT NOT NULL,                        -- Foreign key referencing Users
    text TEXT NOT NULL,                          -- Text content of the journal entry
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- When the journal entry was created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- When the journal entry was last updated
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE  -- Deletes journal entries if the user is deleted
);

-- Creating the TriggerWords table
CREATE TABLE TriggerWords (
    trigger_word_id SERIAL PRIMARY KEY,          -- Unique identifier for each trigger word
    word VARCHAR(255) NOT NULL,                  -- Specific word or phrase that indicates a mental state
    mental_state_id INT NOT NULL,                -- Foreign key referencing MentalStates
    FOREIGN KEY (mental_state_id) REFERENCES MentalStates(mental_state_id) ON DELETE CASCADE  -- Deletes associated trigger words if the mental state is deleted
);

-- Creating the AutoReplies table
CREATE TABLE AutoReplies (
    auto_reply_id SERIAL PRIMARY KEY,            -- Unique identifier for each auto-reply
    mental_state_id INT NOT NULL,                -- Foreign key referencing MentalStates
    response_text TEXT NOT NULL,                 -- Text of the automated response
    FOREIGN KEY (mental_state_id) REFERENCES MentalStates(mental_state_id) ON DELETE CASCADE  -- Deletes auto-replies if the mental state is deleted
);
