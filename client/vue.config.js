const path = require('path')

module.exports = {
    chainWebpack: (config) => {
        config.plugin('copy').tap((options) => {
            options[0][0].ignore.push('data/**/*')
            return options
        })
    }
}
