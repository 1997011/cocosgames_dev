

import { request } from './request';
const { ccclass, property } = cc._decorator;

@ccclass('AppInit')
export class AppInit extends cc.Component {


    /**
    * 获得用户资源总量，这里返回几，就需要用户自行调用几次nextInit
    */
    protected getUserAssetNum(): number {
        return 1;
    }
    // BaseAppInit中使用start方法作为初始化入口，如果重写start方法，请注意调用父类方法
    // protected start() {  }


  @property(cc.Node)
  ScrollView: cc.Node;//全局滚动视图
  @property(cc.Node)
  frame: cc.Node;//展示
  @property(cc.Node)
  time: cc.Node;//时间组
  @property(cc.Node)
  rewards: cc.Node;//奖励
  @property(cc.Node)
  particleF: cc.Node;//frame的特效
  @property(cc.Node)
  particle: cc.Node;//特效
  @property(cc.Node)
  rules: cc.Node;//rules按钮
  @property(cc.Node)
  giftMultiple: cc.Node;//展示倍数的组件
  @property(cc.Node)
  pop: cc.Node;//弹窗
  @property(cc.Node)
  Camera:cc.Node;//相机
  TroneData = {
    'start_time':1731272400,
    'end_time': 1731445200,
    'gift_id':'lucky_king_crown',
    'lucky_gift_name': 'lucky_king_crown',
    'lucky_gift_img': 'https://file.wepartytime.net/gift/lucky_king_crown.png',
    'reward_1_name': '200000Coins',
    'reward_1_img': 'https://file.wepartytime.net/star_coins4.png',
    'reward_2_name': 'Drive * 7Day',
    'reward_2_img': 'https://file.wepartytime.net/driver/cool_motorcycle.png',
    'reward_3_name': 'Frame * 7Day',
    'reward_3_img': 'https://file.wepartytime.net/frame1/golden_knight.png',

  }
  data = {
    avatar: '',
    multiple: '',
    nickname: '',
    uid: '',
    username: '',
    msg: '',

  }
  Url = 'https://api.gameparty.fun/api/ptu-api/gift/lucky_max_query?anm=ptu'
  timeRemaining = 0;
  F = 1;


    protected onLoad() {

    this.schedule(this.runTime, 1);
    // this.pop.on(Node.EventType.TOUCH_START, this.onTouchStart,this)
    this.setView();
    // this.particleEffect();
    this.scheduleOnce(this.Thisinit);
    // this.nextInit();

    }
    protected start() {
      
    }
  //控制屏幕
  Thisinit() {
    this.getData();
    this.pop.on(cc.Node.EventType.TOUCH_START, this.onTouchStart,this);
    this.particleEffect();
  }
  setView() {
    //设置ScrollView高度
    let screenSize = cc.view.getFrameSize(); // 获取当前屏幕大小 
    var ScrollViewH = this.ScrollView.children[0]
    cc.log(screenSize);
    cc.log(this.ScrollView.position);
    ScrollViewH.height = 720/screenSize.width*screenSize.height;
    cc.log(this.Camera.position.y);
    this.Camera.position = new cc.Vec3(0,800 -720/screenSize.width*screenSize.height/2);
    cc.log(this.Camera.position.y);


    // this.ScrollView.children[0].getComponent(UITransform).width = screenSize.width;// 设置 ScrollView 宽度
    // view.resizeWithBrowserSize(true);
    // view.setResizeCallback(function () {
    // ScrollViewH.getComponent(UITransform).height = screenSize.height;
    // });
    //  console.log(screenSize);
    //  console.log(ScrollViewH.getComponent(UITransform).height);
  }
  //粒子特效
  particleEffect() {
    var targetPosition1 = new cc.Vec3(-400, 0);
    var targetPosition2 = new cc.Vec3(400, 0);

    cc.tween(this.particle)
      .delay(4)
      .to(0, { position: targetPosition1 },)
      .to(1, { position: targetPosition2 },)
      .union()
      .repeatForever()
      .start();

  }

  //倒计时计算和渲染数据
  runTime() {
    //结束时间从服务器获取
    //当前时间戳
    let now = new Date().getTime();

    // console.log(now);
    this.timeRemaining = this.TroneData.end_time - Math.floor(now / 1000);

    var sec = this.time.children[3].children[2].getComponent(cc.Label);
    var min = this.time.children[2].children[2].getComponent(cc.Label);
    var hour = this.time.children[1].children[2].getComponent(cc.Label);
    var day = this.time.children[0].children[2].getComponent(cc.Label);
    if (this.F == 0) {
      if (this.timeRemaining <= 0) {
        //时间归零，停止计时
        this.unschedule(this.runTime);
      } else {
        let sec_num = Math.floor(this.timeRemaining  % 60);
        let min_num = Math.floor((this.timeRemaining  / 60) % 60);
        let hour_num = Math.floor((this.timeRemaining  / 3600) % 24);
        let day_num = Math.floor(this.timeRemaining  / (60 * 60 * 24));
        if (sec_num < 10) {
          sec.string = '0'+String(Math.floor(sec_num))
        }else {
          sec.string = String(Math.floor(sec_num))
        }
        if (sec_num == 59) {
          if (min_num < 10) {
            min.string = '0'+String(Math.floor(min_num))
          }else {
            min.string = String(Math.floor(min_num))
          }
          if (min_num == 59) {
            if (hour_num < 10) {
              hour.string = '0'+String(Math.floor(hour_num))
            }else {
              hour.string = String(Math.floor(hour_num))
            }
            if (hour_num == 23) {
              if (day_num < 10) {
                day.string = '0'+String(Math.floor(day_num))
              }else {
                day.string = String(Math.floor(day_num))
              }
              
            }
          }
        }
      }
    } else {
      if (this.timeRemaining <= 0) {
        //时间归零，停止计时
        this.unschedule(this.runTime);
        
      } else {
        
      
      let sec_num = (this.timeRemaining % 60);
      let min_num = Math.floor((this.timeRemaining  / 60) % 60);
      let hour_num = Math.floor((this.timeRemaining  / 3600) % 24);
      let day_num = Math.floor(this.timeRemaining  / (60 * 60 * 24));
      if (sec_num < 10) {
        sec.string = '0'+String(Math.floor(sec_num))
      }else {
         sec.string = String(Math.floor(sec_num))
      }
        if (min_num < 10) {
          min.string = '0'+String(Math.floor(min_num))
        }else {
          min.string = String(Math.floor(min_num))
        }
        if (hour_num < 10) {
          hour.string = '0'+String(Math.floor(hour_num))
        }else {
          hour.string = String(Math.floor(hour_num))
        }
        if (day_num < 10) {
          day.string = '0'+String(Math.floor(day_num))
        }else{
          day.string = String(Math.floor(day_num))
        }
      }
      this.F = 0;
    }
  }

