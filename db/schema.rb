# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140322190840) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: true do |t|
    t.integer  "user_id"
    t.integer  "favoriteable_id"
    t.string   "favoriteable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "favorites", ["favoriteable_id", "favoriteable_type"], name: "index_favorites_on_favoriteable_id_and_favoriteable_type", using: :btree
  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "poems", force: true do |t|
    t.text     "title"
    t.text     "author"
    t.text     "body"
    t.datetime "added_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "readings", force: true do |t|
    t.text     "description"
    t.integer  "user_id"
    t.integer  "poem_id"
    t.datetime "added_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "wav_file_name"
    t.string   "wav_content_type"
    t.integer  "wav_file_size"
    t.datetime "wav_updated_at"
  end

  add_index "readings", ["poem_id"], name: "index_readings_on_poem_id", using: :btree
  add_index "readings", ["user_id"], name: "index_readings_on_user_id", using: :btree

  create_table "trigrams", force: true do |t|
    t.string  "trigram",     limit: 3
    t.integer "score",       limit: 2
    t.integer "owner_id"
    t.string  "owner_type"
    t.string  "fuzzy_field"
  end

  add_index "trigrams", ["owner_id", "owner_type", "fuzzy_field", "trigram", "score"], name: "index_for_match", using: :btree
  add_index "trigrams", ["owner_id", "owner_type"], name: "index_by_owner", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "username",                            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
