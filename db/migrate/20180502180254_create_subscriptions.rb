class CreateSubscriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :subscriptions do |t|
      t.string :name
      t.string :zuora_id

      t.timestamps
    end
  end
end