  async getData() {
    // const uuid = app.manager.ui.showLoading();

    let token = this.getQueryString('token');//获取token
    if(!token){
      token = this.getQueryString('access_token');
    }
    let url = this.Url +'&start_time='+this.TroneData.start_time+'&end_time='+this.TroneData.end_time+'&gift_id='+this.TroneData.gift_id;
    const { error, response } = await request({
      url: url,
      // url: this.Url,
      method: 'GET'
    })
    // app.manager.ui.hideLoading(uuid);
    if (error) {
      console.error('请求失败:', error);
      // app.manager.ui.showToast('Link Timeout！',1);
      //如果加载失败，则重新加载
      // setTimeout(() => {
      //   return this.getData();
      // }, 10000);

    } else {
      // console.log('响应数据:', response);
      this.data = response.data;
      // console.log(this.data);
      this.renderedData();
    }
  }
  protected setSprite(target: cc.Sprite, path: string, onComplete?: (success: boolean) => any): void {
    cc.loader.load({ url: path, type: 'jpg' }, (err, texture) => {
        if (err) {
            console.error('Failed to load image:', err);
            if (onComplete) {
                onComplete(false);
            }
            return;
        }

        const spriteFrame = new cc.SpriteFrame(texture);
        target.spriteFrame = spriteFrame;

        if (onComplete) {
            onComplete(true);
        }
    });
}

  renderedData() {
    // 渲染数据
    // 替换为你的图片URL
    let remoteUrl = this.data.avatar;

    if (this.frame) {
      let sprite = this.frame.children[0].children[0].getComponent(cc.Sprite);
      let name = this.frame.getChildByName('name').getComponent(cc.Label);
      this.setSprite(sprite, remoteUrl);
      name.string = this.data.nickname;
    }
    if (this.giftMultiple) {
      this.giftMultiple.children[2].getComponent(cc.Label).string = '×'+this.data.multiple+'عصر';

      let sprite = this.giftMultiple.children[1].children[0].getComponent(cc.Sprite)
      this.setSprite(sprite, this.TroneData.lucky_gift_img);
    } else {
      console.log('没有找到节点');
    }
    let rewards1Sp = this.rewards.children[1].children[0].children[0].getComponent(cc.Sprite);
    let rewards2Sp = this.rewards.children[2].children[0].children[0].getComponent(cc.Sprite);
    let rewards3Sp = this.rewards.children[3].children[0].children[0].getComponent(cc.Sprite);
    let rewards1Label = this.rewards.children[1].children[1].getComponent(cc.Label);
    let rewards2Label = this.rewards.children[2].children[1].getComponent(cc.Label);
    let rewards3Label = this.rewards.children[3].children[1].getComponent(cc.Label);
    this.setSprite(rewards1Sp, this.TroneData.reward_1_img);
    this.setSprite(rewards2Sp, this.TroneData.reward_2_img);
    this.setSprite(rewards3Sp, this.TroneData.reward_3_img);
    rewards1Label.string = this.TroneData.reward_1_name;
    rewards2Label.string = this.TroneData.reward_2_name;
    rewards3Label.string = this.TroneData.reward_3_name;
  }



  //例子:弹窗按钮调用
  onClick() {
    this.rules.active = !this.rules.active;
  }
  exit() {
    this.closePopupPage();
  }
    protected onFinish() {
        // 执行完成操作
        // this.node.active = false;
        // this.node.destroy();
    }
    //获取数据
getQueryString(name, url) {
  var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
  url=url || location.href
  var result = url.substring(1).match(reg);
  if (result != null) return decodeURI(result[2]);
  return null;
}  

getPlatform(){ 
try{
  if (/iPhone|iPod/i.test(navigator.userAgent)) {
    return 'ios';
  }
  else if (/Android/i.test(navigator.userAgent)) {
    return 'android';
  }
}catch(e){} 
}
// 充值页面
//关闭弹窗
closePopupPage(){
  var platform = this.getPlatform();
  if(platform == 'ios'){  
      window.webkit.messageHandlers.quit.postMessage({});     
  }else if (platform == 'android'){  
      window.NativeBridge.quit();  
  }  
}
onTouchStart(event) {
  // 阻止事件冒泡传递
  event.propagationStopped = true;
  console.log("触摸事件已经被阻止冒泡");
}
}