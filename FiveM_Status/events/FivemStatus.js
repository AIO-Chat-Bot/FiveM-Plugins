const axios = require('axios')
let config = require('../config/FivemStatus.json')

module.exports = {
  event: "ready", // Name of the event
  oneTime: true, // If set to true the event will only be fired once until the client is restarted
  run: async (client) => {

        setInterval(function () {
              axios.get(`http://${config.SERVER_IP}/players.json`).then(data => {
                var users = data.data
                var que = config.STATUS_TEXT
                var guildd = que.replace("{ONLINE}", users.length)
                client.user.setActivity(guildd.replace("{SLOTS}", config.SERVER_MAX_SLOTS), {
                    type: config.Type_Of_Status
                  });
        }).catch(err => {
            var que = config.STATUS_TEXT
            var guilddd = que.replace("/", "")
            var guildd = guilddd.replace("{ONLINE}", "OFFLINE")
            client.user.setActivity(guildd.replace("{SLOTY}", ""), {
                type: config.Type_Of_Status
            });
        });
        }, config.update_in_ms)

  },
};