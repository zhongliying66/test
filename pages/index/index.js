//index.js
//获取应用实例
const app = getApp()

Page({
 data:{
   markers:[],
   controls: [{
     id: 1,
     iconPath: '/resources/pin.png',
     position: {
       left: (app.globalData.windowWidth)/2-15,
       top: (app.globalData.windowHeight-40) / 2 - 40,
       width: 30,
       height: 40
     },
     clickable: false
   },
     {
       id: 1,
       iconPath: '/resources/center.png',
       position: {
         left: 20,
         top: 500,
         width: 40,
         height: 40
       },
       clickable: true
     }
     ]
 },
  controltap(){
    this.mapCtx.moveToLocation()
  },
 onShow(){
   wx.getLocation({
     type: 'gcj02',
     altitude: true,
     success: (res)=> {
       
      this.setData({
        longitude: res.longitude,
        latitude: res.latitude
      })
     },
   
   })
   wx.request({
     url: 'http://localhost:3000/list',
     data: '',
     header: {'context-type':'application/json'},
     method: 'GET',
     dataType: 'json',
     responseType: 'text',
     success: (res)=> {
       console.log(res)
       let markers=res.data.map((item)=>{
        return {
          iconPath: "/resources/"+item.type+".png",
          id: item.id,
          latitude:item.latitude,
          longitude:item.longitude,
          width: 30,
          height: 30
        }
      })
      this.setData({
        markers: markers
      })
     }
   
   })
 },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
  },
  onShareAppMessage: function (res) {
   
    return {
      title: '萌宠交易平台',
      path: '/page/index/index'
    }
  },
  go(){
    wx.navigateTo({
      url: '/pages/publish/publish',
     
    })
  },
  search() {
    wx.navigateTo({
      url: '/pages/search/search',

    })
  },
  markertap(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?id='+e.markerId
     
    
    })
  }
})
