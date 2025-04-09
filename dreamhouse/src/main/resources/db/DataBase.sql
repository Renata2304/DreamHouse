CREATE SCHEMA project;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SET search_path = project, pg_catalog;

CREATE TABLE project.users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       name TEXT NOT NULL,
                       email TEXT UNIQUE NOT NULL,
                       password_hash TEXT NOT NULL,
                       role TEXT CHECK (role IN ('Buyer', 'Seller', 'Agent')) NOT NULL,
                       created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE project.listings (
                          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          title TEXT NOT NULL,
                          description TEXT NOT NULL,
                          price DECIMAL(10,2) NOT NULL,
                          location TEXT NOT NULL,
                          surface FLOAT NOT NULL,
                          rooms INT NOT NULL,
                          owner_id UUID NOT NULL,
                          created_at TIMESTAMP DEFAULT NOW()
                          FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE project.images (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        listing_id UUID NOT NULL,
                        image_url TEXT NOT NULL
                        FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

CREATE TABLE project.reviews (
                         id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         user_id UUID NOT NULL,
                         listing_id UUID NOT NULL,
                         rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
                         comment TEXT,
                         created_at TIMESTAMP DEFAULT NOW()
                         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                         FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);
CREATE TABLE project.favorites (
                           user_id UUID NOT NULL,
                           listing_id UUID NOT NULL,
                           PRIMARY KEY (user_id, listing_id)
                           FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                           FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);




