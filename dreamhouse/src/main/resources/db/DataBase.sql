CREATE SCHEMA project;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

SET search_path = project, pg_catalog;

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       username TEXT NOT NULL,
                       email TEXT UNIQUE NOT NULL,
                       password TEXT NOT NULL
);

CREATE TABLE roles (
                       id INTEGER PRIMARY KEY,
                       name TEXT
);

CREATE TABLE listings (
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

CREATE TABLE images (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        listing_id UUID NOT NULL,
                        image_url TEXT NOT NULL,
                        FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE reviews (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         user_id UUID NOT NULL,
                         listing_id UUID NOT NULL,
                         rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
                         comment TEXT,
                         created_at TIMESTAMP DEFAULT NOW(),
                         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                         FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
                           user_id UUID NOT NULL,
                           listing_id UUID NOT NULL,
                           PRIMARY KEY (user_id, listing_id),
                           FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                           FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE user_role (
                           user_id UUID NOT NULL,
                           role_id INTEGER NOT NULL,
                           PRIMARY KEY (user_id, role_id),
                           FOREIGN KEY (user_id) REFERENCES users(id),
                           FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE SEQUENCE roles_seq START WITH 3 INCREMENT BY 1;

INSERT INTO roles (id, name)
VALUES
    (1, 'ADMIN'),
    (2, 'USER');

-- CREATE SCHEMA project;
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;
-- SET search_path = project, pg_catalog;
--
-- CREATE TABLE users (
--                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--                        username TEXT NOT NULL,
--                        email TEXT UNIQUE NOT NULL,
--                        password TEXT NOT NULL,
-- );
--
-- CREATE TABLE listings (
--                           id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--                           title TEXT NOT NULL,
--                           description TEXT NOT NULL,
--                           price DECIMAL(10,2) NOT NULL,
--                           location TEXT NOT NULL,
--                           surface FLOAT NOT NULL,
--                           rooms INT NOT NULL,
--                           owner_id UUID NOT NULL,
--                           created_at TIMESTAMP DEFAULT NOW()
--                           FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
-- );
--
-- CREATE TABLE images (
--                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--                         listing_id UUID NOT NULL,
--                         image_url TEXT NOT NULL
--                         FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
-- );
--
-- CREATE TABLE reviews (
--                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--                          user_id UUID NOT NULL,
--                          listing_id UUID NOT NULL,
--                          rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
--                          comment TEXT,
--                          created_at TIMESTAMP DEFAULT NOW()
--                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--                          FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
-- );
-- CREATE TABLE favorites (
--                            user_id UUID NOT NULL,
--                            listing_id UUID NOT NULL,
--                            PRIMARY KEY (user_id, listing_id)
--                            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
--                            FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
-- );
--
-- CREATE SEQUENCE roles_seq START WITH 3 INCREMENT BY 1;
--
-- CREATE TABLE roles (
--                        id integer,
--                        name text,
--                        PRIMARY KEY (id)
-- );
--
-- CREATE TABLE user_role (
--                            user_id uuid NOT NULL,
--                            role_id integer NOT NULL,
--                            PRIMARY KEY (user_id, role_id),
--                            FOREIGN KEY (user_id) REFERENCES project.users (id),
--                            FOREIGN KEY (role_id) REFERENCES project.roles (id)
-- );
--
-- INSERT INTO roles (id, name)
-- VALUES
--     (1, 'ADMIN'),
--     (2, 'USER');
--
--
--
--
--
