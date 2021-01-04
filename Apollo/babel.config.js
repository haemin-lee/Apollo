module.exports = function (api) {
    api.cache(() => process.env.NODE_ENV)
    const presets = [['module:metro-react-native-babel-preset']]
    const plugins = [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./'],
                extensions: ['.js'],
                alias: {
                    '@app': './src',
                },
            },
        ],
    ]

    return {
        presets,
        plugins,
    }
}
