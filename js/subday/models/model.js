import auth from '../../utils/auth'
import appUrl from '../../utils/appUrl'
import states from '../../utils/states'
import routes from '../../pageTemplate/routes'
import m from 'mithril'

export default {
    state: states.READY,
    channelID: "",
    subdayID: "",
    route: routes.SUBDAY,
    rouletteInfo: {
        items: [{
            footer: "Карусель"
        }],
        winner: 0,
        date: new Date().toString(),
        animationInterval: 0.5
    },
    resetRoulette() {
        this.rouletteInfo = {
            items: [{
                footer: "Карусель"
            }],
            winner: 0,
            date: new Date().toString(),
            animationInterval: 0.5
        }
    },
    playingRoulette: false,
    formRandomArray(inputWinner) {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var formedArray = []
        var items = 15 + getRandomInt(0, 20)
        var winner = 15 + getRandomInt(0, items - 20)
        for (var i = 0; i < items; i++) {
            if (i == winner) {
                formedArray.push(inputWinner)
            } else {
                formedArray.push(this.object.votes[getRandomInt(0, this.object.votes.length - 1)])

            }
        }
        this.rouletteInfo = {
            items: formedArray.map(f => {
                return {
                    footer: f.game,
                    header: f.user
                }
            }),
            winner: winner,
            date: new Date().toString(),
            animationInterval: 0.5
        }
        console.log(this.rouletteInfo)
    },
    object: {
        votes: [],
        winners: [],
        winnersHistory: []
    },
    close: function () {
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/subdays/${this.subdayID}/close`),
            method: "GET"
        }).then(result => {
            this.resetRoulette()
            this.get(this.channelID, this.subdayID)
        })
    },
    pullWinner: function (user) {
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/subdays/${this.subdayID}/pullwinner/${user}`),
            method: "GET"
        }).then(result => {
            this.resetRoulette()
            this.get(this.channelID, this.subdayID)
        })
    },
    randomize: function (block, subs, nonsubs) {
        if (this.playingRoulette == true) {
            return
        }
        let url = `api/channel/${this.channelID}/subdays/${this.subdayID}/randomize`
        if (subs === true) {
            url = `api/channel/${this.channelID}/subdays/${this.subdayID}/randomizeSubs`
        }
        if (nonsubs === true) {
            url = `api/channel/${this.channelID}/subdays/${this.subdayID}/randomizeNonSubs`
        }
        auth.request({
            url: appUrl(url),
            method: "GET"
        }).then(result => {
            if (!!result.user) {
                if (block == true) {
                    this.formRandomArray(result)

                    this.playingRoulette = true

                    setTimeout(function () {
                        this.playingRoulette = false
                        this.get(this.channelID, this.subdayID)
                    }.bind(this), (this.rouletteInfo.winner) * 1000 * 0.5 + 2000)
                }
            }
            if (this.playingRoulette != true) {
                this.get(this.channelID, this.subdayID)
            }
        })
    },
    get: function (channel, subdayID, init) {
        this.channelID = channel
        this.subdayID = subdayID
        if (init == true) {

            this.state = states.LOADING
        }
        this.route = m.route.get()
        auth.request({
            url: appUrl(`api/channel/${this.channelID}/subdays/${this.subdayID}`)
        }).then(response => {
            if (!!response) {
                this.object = response
                this.subdayID = response.id
            }
            this.state = states.READY

        }).catch(error => {
            if (error.Code = 401) {
                this.state = states.FORBIDDEN
            }
            if (error.Code = 404) {
                this.state = states.NOTFOUND
            }
        })
    }
};