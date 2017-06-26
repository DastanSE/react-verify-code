var path = require('path');
var webpack = require('webpack');

var ROOT_PATH = path.resolve(__dirname);
process.env.NODE_ENV = 'production';

module.exports = {
	// 页面入口文件配置
	entry: {
		index: ['./src/react-verify-code.js']
	},
	// 输出文件配置
	output: {
		path: path.resolve(ROOT_PATH, 'dist'),
		filename: '[name].js',
        library: ['vcode'],
        libraryTarget: 'umd'
	},
    externals: {
        'react': 'react',
        'react-dom': 'react-dom'
      },
	// 解析器配置
	module: {
		loaders: [
			{
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                	presets: ['es2015', 'stage-0', 'react']
                },
                include: [
                  path.join(__dirname, 'src')
                ]
            }
		]
	},
	// 其他解决方案配置
	resolve: {
        extensions: ['.js', '.jsx', '.less', '.css'] //后缀名自动补全
    },
    // 第3方插件配置
    plugins: [
    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    //用来优化生成的代码 chunk,合并相同的代码
    new webpack.optimize.AggressiveMergingPlugin(),

    //用来保证编译过程不出错
    new webpack.NoEmitOnErrorsPlugin(),
    // Uglify 加密压缩源代码
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false, // 是否保留代码格式和所有注释
        },
        compress: {
            warnings: false, // 删除没有用的代码时是否发出警告
            drop_console: true, // 是否删除所有的console
        },
    }),
    ]
};