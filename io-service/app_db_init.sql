CREATE SCHEMA IF NOT EXISTS project;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SET search_path = project, pg_catalog;

CREATE TABLE IF NOT EXISTS users (
                                    id UUID PRIMARY KEY,
                                    username TEXT NOT NULL,
                                    email TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS roles (
                                    id INTEGER PRIMARY KEY,
                                    name TEXT
);

CREATE TABLE IF NOT EXISTS listings (
                                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                    title TEXT NOT NULL,
                                    description TEXT NOT NULL,
                                    price DECIMAL(10,2) NOT NULL,
                                    location TEXT NOT NULL,
                                    surface FLOAT NOT NULL,
                                    rooms INT NOT NULL,
                                    owner_id UUID NOT NULL,
                                    created_at TIMESTAMP DEFAULT NOW(),
                                    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS purchase_requests (
                                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                    listing_id UUID NOT NULL,
                                    requester_id UUID NOT NULL,
                                    message TEXT,
                                    created_at TIMESTAMP DEFAULT NOW(),
                                    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
                                    FOREIGN KEY (requester_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS images (
                                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                    listing_id UUID NOT NULL,
                                    image_url TEXT NOT NULL,
                                    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
                                    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                    user_id UUID NOT NULL,
                                    listing_id UUID NOT NULL,
                                    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
                                    comment TEXT,
                                    created_at TIMESTAMP DEFAULT NOW(),
                                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorites (
                                    user_id UUID NOT NULL,
                                    listing_id UUID NOT NULL,
                                    PRIMARY KEY (user_id, listing_id),
                                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                                    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_profile (
                              user_id UUID PRIMARY KEY,
                              bio TEXT,
                              avatar_url TEXT,
                              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_role (
                                    user_id UUID NOT NULL,
                                    role_id INTEGER NOT NULL,
                                    PRIMARY KEY (user_id, role_id),
                                    FOREIGN KEY (user_id) REFERENCES users(id),
                                    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS feedbacks (
                                   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                   satisfaction_level VARCHAR(255) NOT NULL,
                                   category VARCHAR(255) NOT NULL,
                                   comments TEXT NOT NULL,
                                   want_updates BOOLEAN,
                                   created_at TIMESTAMP DEFAULT NOW()
);

CREATE SEQUENCE IF NOT EXISTS roles_seq START WITH 3 INCREMENT BY 1;

INSERT INTO roles (id, name)
VALUES
    (1, 'client_admin'),
    (2, 'client_user');