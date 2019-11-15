-- ------------------------------
-- create some fake user accounts
INSERT INTO
    USER
VALUES
    (
        'tu_1_last_name',
        'tu_1',
        'tu_1_email@test.com'
    );

INSERT INTO
    USER
VALUES
    (
        'tu_2_last_name',
        'tu_2',
        'tu_2_email@test.com'
    );

-----------------------------
-- create some fake datasets
-- for each test user account
SET
    @tu_1_d1_id = uuid();

INSERT INTO
    DATASET (
        dataset_name,
        download_link,
        dataset_description,
        dataset_id,
        author_email
    )
VALUES
    (
        'tu_1_document_1',
        'tu_1_document_1_download_link.com',
        'tu_1_document_1_description',
        @tu_1_d1_id,
        'tu_1_email@test.com'
    );

INSERT INTO
    METRIC (
        total_downloads,
        total_views,
        database_version,
        number_tables,
        metrics_id,
        dataset_id
    )
VALUES
    (
        11,
        11,
        'tu_1_document_1_database_version',
        11,
        uuid(),
        @tu_1_d1_id
    );

SET
    @tu_1_d2_id = uuid();

INSERT INTO
    DATASET (
        dataset_name,
        download_link,
        dataset_description,
        dataset_id,
        author_email
    )
VALUES
    (
        'tu_1_document_2',
        'tu_1_document_2_download_link.com',
        'tu_1_document_2_description',
        @tu_1_d2_id,
        'tu_1_email@test.com'
    );

INSERT INTO
    METRIC (
        total_downloads,
        total_views,
        database_version,
        number_tables,
        metrics_id,
        dataset_id
    )
VALUES
    (
        12,
        12,
        'tu_1_document_2_database_version',
        12,
        uuid(),
        @tu_1_d2_id
    );

SET
    @tu_2_d1_id = uuid();

INSERT INTO
    DATASET (
        dataset_name,
        download_link,
        dataset_description,
        dataset_id,
        author_email
    )
VALUES
    (
        'tu_2_document_1',
        'tu_2_document_1_download_link.com',
        'tu_2_document_1_description',
        @tu_2_d1_id,
        'tu_2_email@test.com'
    );

INSERT INTO
    METRIC (
        total_downloads,
        total_views,
        database_version,
        number_tables,
        metrics_id,
        dataset_id
    )
VALUES
    (
        21,
        21,
        'tu_2_document_1_database_version',
        21,
        uuid(),
        @tu_2_d1_id
    );

SET
    @tu_2_d2_id = uuid();

INSERT INTO
    DATASET (
        dataset_name,
        download_link,
        dataset_description,
        dataset_id,
        author_email
    )
VALUES
    (
        'tu_2_document_2',
        'tu_2_document_2_download_link.com',
        'tu_2_document_2_description',
        @tu_2_d2_id,
        'tu_2_email@test.com'
    );

INSERT INTO
    METRIC (
        total_downloads,
        total_views,
        database_version,
        number_tables,
        metrics_id,
        dataset_id
    )
VALUES
    (
        22,
        22,
        'tu_2_document_2_database_version',
        22,
        uuid(),
        @tu_2_d2_id
    );

INSERT INTO
    METRIC (
        total_downloads,
        total_views,
        database_version,
        number_tables,
        metrics_id,
        dataset_id
    )
VALUES
    (
        22,
        22,
        'tu_2_document_2_database_version',
        22,
        uuid(),
        @tu_2_d2_id
    );