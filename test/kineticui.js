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
	},
	preventEvent : function(event){
		event.cancelBubble = true;
		event.stopPropagation();
		event.preventDefault();
		return false;
	}
};

KineticUI.Config = {

	button : {
		fill : {
			up : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#F3B931', 1, '#E6951D']
			},
			hover : {
				startPoint:{x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#F3B931', 1, '#F3B931']
			},
			down : {
				startPoint: {x:0, y:-100},
				endPoint: {x:0, y:100},
				colorStops: [0, '#E6951D', 1, '#F3B931']
			},
			disabled : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#929292', 1, '#818181']
			}
		},
		font : {
			color : {
				up : '#000000',
				hover : '#ffffff',
				down : '#000000',
				disabled : '#555555'
			},
			family : 'Arial',
			size : 16,
			style : 'bold'
		},
		height : 32,
		radius : 5,
		padding : 40
	}

};

KineticUI.Button = function(config){
	this.____init(config);
};

KineticUI.Button.prototype = {
	____init : function(config){
		if (!config) config = {};
		if (!config.text) config.text = '';
		if (!config.height) config.height = KineticUI.Config.button.height;
		if (!config.padding) config.padding = KineticUI.Config.button.padding;
		if (!config.radius) config.radius = KineticUI.Config.button.radius;
		this.___init();
		this.text = new Kinetic.Text({
			text : config.text,
			fontFamily : KineticUI.Config.button.font.family,
			fontSize : KineticUI.Config.button.font.size,
			fill : KineticUI.Config.button.font.color.up,
			fontStyle : KineticUI.Config.button.font.style
		});

		if (!config.width) config.width = this.text.width() + config.padding * 2;
		this.background = new Kinetic.Rect({
			cornerRadius : config.radius,
			height : config.height,
			width : config.width,
			fillLinearGradientStartPoint : KineticUI.Config.button.fill.up.startPoint,
			fillLinearGradientEndPoint : KineticUI.Config.button.fill.up.endPoint,
			fillLinearGradientColorStops : KineticUI.Config.button.fill.up.colorStops,
			fillPriority : 'linear-gradient'
		});
		this.add(this.background);
		this.add(this.text);
		this.setSize(this.background.getSize());
		this.text.position({x:config.padding, y:(this.background.height() - this.text.height()) / 2});

		this.disabled = false;
		this.pressed = false;
		this.hovered = false;

		this.on('mouseover',this.mouseOver);
		this.on('mouseout',this.mouseLeave);
		this.on('mousedown touchstart',this.mouseDown);
		this.on('mouseup touchend',this.mouseUp);
		this.on('click touchend',this.mouseClick);
	},
	batchDraw : function(){
		if (this.parent) if (this.parent.batchDraw) this.parent.batchDraw();
	},
	colorScheme : function(scheme){
		this.background.setAttrs({
			fillLinearGradientStartPoint : KineticUI.Config.button.fill[scheme].startPoint,
			fillLinearGradientEndPoint : KineticUI.Config.button.fill[scheme].endPoint,
			fillLinearGradientColorStops : KineticUI.Config.button.fill[scheme].colorStops		
		});
		this.text.setAttrs({
			fill : KineticUI.Config.button.font.color[scheme]
		});
		this.batchDraw();
	},
	mouseOver : function(e){
		if (this.disabled) return;
		this.colorScheme('hover');
		this.hovered = true;
	},
	mouseLeave : function(e){
		if (this.disabled) return;
		this.colorScheme('up');
		this.hovered = false;
	},
	mouseDown : function(e){
		if (this.disabled) return;
		this.colorScheme('down');
		this.pressed = true;
	},
	mouseUp : function(e){
		if (this.disabled) return;
		if (this.hovered)
			this.colorScheme('hover');
		else
			this.colorScheme('up');
		this.pressed = false;
	},
	mouseClick : function(e){
		if (this.disabled) return;
		if (this.click) this.click(e);
	},
	disable : function(){
		this.disabled = true;
		this.colorScheme('disabled');
	},
	enable : function(){
		this.disabled = false;
		this.colorScheme('up');
	}
};

Kinetic.Util.extend(KineticUI.Button, Kinetic.Group);

