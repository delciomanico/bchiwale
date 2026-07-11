-- B-CHIWALE CMS schema
-- Idempotent: safe to re-run (CREATE TABLE IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS services (
  slug              text PRIMARY KEY,
  order_index       int NOT NULL DEFAULT 0,
  title_pt          text NOT NULL,
  title_en          text,
  description_pt    text,
  description_en    text,
  tags_pt           jsonb DEFAULT '[]',
  tags_en           jsonb,
  subtechniques_pt  jsonb DEFAULT '[]',
  subtechniques_en  jsonb,
  icon_id           text,
  image             text,
  methodology_pt    jsonb DEFAULT '[]',
  methodology_en    jsonb,
  norms_pt          jsonb DEFAULT '[]',
  norms_en          jsonb,
  faqs_pt           jsonb DEFAULT '[]',
  faqs_en           jsonb,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id               serial PRIMARY KEY,
  order_index      int NOT NULL DEFAULT 0,
  initials         text,
  photo            text,
  linkedin         text,
  years_exp        int,
  name_pt          text NOT NULL,
  name_en          text,
  role_pt          text,
  role_en          text,
  bio_pt           text,
  bio_en           text,
  specialties_pt   jsonb DEFAULT '[]',
  specialties_en   jsonb,
  education_pt     text,
  education_en     text,
  languages_pt     jsonb DEFAULT '[]',
  languages_en     jsonb,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS portfolio_items (
  slug             text PRIMARY KEY,
  order_index      int NOT NULL DEFAULT 0,
  service_pt       text,
  service_en       text,
  province         text,
  year             text,
  image            text,
  title_pt         text NOT NULL,
  title_en         text,
  description_pt   text,
  description_en   text,
  client_pt        text,
  client_en        text,
  area_pt          text,
  area_en          text,
  duration_pt      text,
  duration_en      text,
  challenge_pt     text,
  challenge_en     text,
  solution_pt      text,
  solution_en      text,
  results_pt       jsonb,
  results_en       jsonb,
  gallery          jsonb DEFAULT '[]',
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  slug             text PRIMARY KEY,
  order_index      int NOT NULL DEFAULT 0,
  cat_type         text,
  category_pt      text,
  category_en      text,
  date_pt          text,
  date_en          text,
  date_time        text,
  title_pt         text NOT NULL,
  title_en         text,
  excerpt_pt       text,
  excerpt_en       text,
  image            text,
  author_pt        text,
  author_en        text,
  read_time_pt     text,
  read_time_en     text,
  tags_pt          jsonb DEFAULT '[]',
  tags_en          jsonb,
  featured         boolean NOT NULL DEFAULT false,
  body_pt          jsonb,
  body_en          jsonb,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_items (
  id               serial PRIMARY KEY,
  order_index      int NOT NULL DEFAULT 0,
  cat              text,
  province         text,
  accent           text,
  bg               text,
  image            text,
  title_pt         text NOT NULL,
  title_en         text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id               serial PRIMARY KEY,
  order_index      int NOT NULL DEFAULT 0,
  initials         text,
  text_pt          text NOT NULL,
  text_en          text,
  name_pt          text,
  name_en          text,
  meta_pt          text,
  meta_en          text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS jobs (
  id                serial PRIMARY KEY,
  order_index       int NOT NULL DEFAULT 0,
  is_open           boolean NOT NULL DEFAULT true,
  dept_pt           text,
  dept_en           text,
  title_pt          text NOT NULL,
  title_en          text,
  location_pt       text,
  location_en       text,
  type_pt           text,
  type_en           text,
  level_pt          text,
  level_en          text,
  posted_pt         text,
  posted_en         text,
  description_pt    text,
  description_en    text,
  requirements_pt   jsonb DEFAULT '[]',
  requirements_en   jsonb,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_settings (
  key         text PRIMARY KEY,
  label       text,
  value_pt    jsonb NOT NULL,
  value_en    jsonb,
  updated_at  timestamptz NOT NULL DEFAULT now()
);
