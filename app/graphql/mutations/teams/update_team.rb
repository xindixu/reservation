module Mutations
  module Teams
    class UpdateTeam < Mutations::BaseMutation
      argument :id, ID, required: true
      argument :name, String, required: false
      argument :description, String, required: false
      argument :email, String, required: false
      argument :phone, String, required: false
      argument :manager_ids, [ID], required: false

      field :team, Types::TeamType, null: true
      field :errors, [String], null: false

      def resolve(id:, **options)
        team = Team.find(id)
        options[:manager_ids]&.each do |manager_id|
          manager = Manager.find(manager_id)
          team.managers << manager unless team.managers.include? manager
        end
        options.except!(:manager_ids)

        team.update!(**options)

        if team.save
          {
            team: team,
            errors: []
          }
        else
          {
            team: nil,
            errors: team.errors.full_messages
          }
        end
      end
    end
  end
end