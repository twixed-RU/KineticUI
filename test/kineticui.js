/*

Kinda `core` KineticUI's script file. Should be first to join with other scripts.

*/

var KineticUI = {
	traceEnabled : false,

	enableTrace : function(){
		KineticUI.traceEnabled = true;
	},
	disableTrace : function(){
		KineticUI.traceEnabled = false;
	},
	trace : function(str,error){
		if (KineticUI.traceEnabled && console) {
			if (!error) {
				if (console.log) console.log(str);
			} else {
				if (console.error) console.error(str);
			}
		}
	}
};

KineticUI.Config = {

	button : {
		fill : {
			up : {

			},
			hover : {

			},
			down : {

			},
			disabled : {

			}
		},
		color : {
			up : '#000000',
			hover : '#ffffff',
			down : '#000000',
			disabled : '#555555'
		}
	}

};

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

