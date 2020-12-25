module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [  //自动按需引入vant组件
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
