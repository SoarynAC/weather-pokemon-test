module.exports = function (temp, cond) {
    if (cond == 'Rain' ||
        cond == 'Thunderstorm') {
        return 'electric'
    } else {
        if (temp < 5) {
            return 'ice'
        } else if (temp >= 5 && temp < 10) {
            return 'water'
        } else if (temp >= 12 && temp < 15) {
            return 'grass'
        } else if (temp >= 15 && temp < 21) {
            return 'ground'
        } else if (temp >= 23 && temp < 27) {
            return 'bug'
        } else if (temp >= 27 && temp <= 33) {
            return 'rock'
        } else if (temp > 33) {
            return 'fire'
        } else {
            return 'normal'
        }
    }
}