// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'点击选择，要勾选哦'
  },
  obj:{
    type:'sell'
  },
  getAddress(){
   wx.chooseLocation({
     success: (res)=> {
       this.setData({
         address:res.address
       })
       Object.assign(this.obj,{
         address:res.address,
         longitude:res.longitude,
         latitude:res.latitude
       })
     },
    
   })
     
  
  },
  radioChange(e){
    this.obj.type=e.detail.value;
   
  },
  describtion(e){
    
    this.obj.descri=e.detail.value;
  },
  telphone(e){
    this.obj.phon=e.detail.value;
    
  },
  save(){
    if (!this.obj.descri || !this.obj.phon){
      wx.showToast({
        title: '请输入信息',
        icon: 'loading',
        image: '',
        duration: 1000,
        mask: true,
       
      })
      return;
    }
    wx.request({
      url: 'http://localhost:3000/list',
      data: this.obj,
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (res)=> {
        this.setData({
          sur:true
        })
      },
     
    })
  },
  go(){
  
    wx.navigateBack({
      delta: 1,
    })
  }
  
 
})