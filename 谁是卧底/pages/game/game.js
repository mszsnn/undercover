// pages/game/game.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     words:[],
     
     setting:{},
     current:0,
     toggle:true,
     zhezhao:true,
     alert:false,
     over:false,
     arr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取数据
    let that=this;
    wx.request({
      url: 'http://192.169.1.149/gamehome/getWord.php', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          'words':res.data.w.split("-")
        })
      }
    })
  //  获取本地存储的数据，拿出存储的人数和卧底数据  
    wx.getStorage({
      key: 'setting',
      success: function(res) {
        let brr = [];
        do {
          var r = Math.floor(Math.random() * res.data.person);
          if (!brr.includes(r)) {
            brr.push(r);
          }
        } while (brr.length < res.data.wodi);

        let arr=[];
        for(var i=0;i<res.data.person;i++){
          if(brr.includes(i)){
            arr.push({ id: i, word: '', position: 0, status:false, src: '' });
          }else{
            arr.push({ id: i, word: '', position: 1, status:false, src: '' });
          } 
        } 
        that.setData({
          setting:res.data,
          arr:arr
        })
        console.log(that.data.arr);
      },
      
    })
  },
  showPai(){
     if(this.data.arr[this.data.current].position){
       this.setData({
         ['arr['+this.data.current+'].word']:this.data.words[0],
       })
     }else{
       this.setData({
         ['arr[' + this.data.current + '].word']: this.data.words[1],
       })
     }
     this.setData({
       toggle:false
     })
     console.log(this.data.arr);
  },
  lookEnd(){
   
    if(this.data.current==this.data.setting.person-1){
      this.setData({
        zhezhao: false
      }) 
    }
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        let a = this.data.current;
        this.setData({
          ['arr[' + this.data.current + '].src']: res.tempImagePath,
        })
        this.setData({
          toggle: true,
          current: this.data.current + 1,
        })
      }
    })
     
  },
  check(e){
    if (!this.data.arr[e.target.id].status){
      this.setData({
        alert: true,
        checkid: Number(e.target.id)
      })
    } 
  },
  no(){
    this.setData({
      alert:false,
    })
  },
  yes(){
  
    this.setData({
      ['arr[' + this.data.checkid + '].status']:true,
      alert: false,
    })

  // 如果是只有2个平民的话,只要含有卧底的话  卧底胜利
  // 若在有至少3个平民的情况下，没有卧底，那么平民胜利
    var wodi=0;
    var pinmin=0;
    this.data.arr.forEach(val=>{
      if(val.position&&!val.status){
         pinmin++;        
      } else if (val.position==0&&!val.status){
         wodi++;
      }
    })

    if(pinmin==2&&wodi>0){
      this.setData({
        win:"卧底胜利",
        over:true,
      })
    }else if(pinmin>2&&wodi==0){
      this.setData({
        win: "平民胜利",
        over: true,
      })
    }
  },
  restart(){
    wx.redirectTo({
      url: '/pages/main/main',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})