class SetupDefaultTablesForConnect < ActiveRecord::Migration[5.0]
  def change
  	create_table "sessions", force: :cascade do |t|
	    t.string   "session_id", null: false
	    t.text     "data"
	    t.timestamps
	    t.index ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
	    t.index ["updated_at"], name: "index_sessions_on_updated_at", using: :btree
 	end

	 create_table "zuora_connect_app_instances", force: :cascade do |t|
	    t.timestamps                          
	    t.string   "access_token"
	    t.string   "refresh_token"
	    t.string   "token"
	    t.datetime "oauth_expires_at"
	    t.string   "api_token"
	    t.datetime "catalog_updated_at"
	    t.jsonb    "catalog"
	    t.jsonb    "catalog_mapping"
	    t.datetime "catalog_update_attempt_at"
	 end
  end
end
