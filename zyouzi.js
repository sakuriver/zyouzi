 	  window.addEventListener("load", init);
 	  var gameBg;
 	  var titleLogo;
 	  var stage;
 	  var zyouzi;
 	  var graphics;
 	  var gauge;
 	  var gauge_bg;
 	  var timingCnt = 0;
 	  var actionType = 0;
 	  var flyText;
 	  var resultFly = 0;
 	  var pushFlg = 0;
 	  var startFlg = 0;
 	  var resultCnt;
 	  var flyStartCntDown = 10;
 	  var seLists = [
 	  	{id:"Music", src:"game_start.ogg"},
 	  	{id:"Jump", src:"zyouzi_jump.ogg"},
 	  	{id:"BGM", src:"tobesan_bgm.ogg"}
 	  ];
 	  function init() {
 	  
 	  	createjs.Sound.alternateExtensions = ["mp3"];
 	  	createjs.Sound.addEventListener("fileload", loadHandler);
 	  	createjs.Sound.registerSounds(seLists, "");
 	  
 	  
 	    // Stageオブジェクトを作成。表示リストのルートになります
 	    stage = new createjs.Stage("myCanvas");
 	    stage.enableMouseOver();
 	    stage.clear();
 	    
 	    gameBg = new createjs.Bitmap("game_bg.png");
 	    gameBg.setBounds(0, 0, 450, 800);
 	    gameBg.sourceRect = {x:0, y:1200, width:450, height:800};
 	    stage.addChild(gameBg);
 	    
 	    graphics = new createjs.Graphics();
 	         	    
 	    gauge = new createjs.Shape(graphics);
 	    gauge.graphics.beginFill("#0F0").drawRect(200, 0, 20, 300);
 	    gauge.visible = false;
 	    
 	    gauge_bg = new createjs.Shape(graphics);
 	    gauge_bg.graphics.beginFill("#555").drawRect(205, -10, 25, 320);
 	    gauge_bg.visible = false;

 	    stage.addChild(gauge_bg);     	    
 	    stage.addChild(gauge);
 	    
 	    flyText = new createjs.Text("とんだ距離 0kｍ", "Bold 25px Arial", "#ff3300");
 	    flyText.x = 245;
 	    flyText.y = 100;
 	    stage.addChild(flyText);

 	    zyouzi = new createjs.Bitmap("zyouzi.png");
 	    zyouzi.x = 40;
 	    zyouzi.y = 260;
 	    stage.addChild(zyouzi);
 	    
 	    title_logo = new createjs.Bitmap("title_logo.png");
 	    title_logo.x = 0;
 	    title_logo.y = 30;
 	    stage.addChild(title_logo);
 	    
 	    
 	    timingCnt = 0;
 	    zyouzi.addEventListener("click", zyouziClickHandler);
 	    resultCnt = 0;
 	    startFlg = 0;
 	    
 	    var startButton = new createjs.Container();
 	    startButton.cursor = "pointer";
 	    stage.addChild(startButton);
 	    
 	    var bgUp = new createjs.Shape();
	    bgUp.graphics.setStrokeStyle(1).beginStroke("#563d7c").beginFill("white").drawRoundRect(0, 0, 240, 50, 4);
 	    startButton.addChild(bgUp);
 	    bgUp.visible = true;
 	    
 	    var bgOver = new createjs.Shape();
        bgOver.graphics.beginFill("#563d7c").drawRoundRect(0, 0, 240, 50, 4);
 	    bgOver.visible = false;
 	    startButton.addChild(bgOver);
 	    
 	    var label = new createjs.Text("ゲームスタート", "24px sans-serif", "#563d7c");
 	    label.textBaseline = "middle";
 	    label.x = 50;
 	    label.y = 25;
 	    startButton.addChild(label);
 	    startButton.x = 200;
 	    startButton.y = 650;
 	    
 	    startButton.addEventListener("mouseover", handleMouseOver);
 	    startButton.addEventListener("mouseout", handleMouseOut);
 	    startButton.addEventListener("click", handleGameStart);
 	    
 	    function loadHandler(eventObject) {
 	    	console.log("sound complete");
 	    	var instance = createjs.Sound.createInstance("BGM"); // SoundJSのインスタンスを再生(idを指定)
 			instance.setVolume(0.1);
 			instance.play({loop:-1})
 	    }
 	    
 	    function handleMouseOver(event) {
 	    	bgUp.visible = false;
 	    	bgOver.visible = true;
 	    	label.color = "while";
 	    }
 	    
 	    function handleMouseOut(event) {
 	    	bgUp.visible = true;
 	    	bgOver.visible = false;
 	    	label.color = "parple";
 	    }
 	    
 	    function handleGameStart(event) {
 	    	gauge.visible = true;
 	    	gauge_bg.visible = true;
	    	startFlg = 1;
	    	pushFlg = 0;
	  		flyStartCntDown = 10;
 	    	startButton.visible = false;
 	    	title_logo.visible = false;
 	    	createjs.Sound.play("Music");
	  		flyText.text = "とんだ距離 0kｍ";
	  		zyouzi.y = 260;
	  		gameBg.filters = [];
			gameBg.sourceRect = {x:0, y:1200, width:450, height:800};
	  		gameBg.cache(0, 0, 450, 800);
 	    }


 	    // tick イベントを監視します
 	    createjs.Ticker.setFPS(50);
 	    createjs.Ticker.on("tick", function () {
 	        
 	        // Stageの描画を更新します
 	        if (pushFlg == 0  && startFlg == 1) {
     	        if (actionType == 0) {
     	        	timingCnt += 5;
     	        	if (timingCnt >= 300) {
	     	        	timingCnt = 300;
	     	        	actionType = 1;
     	        	}
     	        } else {
     	        	timingCnt -= 5;
     	        	if (timingCnt <= 0) {
     	        		timingCnt = 0;
     	        		actionType = 0;
     	        	}
     	        }
 	        }
 	        
 	        if ((pushFlg == 1 && flyStartCntDown <= 0) && resultCnt < resultFly ) {
 	  			flyText.text = "とんだ距離 " + resultCnt + "kｍ";
 	  			var prevResultCnt = resultCnt;
 	  			resultCnt += 1;
 	  			zyouzi.y -= (resultCnt * 2) - 4 < 30 ? (resultCnt * 2) - 4 : 30;
 	  			if (zyouzi.y < 0) {
 	  				zyouzi.y = 0;
 	  			}
 	  			if (prevResultCnt > 80 && prevResultCnt < 150 && resultCnt % 6 == 0) {
     	            var setColor = resultCnt < 150 ? resultCnt:150;
     	            gameBg.filters = [new createjs.ColorFilter(1, 1, 1, 1, -setColor, -setColor, -setColor, 0)];
     	        }
     	        gameBg.sourceRect.y = 1200-(resultCnt*4);
     	        gameBg.updateCache();
     	    } else if ((pushFlg == 1 && flyStartCntDown > 0) && resultCnt < resultFly) {
     	    	flyStartCntDown -= 1;
     	    	if (flyStartCntDown < 0) {
     	    		flyStartCntDown = 0;
     	    	}
     	    	zyouzi.y += 2;
 	  		} else if (pushFlg == 1 && resultFly <= resultCnt) {
 	  			pushFlg = 0;
 	  			startFlg = 0;
 	  			resultCnt = 0;
 	  			label.text = "リトライ";
 	  			startButton.visible = true;
 	  		}
 	  		
 	  		if (pushFlg == 0 && startFlg == 1) {
 	  		    if (resultCnt == 0) {
 	                gauge.graphics.clear();
 	                gauge_bg.graphics.clear();
 	            }
 	            gauge_bg.graphics.beginFill("#FF0").drawRect(278, 290, 24, 310);
  		   	    gauge.graphics.beginFill("#0F0").drawRect(280, 300 + timingCnt, 20, 300 - timingCnt);
 	        }
 	        stage.update();
 	    });
 	  }
 	  
 	  function zyouziClickHandler(evt) {
 	  		if (startFlg == 1 && pushFlg == 0) {
 	  			resultFly = 300 - timingCnt;
 	  			resultCnt = 0;
 	  			pushFlg = 1;
 	  			flyStartCntDown = 10;
     	    	createjs.Sound.play("Jump");
 	  		}
 	  }
