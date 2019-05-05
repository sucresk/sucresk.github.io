var __reflect=this&&this.__reflect||function(t,e,o){t.__class__=e,o?o.push(e):o=[e],t.__types__=t.__types__?o.concat(t.__types__):o},__extends=this&&this.__extends||function(t,e){function o(){this.constructor=t}for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);o.prototype=e.prototype,t.prototype=new o},__awaiter=this&&this.__awaiter||function(t,e,o,i){return new(o||(o=Promise))(function(n,r){function a(t){try{l(i.next(t))}catch(e){r(e)}}function s(t){try{l(i["throw"](t))}catch(e){r(e)}}function l(t){t.done?n(t.value):new o(function(e){e(t.value)}).then(a,s)}l((i=i.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function o(t){return function(e){return i([t,e])}}function i(o){if(n)throw new TypeError("Generator is already executing.");for(;l;)try{if(n=1,r&&(a=r[2&o[0]?"return":o[0]?"throw":"next"])&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[0,a.value]),o[0]){case 0:case 1:a=o;break;case 4:return l.label++,{value:o[1],done:!1};case 5:l.label++,r=o[1],o=[0];continue;case 7:o=l.ops.pop(),l.trys.pop();continue;default:if(a=l.trys,!(a=a.length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){l=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){l.label=o[1];break}if(6===o[0]&&l.label<a[1]){l.label=a[1],a=o;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(o);break}a[2]&&l.ops.pop(),l.trys.pop();continue}o=e.call(t,l)}catch(i){o=[6,i],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}var n,r,a,s,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),"throw":o(1),"return":o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},BaseObject=function(t){function e(){var e=t.call(this)||this;return e.initBase(),e}return __extends(e,t),e.prototype.initBase=function(){this.positionX=0,this.positionY=0},e.prototype.refreshStagePosition=function(){this.x=this.positionX-PlayerManager.inst.player.positionX+PlayerManager.inst.player.playerObject.x,this.y=this.positionY-PlayerManager.inst.player.positionY+PlayerManager.inst.player.playerObject.y},e.prototype.updateFrame=function(){this.refreshStagePosition()},e}(egret.Sprite);__reflect(BaseObject.prototype,"BaseObject");var PageBase=function(){function t(t,e){this._view=fairygui.UIPackage.createObject(t,e).asCom}return t.prototype.show=function(){this._view&&(this.isShow=!0,fairygui.GRoot.inst.addChild(this._view),this._view.visible=!0)},t.prototype.hide=function(){this._view&&(this.isShow=!1,this._view.visible=!1)},t}();__reflect(PageBase.prototype,"PageBase");var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var AssetManager=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e._gameAssetMap={},e}return __extends(e,t),Object.defineProperty(e,"instance",{get:function(){return null==e._instance&&(e._instance=new e),e._instance},enumerable:!0,configurable:!0}),e.prototype.getBitmap=function(t,e,o){void 0===e&&(e=!0),void 0===o&&(o=!0);var i=new egret.Bitmap,n=RES.getRes(t);return i.texture=n,e&&(i.anchorOffsetX=i.width/2),o&&(i.anchorOffsetY=i.height/2),i},e.prototype.getSound=function(t){return RES.getRes(t)},e.prototype.loadDBAnimation=function(t){var o,i,n,r;for(o=0,i=t.length;i>o;o+=2){n=t[o],r=parseInt(t[o+1]);var a=RES.getRes(n+"_ske_json");if(a&&e.dbFactory.parseDragonBonesData(a),1==r){console.log("naaa",n);var s=RES.getRes(n+"_tex_json"),l=RES.getRes(n+"_tex_png");e.dbFactory.parseTextureAtlasData(s,l)}else{var h=void 0;for(h=0;r>h;h++){var s=RES.getRes(n+"_tex_"+h+"_json"),l=RES.getRes(n+"_tex_"+h+"_png");e.dbFactory.parseTextureAtlasData(s,l)}}}},e.prototype.disposeDBAnimation=function(t){var o,i,n;for(o=0,i=t.length;i>o;o+=2){n=t[o];var r=RES.getRes(n+"_ske_json"),a=r.name;e.dbFactory.removeDragonBonesData(a),e.dbFactory.removeTextureAtlasData(a)}},e.prototype.getArmatureDisplay=function(t,o){void 0===o&&(o=!0);var i=e.dbFactory.buildArmature(t);return i.display},e.prototype.getDBArmature=function(t,o){void 0===o&&(o=!0);var i=e.dbFactory.buildArmature(t),n=new DBArmature(i,o);return n},e.prototype.changeTexture=function(t,e){var o=t.width,i=t.height;t.texture=RES.getRes(e),t.width=o,t.height=i},e.prototype.setText=function(t,e){t.text=e,t.anchorOffsetX=t.width/2,t.anchorOffsetY=t.height/2},e.prototype.loadGameAsset=function(t){this._gameAssetMap[t]?this.dispatchEventWith(e.EVENT_LOAD_COMPLETE):(this._curLoadingGroup=t,RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this),RES.loadConfig("resource/"+t+".res.json","resource/"))},e.prototype.disposeGameAsset=function(t){var e=RES.getRes(t+"DBConfig_json");this.disposeDBAnimation(e.db),RES.destroyRes(t),this._gameAssetMap[t]=!1,delete this._gameAssetMap[t]},e.prototype.onConfigComplete=function(t){RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this),RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this),RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this),RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this),RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this),RES.loadGroup(this._curLoadingGroup)},e.prototype.onResourceLoadComplete=function(t){if(t.groupName==this._curLoadingGroup){RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this),RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this),RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this),RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);var o=RES.getRes(this._curLoadingGroup+"DBConfig_json");o&&this.loadDBAnimation(o.db),this._gameAssetMap[this._curLoadingGroup]=!0,this._curLoadingGroup=null,this.dispatchEventWith(e.EVENT_LOAD_COMPLETE)}},e.prototype.onResourceLoadError=function(t){console.warn("Group:"+t.groupName+" has failed to load"),this.dispatchEventWith(e.EVENT_LOAD_ERROR)},e.prototype.onItemLoadError=function(t){console.warn("Url:"+t.resItem.url+" has failed to load"),this.dispatchEventWith(e.EVENT_LOAD_ERROR)},e.prototype.onResourceProgress=function(t){if(t.groupName==this._curLoadingGroup){var o=t.itemsLoaded/t.itemsTotal;this.dispatchEventWith(e.EVENT_LOAD_ERROR,!1,o)}},e.EVENT_LOAD_COMPLETE="EVENT_LOAD_COMPLETE",e.EVENT_LOAD_PROGRESS="EVENT_LOAD_PROGRESS",e.EVENT_LOAD_ERROR="EVENT_LOAD_ERROR",e.dbFactory=new dragonBones.EgretFactory,e}(egret.EventDispatcher);__reflect(AssetManager.prototype,"AssetManager");var GameSetting=function(){function t(){}return t.stageWidth=1136,t.stageHeight=640,t.playerCenterX=t.stageWidth/2,t.playerCenterY=t.stageHeight/2,t}();__reflect(GameSetting.prototype,"GameSetting");var LayerManager=function(){function t(){}return t.init=function(e){t.root=e,t.map=new egret.Sprite,t.roles=new egret.Sprite,t.player=new egret.Sprite,t.base=new egret.Sprite,t.mainUI=new egret.Sprite,t.ui=new egret.Sprite,t.bgLayer=new egret.DisplayObjectContainer,t.root.addChild(t.bgLayer),t.root.addChild(t.map),t.root.addChild(t.roles),t.root.addChild(t.player),t.root.addChild(t.ui),t.root.addChild(t.base),t.root.addChild(t.mainUI),t.ui.addChild(fairygui.GRoot.inst.displayObject)},t}();__reflect(LayerManager.prototype,"LayerManager");var Root=function(){function t(){}return t}();__reflect(Root.prototype,"Root");var GameModel=function(){function t(){}return t.init=function(){this.player=new ModelPlayer,this.roles=new ModelRoles},t}();__reflect(GameModel.prototype,"GameModel");var ModelPlayer=function(t){function e(){var e=t.call(this)||this;return e.init(),e}return __extends(e,t),e.prototype.init=function(){this.myPlayer=new PlayerVo,this.myPlayer.setPosition(0,0)},e}(egret.EventDispatcher);__reflect(ModelPlayer.prototype,"ModelPlayer");var ModelPlayerEvent=function(){function t(){}return t.ON_ADD_PLAYER="ON_ADD_PLAYER",t.ON_REMOVE_PLAYER="ON_REMOVE_PLAYER",t.ON_CHANGE_PLAYER_POS="ON_CHANGE_PLAYER_POS",t}();__reflect(ModelPlayerEvent.prototype,"ModelPlayerEvent");var PlayerVo=function(){function t(){}return Object.defineProperty(t.prototype,"isAlive",{get:function(){return this._isAlive},set:function(t){1==t&&(this.oxygen=100,this.points=0),this._isAlive=t},enumerable:!0,configurable:!0}),t.prototype.setPosition=function(t,e){this.positionX=t,this.positionY=e},t.prototype.reset=function(){this.positionX=0,this.positionY=0},t}();__reflect(PlayerVo.prototype,"PlayerVo");var ModelRoles=function(t){function e(){var e=t.call(this)||this;return e.rolesList=new Array,e}return __extends(e,t),e.prototype.addRole=function(t){this.rolesList.push(t),this.dispatchEventWith(ModelRolesEvent.ON_ADD_ROLE,!1,t)},e.prototype.removeRole=function(t){this.rolesList.splice(this.rolesList.indexOf(t)),this.dispatchEventWith(ModelRolesEvent.ON_REMOVE_ROLE,!1,t)},e.prototype.changeRolePos=function(t,e,o){t.setPosition(e,o),this.dispatchEventWith(ModelRolesEvent.ON_CHANGE_ROLE_POS,!1,t)},e}(egret.EventDispatcher);__reflect(ModelRoles.prototype,"ModelRoles");var ModelRolesEvent=function(){function t(){}return t.ON_ADD_ROLE="ON_ADD_ROLE",t.ON_REMOVE_ROLE="ON_REMOVE_ROLE",t.ON_CHANGE_ROLE_POS="ON_CHANGE_ROLE_POS",t}();__reflect(ModelRolesEvent.prototype,"ModelRolesEvent");var RoleType=function(){function t(){this.BALL=1,this.STONE=2,this.SCORE=3}return t}();__reflect(RoleType.prototype,"RoleType");var RoleVo=function(){function t(){}return t.prototype.setPosition=function(t,e){this.positionX=t,this.positionY=e},Object.defineProperty(t.prototype,"isBall",{get:function(){return 1==this.roleType},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isScore",{get:function(){return 3==this.roleType},enumerable:!0,configurable:!0}),t.prototype.reset=function(){},t}();__reflect(RoleVo.prototype,"RoleVo");var GameModule=function(){function t(){}return t.init=function(){t.scene=new ModuleScene,t.role=new ModuleRole,t.mainUI=new ModuleMainUI,t.pageInfo=new PageInfo,t.joystick=new Joystick,t.pageTeam=new PageTeam,t.asset=AssetManager.instance},t.gameStart=function(){t.role.onShow(),t.scene.onShow(),t.mainUI.onShow()},t.showTitle=function(){t.pageInfo.show()},t.showTeam=function(){t.pageTeam.show()},t}();__reflect(GameModule.prototype,"GameModule");var ModuleMainUI=function(){function t(){this.mainUI=fairygui.UIPackage.createObject("Package1","MainUI").asCom,this.lblScore=this.mainUI.getChild("lblScore").asTextField,this.lblPos=this.mainUI.getChild("lblPos").asTextField,this.btnRestart=this.mainUI.getChild("btnRestart").asButton,this.hpBar=this.mainUI.getChild("hpBar").asProgress,this.btnRestart.addClickListener(this.onRestart,this),this.btnRestart.visible=!1,this.btnLeft=this.mainUI.getChild("btnLeft").asButton,this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtnLeftDown,this),this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtnLeftUp,this),this.btnRight=this.mainUI.getChild("btnRight").asButton,this.btnRight.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtnRightDown,this),this.btnRight.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtnRightUp,this),this.btnSpeed=this.mainUI.getChild("btnSpeed").asButton,this.btnSpeed.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBtnSpeedDown,this),this.btnSpeed.addEventListener(egret.TouchEvent.TOUCH_END,this.onBtnSpeedUp,this),this.showProgress(80),this.showPoint(0)}return t.prototype.onBtnLeftDown=function(){PlayerInput.leftDown=!0,PlayerInput.rightDown=!1,console.log("leftDownbtn",PlayerInput.leftDown)},t.prototype.onBtnLeftUp=function(){PlayerInput.leftDown=!1,PlayerInput.rightDown=!1},t.prototype.onBtnRightDown=function(){PlayerInput.rightDown=!0,PlayerInput.leftDown=!1},t.prototype.onBtnRightUp=function(){PlayerInput.rightDown=!1,PlayerInput.leftDown=!1},t.prototype.onBtnSpeedDown=function(){PlayerInput.speedDonw=!0},t.prototype.onBtnSpeedUp=function(){PlayerInput.speedDonw=!1},t.prototype.onRestart=function(){var t=this;GameModule.scene.resetScene(),this.btnRestart.visible=!1,PlayerManager.inst.player.playerVo.oxygen=80,egret.setTimeout(function(){PlayerManager.inst.player.playerVo.isAlive=!0,PlayerManager.inst.player.playerVo.points=0,t.showPoint(0)},this,3e3)},t.prototype.showProgress=function(t){this.hpBar.value=t},t.prototype.showPoint=function(t){this.lblScore.text=t.toString()},t.prototype.onShow=function(){LayerManager.mainUI.addChild(this.mainUI.displayObject),GameModel.player.addEventListener(ModelPlayerEvent.ON_CHANGE_PLAYER_POS,this.onChangePos,this)},t.prototype.onChangePos=function(){this.lblPos.text=Math.ceil(PlayerManager.inst.player.positionX).toString()+"  "+Math.ceil(PlayerManager.inst.player.positionY).toString()},t.prototype.onExit=function(){LayerManager.mainUI.removeChild(this.mainUI.displayObject),GameModel.player.removeEventListener(ModelPlayerEvent.ON_CHANGE_PLAYER_POS,this.onChangePos,this)},t}();__reflect(ModuleMainUI.prototype,"ModuleMainUI");var Main=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(egret.Event.ADDED_TO_STAGE,e.onAddToStage,e),e}return __extends(e,t),e.prototype.onAddToStage=function(t){this.runGame()},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.initGame(),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(o){switch(o.label){case 0:return o.trys.push([0,3,,4]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return o.sent(),[4,RES.loadGroup("preload",0,t)];case 2:return o.sent(),this.stage.removeChild(t),[3,4];case 3:return e=o.sent(),console.error(e),[3,4];case 4:return[2]}})})},e.prototype.initGame=function(){this.stage.orientation=egret.OrientationMode.LANDSCAPE,fairygui.UIPackage.addPackage("Package1_fui"),fairygui.UIPackage.addPackage("joystick_fui");var t=RES.getRes("dbConfig_json");t&&AssetManager.instance.loadDBAnimation(t.db),Root.root=this,LayerManager.init(this),GameModel.init(),GameModule.init(),this.showGame()},e.prototype.showGame=function(){GameModule.showTitle()},e.prototype.exitGame=function(){GameModule.role.onExit(),GameModule.scene.onExit()},e.prototype.createGameScene=function(){console.log("create");var t=this.createBitmapByName("bg_jpg");this.addChild(t);var e=this.stage.stageWidth,o=this.stage.stageHeight;t.width=e,t.height=o;var i=new egret.Shape;i.graphics.beginFill(0,.5),i.graphics.drawRect(0,0,e,172),i.graphics.endFill(),i.y=33,this.addChild(i);var n=this.createBitmapByName("egret_icon_png");this.addChild(n),n.x=26,n.y=33;var r=new egret.Shape;r.graphics.lineStyle(2,16777215),r.graphics.moveTo(0,0),r.graphics.lineTo(0,117),r.graphics.endFill(),r.x=172,r.y=61,this.addChild(r);var a=new egret.TextField;a.textColor=16777215,a.width=e-172,a.textAlign="center",a.text="Hello Egret",a.size=24,a.x=172,a.y=80,this.addChild(a);var s=new egret.TextField;this.addChild(s),s.alpha=0,s.width=e-172,s.textAlign=egret.HorizontalAlign.CENTER,s.size=24,s.textColor=16777215,s.x=172,s.y=135,this.textfield=s},e.prototype.createBitmapByName=function(t){var e=new egret.Bitmap,o=RES.getRes(t);return e.texture=o,e},e.prototype.startAnimation=function(t){var e=this,o=new egret.HtmlTextParser,i=t.map(function(t){return o.parse(t)}),n=this.textfield,r=-1,a=function(){r++,r>=i.length&&(r=0);var t=i[r];n.textFlow=t;var o=egret.Tween.get(n);o.to({alpha:1},200),o.wait(2e3),o.to({alpha:0},200),o.call(a,e)};a()},e}(egret.DisplayObjectContainer);__reflect(Main.prototype,"Main");var DBArmature=function(t){function e(e,o){var i=t.call(this)||this;return i._playCallbackMap={},i.armature=e,i.armatureDisplay=e.display,i.addChild(i.armatureDisplay),o&&(i.addToClock(dragonBones.EgretFactory.factory.clock),i.autoClock=o),i}return __extends(e,t),e.prototype.addToClock=function(t){null!=this.curClock&&this.curClock.remove(this.armature),this.curClock=t,this.curClock&&this.curClock.add(this.armature),this.autoClock=!1},e.prototype.gotoAndStop=function(t,e){void 0===e&&(e=0),this.armature.animation.gotoAndStopByFrame(t,e)},e.prototype.play=function(t,e){void 0===e&&(e=0),this.curAnimationState=this.armature.animation.play(t,e)},e.prototype.stop=function(){this.armature.animation.stop()},e.prototype.replaceSlot=function(t,e){var o=this.armature.getSlot(t);o&&(o.display=e)},e.prototype.playOnce=function(t,e){void 0===e&&(e=null),this._playCallbackMap[t]=e,this.armatureDisplay.addEvent(dragonBones.AnimationEvent.LOOP_COMPLETE,this.onOnceComplete,this),this.play(t,1)},e.prototype.onOnceComplete=function(t){this.armatureDisplay.removeEvent(dragonBones.AnimationEvent.LOOP_COMPLETE,this.onOnceComplete,this);var e=this.armatureDisplay.animation.lastAnimationName;this._playCallbackMap[e]&&(this._playCallbackMap[e](),this._playCallbackMap[e]=null)},e.prototype.dispose=function(){},e}(egret.DisplayObjectContainer);__reflect(DBArmature.prototype,"DBArmature");var HomeSpace=function(t){function e(){var e=t.call(this)||this;return e.playSpeed=.01,e.player=AssetManager.instance.getDBArmature("homeSpace"),e.player&&(e.player.scaleX=e.player.scaleY=.8,e.player.play("level1"),e.player.curAnimationState.timeScale=e.playSpeed,e.addChild(e.player)),e}return __extends(e,t),e.prototype.change2Level=function(t){1>t&&(t=1),t>7&&(t=7);var e="level"+t;this.player.play(e),this.player.curAnimationState.timeScale=this.playSpeed},e.prototype.broken=function(){this.player.play("broken"),this.player.curAnimationState.timeScale=this.playSpeed},e.prototype.normal=function(){this.player.play("level1"),this.player.curAnimationState.timeScale=this.playSpeed},e}(BaseObject);__reflect(HomeSpace.prototype,"HomeSpace");var ModuleRole=function(){function t(){this.objectMapViews=new egret.Sprite,this.objectDict=new Object}return t.prototype.onShow=function(){LayerManager.roles.addChild(this.objectMapViews),this.addEventListeners()},t.prototype.addEventListeners=function(){GameModel.roles.addEventListener(ModelRolesEvent.ON_ADD_ROLE,this.onAddRole,this),GameModel.roles.addEventListener(ModelRolesEvent.ON_REMOVE_ROLE,this.onRemoveRole,this),GameModel.roles.addEventListener(ModelRolesEvent.ON_CHANGE_ROLE_POS,this.onChangeRolePos,this),GameModel.player.addEventListener(ModelPlayerEvent.ON_CHANGE_PLAYER_POS,this.onChangePlayerPos,this)},t.prototype.onExit=function(){LayerManager.roles.removeChild(this.objectMapViews),this.removeEventListeners()},t.prototype.removeEventListeners=function(){GameModel.roles.removeEventListener(ModelRolesEvent.ON_ADD_ROLE,this.onAddRole,this),GameModel.roles.removeEventListener(ModelRolesEvent.ON_REMOVE_ROLE,this.onRemoveRole,this),GameModel.roles.removeEventListener(ModelRolesEvent.ON_CHANGE_ROLE_POS,this.onChangeRolePos,this),GameModel.player.removeEventListener(ModelPlayerEvent.ON_CHANGE_PLAYER_POS,this.onChangePlayerPos,this)},t.prototype.onAddRole=function(t){var e=t.data,o=new RoleObject(e.positionX,e.positionY);e.spriteID=o.spriteID,1==e.roleType?o.drawStone():3==e.roleType?o.drawScore():o.drawStone();var i=new Role;i.roleVo=e,i.roleObject=o,RoleManager.inst.addRole(i),this.objectMapViews.addChild(o),this.objectDict[o.spriteID]=o},t.prototype.onRemoveRole=function(t){var e=t.data,o=this.objectDict[e.spriteID];RoleManager.inst.removeRole(RoleManager.inst.roleDict[o.spriteID]),this.objectMapViews.removeChild(o)},t.prototype.onChangeRolePos=function(t){var e=t.data,o=this.objectDict[o.spriteID];o.changePosition(e.positionX,e.positionY)},t.prototype.onChangePlayerPos=function(t){},t.prototype.reset=function(){this.objectMapViews.removeChildren()},t}();__reflect(ModuleRole.prototype,"ModuleRole");var Role=function(){function t(){}return Object.defineProperty(t.prototype,"spriteID",{get:function(){return this.roleObject.spriteID},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"positionX",{get:function(){return this.roleObject.positionX},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"positionY",{get:function(){return this.roleObject.positionY},enumerable:!0,configurable:!0}),t.prototype.updateFrame=function(){this.roleObject.updateFrame()},t.prototype.testHit=function(){},t.prototype.hiting=function(){},t.prototype.reset=function(){this.roleVo.reset(),this.roleObject.reset()},t}();__reflect(Role.prototype,"Role");var RoleManager=function(){function t(){this.roleDict=new Object}return Object.defineProperty(t,"inst",{get:function(){return t.manager||(t.manager=new t),t.manager},enumerable:!0,configurable:!0}),t.prototype.addRole=function(t){this.roleDict[t.spriteID]=t},t.prototype.removeRole=function(t){delete this.roleDict[t.spriteID]},t.prototype.updateFrame=function(){var t;for(var e in this.roleDict)t=this.roleDict[e],t.updateFrame()},t.prototype.reset=function(){var t;for(var e in this.roleDict)t=this.roleDict[e],t.reset();for(var e in this.roleDict)delete this.roleDict[e]},t}();__reflect(RoleManager.prototype,"RoleManager");var RoleObject=function(t){function e(e,o){var i=t.call(this)||this;return i.init(e,o),i}return __extends(e,t),e.prototype.drawStone=function(){var t=Math.ceil(19*Math.random());this._data=new egret.Bitmap(RES.getRes("img_stone_"+t.toString()+"_png")),this._data.width=150,this._data.height=150,this._data.x=-75,this._data.y=-75,this.addChild(this._data)},e.prototype.drawScore=function(){Math.random()<.5?(1==this.scoreType,this._data=new egret.Bitmap(RES.getRes("img_score_png")),this._data.width=50,this._data.height=50,this._data.x=-25,this._data.y=-25,this.addChild(this._data)):(2==this.scoreType,this._data=new egret.Bitmap(RES.getRes("img_oxy_png")),this._data.width=50,this._data.height=50,this._data.x=-25,this._data.y=-25,this.addChild(this._data))},e.prototype.init=function(t,o){this.positionX=t,this.positionY=o,this.refreshStagePosition(),this.spriteID=e.spritePlus,e.spritePlus++,this.setDirection(-90),this._speed=0},e.prototype.setDirection=function(t){this.rotation=t},e.prototype.moving=function(){var t=this._speed,e=this.rotation-90,o=t*Math.cos(e/180*Math.PI),i=t*Math.sin(e/180*Math.PI);this.positionX+=o,this.positionY+=i},e.prototype.refreshStagePosition=function(){this.x=this.positionX-PlayerManager.inst.player.positionX+PlayerManager.inst.player.playerObject.x,this.y=this.positionY-PlayerManager.inst.player.positionY+PlayerManager.inst.player.playerObject.y},e.prototype.changePosition=function(t,e){this.positionX=t,this.positionY=e,this.refreshStagePosition()},e.prototype.updateFrame=function(){this.moving(),this.refreshStagePosition()},e.prototype.reset=function(){},e.spritePlus=0,e}(egret.Sprite);__reflect(RoleObject.prototype,"RoleObject");var Joystick=function(t){function e(){var e=t.call(this,"Joystick","Main")||this;return e._view&&(e._text=e._view.getChild("n4").asTextField,e._joystick=new JoystickModule(e._view),e._joystick.addEventListener(JoystickModule.JoystickMoving,e.onJoystickMoving,e),e._joystick.addEventListener(JoystickModule.JoystickUp,e.onJoystickUp,e)),LayerManager.root&&LayerManager.root.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,e.onTouch,e),e._view.visible=!1,e}return __extends(e,t),e.prototype.onTouch=function(t){if(this.isShow){var e=LayerManager.root.stage.stageWidth/2;t.stageX>e&&console.log("点击了加速按钮")}},e.prototype.onJoystickMoving=function(t){if(this.isShow){this._text.text=""+t.data;var e=t.data;e>-45&&45>e?console.log("left"):e>45&&135>e?console.log("down"):e>135&&180>e||e>-180&&-135>e?console.log("right"):console.log("up"),console.log("角度",e+90),this.updatePlayerInput(e+90)}},e.prototype.onJoystickUp=function(t){this.isShow&&(this._text.text="")},e.prototype.updatePlayerInput=function(t){PlayerManager.inst.player.playerObject.rotation=t},e.prototype.resetPlayerInput=function(){PlayerInput.leftDown=!1,PlayerInput.rightDown=!1},e}(PageBase);__reflect(Joystick.prototype,"Joystick");var JoystickModule=function(t){function e(e){var o=t.call(this)||this;return o._button=e.getChild("joystick").asButton,o._button.changeStateOnClick=!1,o._thumb=o._button.getChild("thumb"),o._touchArea=e.getChild("joystick_touch"),o._center=e.getChild("joystick_center"),o._InitX=o._center.x+o._center.width/2,o._InitY=o._center.y+o._center.height/2,o.touchId=-1,o.radius=150,o._curPos=new egret.Point,o._touchArea.addEventListener(egret.TouchEvent.TOUCH_BEGIN,o.onTouchDown,o),o}return __extends(e,t),e.prototype.Trigger=function(t){this.onTouchDown(t)},e.prototype.onTouchDown=function(t){if(-1==this.touchId){this.touchId=t.touchPointID,null!=this._tweener&&(this._tweener.setPaused(!0),this._tweener=null),fairygui.GRoot.inst.globalToLocal(t.stageX,t.stageY,this._curPos);var e=this._curPos.x,o=this._curPos.y;this._button.selected=!0,0>e?e=0:e>this._touchArea.width&&(e=this._touchArea.width),o>fairygui.GRoot.inst.height?o=fairygui.GRoot.inst.height:o<this._touchArea.y&&(o=this._touchArea.y),this._lastStageX=e,this._lastStageY=o,this._startStageX=e,this._startStageY=o,this._center.visible=!0,this._center.x=e-this._center.width/2,this._center.y=o-this._center.height/2,this._button.x=e-this._button.width/2,this._button.y=o-this._button.height/2;var i=e-this._InitX,n=o-this._InitY,r=180*Math.atan2(n,i)/Math.PI;this._thumb.rotation=r+90,fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.OnTouchMove,this),fairygui.GRoot.inst.nativeStage.addEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchUp,this)}},e.prototype.OnTouchUp=function(t){-1!=this.touchId&&t.touchPointID==this.touchId&&(this.touchId=-1,this._thumb.rotation=this._thumb.rotation+180,this._center.visible=!1,this._tweener=egret.Tween.get(this._button).to({x:this._InitX-this._button.width/2,y:this._InitY-this._button.height/2},300,egret.Ease.circOut).call(function(){this._tweener=null,this._button.selected=!1,this._thumb.rotation=0,this._center.visible=!0,this._center.x=this._InitX-this._center.width/2,this._center.y=this._InitY-this._center.height/2},this),fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.OnTouchMove,this),fairygui.GRoot.inst.nativeStage.removeEventListener(egret.TouchEvent.TOUCH_END,this.OnTouchUp,this),this.dispatchEventWith(e.JoystickUp,!1))},e.prototype.OnTouchMove=function(t){if(-1!=this.touchId&&t.touchPointID==this.touchId){var o=t.stageX/fairygui.GRoot.contentScaleFactor,i=t.stageY/fairygui.GRoot.contentScaleFactor,n=o-this._lastStageX,r=i-this._lastStageY;this._lastStageX=o,this._lastStageY=i;var a=this._button.x+n,s=this._button.y+r,l=a+this._button.width/2-this._startStageX,h=s+this._button.height/2-this._startStageY,p=Math.atan2(h,l),c=180*p/Math.PI;this._thumb.rotation=c+90;var u=this.radius*Math.cos(p),y=this.radius*Math.sin(p);Math.abs(l)>Math.abs(u)&&(l=u),Math.abs(h)>Math.abs(y)&&(h=y),a=this._startStageX+l,s=this._startStageY+h,0>a&&(a=0),s>fairygui.GRoot.inst.height&&(s=fairygui.GRoot.inst.height),this._button.x=a-this._button.width/2,this._button.y=s-this._button.height/2,this.dispatchEventWith(e.JoystickMoving,!1,c)}},e.JoystickMoving="JoystickMoving",e.JoystickUp="JoystickUp",e}(egret.EventDispatcher);__reflect(JoystickModule.prototype,"JoystickModule");var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var PageInfo=function(t){function e(){var e=t.call(this,"Package1","PageInfo")||this;return e._view&&(e.btnStart=e._view.getChild("n1"),e.btnTeam=e._view.getChild("n3"),e.btnStart&&e.btnStart.addClickListener(e.onClickStart,e),e.btnTeam&&e.btnTeam.addClickListener(e.onClickTeam,e)),e}return __extends(e,t),e.prototype.onClickStart=function(t){this.hide(),GameModule.gameStart()},e.prototype.onClickTeam=function(t){this.hide(),GameModule.showTeam()},e}(PageBase);__reflect(PageInfo.prototype,"PageInfo");var PageTeam=function(t){function e(){var e=t.call(this,"Package1","PageTeam")||this;e._view&&(e.btnReturn=e._view.getChild("btnReturn"),e.btnReturn&&e.btnReturn.addClickListener(e.onClick,e)),e.shape=e._view.getChild("shape").asGraph;var o=new egret.Bitmap(RES.getRes("img_team_png"));return o.width=1136,o.height=640,e.shape.setNativeObject(o),e}return __extends(e,t),e.prototype.onClick=function(t){this.hide(),GameModule.showTitle()},e}(PageBase);__reflect(PageTeam.prototype,"PageTeam");var ModuleScene=function(t){function e(){var e=t.call(this)||this;return e.timer=new egret.Timer(1e3,Number.MAX_VALUE),e.createBg(),e.createPlayer(),e.createBase(),e}return __extends(e,t),e.prototype.onShow=function(){var t=new egret.Bitmap(RES.getRes("img_bg_png"));LayerManager.map.addChild(t),LayerManager.player.addChild(PlayerManager.inst.player.playerObject),LayerManager.base.addChild(this.baseObject),GameModel.player.addEventListener(ModelPlayerEvent.ON_CHANGE_PLAYER_POS,this.onChangePLayer,this),Root.root.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this),this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimeFunc,this),this.timer.start(),this.createBalls(50)},e.prototype.createBg=function(){null==this.bg&&(this.bg=AssetManager.instance.getBitmap("bg2_jpg",!0,!0)),LayerManager.bgLayer.addChild(this.bg)},e.prototype.createPlayer=function(){var t=GameModel.player.myPlayer,e=new PlayerObject(t.positionX,t.positionY),o=new Player;o.playerObject=e,o.playerVo=t,t.isAlive=!0,PlayerManager.inst.setPlayer(o)},e.prototype.createBalls=function(t){for(var e,o,i=3e3,n=3e3,r=0;t>r;r++)if(e=Math.random()*i-i/2,o=Math.random()*n-n/2,Math.abs(PlayerManager.inst.player.positionX-e)>200&&Math.abs(PlayerManager.inst.player.positionY-o)>200){var a=new RoleVo;a.roleType=1,a.setPosition(e,o),GameModel.roles.addRole(a),this.createScore(a)}},e.prototype.createScore=function(t){var e=new RoleVo;e.roleType=3;var o=t.positionX+50+100*Math.random(),i=t.positionY+50+100*Math.random();e.setPosition(o,i),GameModel.roles.addRole(e)},e.prototype.createBase=function(){this.baseObject=new HomeSpace},e.prototype.onChangePLayer=function(){PlayerManager.inst.player.playerObject.changePosition(PlayerManager.inst.player.playerVo.positionX,PlayerManager.inst.player.playerVo.positionY)},e.prototype.onExit=function(){LayerManager.player.removeChild(PlayerManager.inst.player.playerObject),LayerManager.map.removeChildren(),LayerManager.base.removeChild(this.baseObject),GameModel.player.removeEventListener(ModelPlayerEvent.ON_CHANGE_PLAYER_POS,this.onChangePLayer,this),Root.root.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this),egret.clearTimeout(this.idTimeout),this.timer.stop()},e.prototype.onTimeFunc=function(){GameModule.mainUI.onChangePos(),PlayerManager.inst.player.playerVo.isAlive&&(PlayerManager.inst.player.playerVo.oxygen-=2,GameModule.mainUI.showProgress(PlayerManager.inst.player.playerVo.oxygen)),PlayerManager.inst.player.playerVo.oxygen<=0&&PlayerManager.inst.player.killPlayer()},e.prototype.onEnterFrame=function(t){PlayerManager.inst.updateFrame(),RoleManager.inst.updateFrame(),this.baseObject.updateFrame()},e.prototype.resetScene=function(){PlayerManager.inst.reset(),RoleManager.inst.reset(),GameModule.role.reset(),this.createBalls(50)},e}(egret.EventDispatcher);__reflect(ModuleScene.prototype,"ModuleScene");var Player=function(){function t(){}return Object.defineProperty(t.prototype,"positionX",{get:function(){return this.playerObject.positionX
},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"positionY",{get:function(){return this.playerObject.positionY},enumerable:!0,configurable:!0}),t.prototype.updateFrame=function(){this.playerVo.isAlive&&(this.excuteInput(),this.playerObject.updateFrame(),this.textHit())},t.prototype.excuteInput=function(){PlayerInput.speedDonw?this.playerObject._speed=15:this.playerObject._speed=5,PlayerInput.leftDown?(PlayerInput.rightDown=!1,this.playerObject.turnRightOn=!1,this.playerObject.turnLeftOn=!0):PlayerInput.rightDown?(PlayerInput.leftDown=!1,this.playerObject.turnLeftOn=!1,this.playerObject.turnRightOn=!0):(PlayerInput.leftDown=!1,PlayerInput.rightDown=!1,this.playerObject.turnLeftOn=!1,this.playerObject.turnRightOn=!1),console.log("turnlefton",this.playerObject.turnLeftOn,"turnleftoff",this.playerObject.turnRightOn)},t.prototype.textHit=function(){var t,e=RoleManager.inst.roleDict;for(var o in e)if(t=e[o],(t.positionX-this.positionX)*(t.positionX-this.positionX)+(t.positionY-this.positionY)*(t.positionY-this.positionY)<1600)return 1==t.roleVo.roleType?this.playerHiting():3==t.roleVo.roleType&&this.roleHiting(t),!0;return!1},t.prototype.roleHiting=function(t){this.playerVo.points+=100,GameModule.mainUI.showPoint(this.playerVo.points),GameModel.roles.removeRole(t.roleVo)},t.prototype.playerHiting=function(){this.killPlayer()},t.prototype.killPlayer=function(){this.playerVo.isAlive=!1,GameModule.mainUI.btnRestart.visible=!0},t.prototype.reset=function(){this.playerVo.reset(),this.playerObject.reset()},t}();__reflect(Player.prototype,"Player");var PlayerInput=function(){function t(){}return t.leftDown=!1,t.rightDown=!1,t.speedDonw=!1,t}();__reflect(PlayerInput.prototype,"PlayerInput");var PlayerManager=function(){function t(){}return Object.defineProperty(t,"inst",{get:function(){return t.manager||(t.manager=new t),t.manager},enumerable:!0,configurable:!0}),t.prototype.setPlayer=function(t){this.player=t},t.prototype.updateFrame=function(){this.player.updateFrame()},t.prototype.reset=function(){this.player.reset()},t}();__reflect(PlayerManager.prototype,"PlayerManager");var PlayerObject=function(t){function e(e,o){var i=t.call(this)||this;return i.turnLeftOn=!1,i.turnRightOn=!1,i.init(e,o),i}return __extends(e,t),e.prototype.init=function(t,e){var o=this;this.positionX=t,this.positionY=e,this.refreshStagePosition();var i=MathUtil.getRotationByPoints(new egret.Point(45,45),new egret.Point(0,0));this.setDirection(i+90),this._speed=5,null==this.player&&(this.player=AssetManager.instance.getDBArmature("Player"),this.player&&(this.player.scaleX=this.player.scaleY=.5,this.player.playOnce("start",function(){o.player.play("move")}),this.player,this.addChild(this.player)))},e.prototype.setDirection=function(t){this.rotation=t},e.prototype.excuteTurn=function(){this.turnLeftOn?this.rotation-=5:this.turnRightOn&&(this.rotation+=5)},e.prototype.moving=function(){var t=this._speed,e=this.rotation-90,o=t*Math.cos(e/180*Math.PI),i=t*Math.sin(e/180*Math.PI);this.positionX+=o,this.positionY+=i},e.prototype.refreshStagePosition=function(){this.x=GameSetting.playerCenterX,this.y=GameSetting.playerCenterY},e.prototype.changePosition=function(t,e){this.positionX=t,this.positionY=e,this.refreshStagePosition()},e.prototype.updateFrame=function(){this.excuteTurn(),this.moving()},e.prototype.reset=function(){this.positionX=0,this.positionY=0},e}(egret.Sprite);__reflect(PlayerObject.prototype,"PlayerObject");var MathUtil=function(){function t(){}return t.getRotationByPoints=function(t,e){var o=t,i=e,n=Math.atan2(i.y-o.y,i.x-o.x),r=n*(180/Math.PI);return r},t}();__reflect(MathUtil.prototype,"MathUtil");