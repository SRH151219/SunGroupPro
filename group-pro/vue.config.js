const path = require('path');
const webpack = require('webpack')
function resolve (dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    // webpack 配置进行更细粒度的修改  https://cli.vuejs.org/zh/config/#chainwebpack
    chainWebpack: (config)=>{
        //修改文件引入自定义路径
        config.resolve.alias
            .set('@', resolve('src'))
			.set('common', resolve('src/common'))
            .set('style', resolve('src/common/style'))
						.set('components',resolve('src/components'))
						.set('pages',resolve('src/pages'))
						.set('utils', resolve('src/common/utils'))
    },
	devServer: {
    proxy: {
      '/api': {
        target: 'http://47.95.207.1:3000',
        changeOrigin: true,
				pathRewrite:{
				'^/api':'' 
				}		
      }
	
    }
  }
}
