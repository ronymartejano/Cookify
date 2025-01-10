CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    cooking_time INT, -- in minutes
    servings INT,
    category TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipes (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    quantity TEXT NOT NULL,
    unit TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE instructions (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipes (id) ON DELETE CASCADE,
    step_number INT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE tips (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipes (id) ON DELETE CASCADE,
    tip TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE,
    recipe_id INT REFERENCES recipes (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    recipe_id INT REFERENCES recipes (id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users (id) ON DELETE SET NULL,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
