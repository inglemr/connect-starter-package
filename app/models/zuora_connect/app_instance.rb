module ZuoraConnect
  class AppInstance < ZuoraConnect::AppInstanceBase

    def new_session(session: self.data_lookup, username: self.access_token, password: self.refresh_token)
      super

      if self.task_data.present?
        data = self.task_data
      end
      return self
    end
  end
end


