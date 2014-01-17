KineticUI.Button = function(config){
	this.____init(config);
};

KineticUI.Button.prototype = {
	____init : function(config){
		this.___init();
		this.background = new Kinetic.Rect({
			height : 30,
			width : 50,
			fill : '#ff00ff'
		});
		this.add(this.background);
	},
	batchDraw : function(){
		KineticUI.trace(this);
		if (this.parent && this.parent.batchDraw) this.parent.batchDraw();
	}
};

Kinetic.Util.extend(KineticUI.Button, Kinetic.Group);
