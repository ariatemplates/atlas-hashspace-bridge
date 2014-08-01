noder.require("noder-js/currentContext").loader.parentLoader.config.preprocessors.push({
    pattern : /\.hsp$/,
    module : "hsp/compiler/compile"
});