-- --------------
-- ENTITY MODELS
-- --------------

create table USER (
    -- attributes
    last_name text NOT NULL,
    first_name text NOT NULL,
    -- keys and relations
    email VARCHAR(255) PRIMARY KEY
);

create table DATASET (
    -- attributes
    dataset_name TEXT NOT NULL,
    download_link TEXT NOT NULL,
    dataset_description TEXT,
    -- keys and relations
    dataset_id VARCHAR(36) PRIMARY KEY,
    author_email VARCHAR(255) NOT NULL,
    FOREIGN KEY (author_email) REFERENCES USER(email)
);


create table METRIC (
    -- attributes
    total_downloads INTEGER NOT NULL,
    total_views INTEGER NOT NULL,
    database_version TEXT NOT NULL,
    number_tables INTEGER NOT NULL,

    -- keys and relations
    metrics_id VARCHAR(36) PRIMARY KEY,
    dataset_id VARCHAR(36) NOT NULL,
    FOREIGN KEY (dataset_id) REFERENCES DATASET(dataset_id)
);


CREATE TABLE CATEGORY (
    -- id and relationships
    category_id TEXT PRIMARY KEY,

    -- attributes
    category_name TEXT NOT NULL UNIQUE
);

-- ---------------------
-- ENTITY RELATIONSHIPS
-- ---------------------
create TABLE DATASET_CATEGORIES (
    dataset_id TEXT NOT NULL,
    category_id TEXT NOT NULL,
    FOREIGN KEY (dataset_id) RELATIONSHIPS DATASET(dataset_id)
    FOREIGN KEY (category_id) RELATIONSHIPS CATEGORY(category_id)
);
