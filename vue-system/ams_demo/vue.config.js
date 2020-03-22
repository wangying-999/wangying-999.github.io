


module.exports={
    publicPath:"",
    devServer:{
        host:"0.0.0.0",
        port:8081,
        open:true,
        proxy:{
            "/vue":{
                target:"http://localhost:9999",
                changeOrigin:true,
            },
        }
    },
    configureWebpack: {
        externals: {
          "BMap": "BMap"
        }
      }
    
}