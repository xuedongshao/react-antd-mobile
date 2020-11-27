  # 使用说明

    此项目是用react做的移动端项目，所用技术栈：react + react-router + react-redux + scss + typescript + es6/7

  1. 安装模块

      js版本：npx create-react-app [项目名称]
      ts版本：npx create-react-app [项目名称] --template typescript

  2. 配置移动端开发

      1. yarn eject 暴露webpack配置

      2. yarn start 启动的时候会报错(./errorImg/1.jpg)

          报错信息：Error:[BABEL] .../src/index.tsx Cannot find module '@babel/plugin-syntax-jsx'
          解决：删除node_modules,重新安装,tsconfig.json下的"jsx":"react-jsx"改为"jsx":"react"
          参考链接：https://github.com/facebook/create-react-app/issues/6099

      3. 移动端适配俩种方案

        俩种方法
        一、 px转rem
            yarn add lib-flexible postcss-px2rem
            安装完模块后，设置 index.html
            <meta name="viewport" content="width=device-width,inital-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">

            然后项目入口文件 /src/index.tsx --- import 'lib-flexible';

            最后修改 /config/webpack.config.js
              const px2rem = require('postcss-px2rem')
              ```
                      {
                      // Options for PostCSS as we reference these options twice
                      // Adds vendor prefixing based on your specified browser support in
                      // package.json
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // Necessary for external CSS imports to work
                        // https://github.com/facebook/create-react-app/issues/2677
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          require('postcss-preset-env')({
                            autoprefixer: {
                              flexbox: 'no-2009',
                            },
                            stage: 3,
                          }),
                          px2rem({remUnit: 75}),  // **添加的内容** remUnit为1rem对应的px值，可以自己进行定义

                          // Adds PostCSS Normalize as the reset css with default options,
                          // so that it honors browserslist config in package.json
                          // which in turn let's users customize the target behavior as per their needs.
                          postcssNormalize(),
                        ],
                        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
                      },
                    },
              ```

              参考链接：https://juejin.cn/post/6844903921241030664

        二、 px转vw



  3. 配置scss，配置css-modules(类似vue的scoped)

      配置scss
        npx create-react-app 默认会加载sass-loader，但是把css文件后缀改为.scss，会报错：找不到sass模块
        解决方法:yarn add sass

      配置css-modules
        使用create-react-app自带的css-modules---俩种方法
            1. 修改 ```*.css,*.scss``` 文件为 ```*.module.css,*.module.scss```
            2. 找到```./config/webpack.config.js```下的```cssRegex```和```sassRegex```,添加一行代码 module:true
                (```)
                  use: getStyleLoaders({
                  importLoaders: 1,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                  modules: true, //添加的内容
                })
                (```)

                >tips：如果是react+typescript的项目，第二种方法会报错( error:找不到 ./App.scss 模块 )
                       解决方法：在项目根目录下的 react-app-end.d.ts 文件中添加 declare module '*.css'/'*.scss'

           **配置**参考链接：https://juejin.cn/post/6844903760867786759

           **类名使用**三种方式：
                import AppStyle from './App.scss'
                  1. ```<p className={AppStyle.test}></p>```
                  2. 如果类名是```[test-style]```这种的,推荐写法```<p className={AppStyle['testStyle']}></p>```,不推荐写法 ```<p className={AppStyle['test-tyle']}></p>```
                     参考链接：https://github.com/css-modules/css-modules---Naming标题
                  3. 配合classnames模块试用
                      (```)
                        import classnames from 'classnames'
                        let cx = classNames.bind(AppStyle);
                        const App=props=>{
                          return (
                            <p className=({testStyle:true})></p>
                          )
                        }
                      (```)

  4.





