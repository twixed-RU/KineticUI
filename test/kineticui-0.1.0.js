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
	},
	cloneArray : function(array){
		var result = [];
		for (var key in array) {
			if (typeof array[key] == 'object') {
				if (Array.isArray(array[key]))
					result[key] = this.cloneArray(array[key]);
				else
					result[key] = this.cloneObject(array[key]);
			} else
				result[key] = array[key];
		}
		return result;
	},
	cloneObject : function(object){
		var result = {};
		for(var key in object){
			if (!object.hasOwnProperty(key)) continue;
			if (typeof object[key] == 'object') {
				if (Array.isArray(object[key]))
					result[key] = this.cloneArray(object[key]);
				else
					result[key] = this.cloneObject(object[key]);
			} else
				result[key] = object[key];
		}
		return result;
	},
	extend : function(dst,src,clone){
		var result = dst;
		if (clone) result = KineticUI.cloneObject(dst);
		if (src !== undefined) {
			if (result === undefined || result == null) result = {};
			for (var key in src) {
				if (!src.hasOwnProperty(key)) continue;
				if (typeof src[key] == 'object')
					result[key] = this.extend(result[key],src[key]);
				else
					result[key] = src[key];
			}
		}
		return result;
	}
};

KineticUI.Config = {

	button : {
		cornerRadius : 5,
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
		padding : 40
	},

	input : {
		cornerRadius : 5,
		fill : {
			normal : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#F8F8F8']
			},
			hover : {
				startPoint:{x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#FAFAFA', 1, '#FAFAFA']
			},
			focus : {
				startPoint: {x:0, y:-100},
				endPoint: {x:0, y:100},
				colorStops: [0, '#FFFFFF', 1, '#FFFFFF']
			},
			disabled : {
				startPoint: {x:0, y:15},
				endPoint: {x:0, y:17},
				colorStops: [0, '#DDDDDD']
			}
		},
		font : {
			color : {
				normal : '#555555',
				hover : '#333333',
				focus : '#000000',
				disabled : '#555555',
				placeholder : '#999999'
			},
			family : 'Arial',
			size : 16,
			style : 'bold'
		},
		height : 32,
		stroke : {
			color : {
				normal : '#555555',
				hover : '#F3B931',
				focus : '#E6951D',
				disabled : '#999999'
			},
			enabled : true,
			size : 1
		},
		padding : 5,
		width : 150
	}

};

KineticUI.Event = function(){
	
};
KineticUI.Button = function(config){
	this.____init(config);
};

KineticUI.Button.prototype = {
	____init : function(config){
		this._config = KineticUI.extend(KineticUI.Config.button, config, true);

		this._text = new Kinetic.Text({
			text : this._config.text,
			fontFamily : this._config.font.family,
			fontSize : this._config.font.size,
			fill : this._config.font.color.up,
			fontStyle : this._config.font.style
		});

		if (!this._config.width) this._config.width = this._text.width() + this._config.padding * 2;

		this.___init(this._config);

		this._background = new Kinetic.Rect({
			cornerRadius : this._config.cornerRadius,
			height : this._config.height,
			width : this._config.width,
			fillLinearGradientStartPoint : this._config.fill.up.startPoint,
			fillLinearGradientEndPoint : this._config.fill.up.endPoint,
			fillLinearGradientColorStops : this._config.fill.up.colorStops,
			fillPriority : 'linear-gradient'
		});
		this.add(this._background);
		this.add(this._text);

		this._text.position({
			x:(this.width() - this._text.width()) / 2,
			y:(this._background.height() - this._text.height()) / 2
		});

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
		this._text.position({
			x:(this.width() - this._text.width()) / 2,
			y:(this._background.height() - this._text.height()) / 2
		});
		if (this.parent) if (this.parent.batchDraw) this.parent.batchDraw();
	},
	colorScheme : function(scheme){
		this._background.setAttrs({
			fillLinearGradientStartPoint : this._config.fill[scheme].startPoint,
			fillLinearGradientEndPoint : this._config.fill[scheme].endPoint,
			fillLinearGradientColorStops : this._config.fill[scheme].colorStops		
		});
		this._text.setAttrs({
			fill : this._config.font.color[scheme]
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
	},
	text : function(str){
		this._text.text(str);
		this.batchDraw();
	}
};

Kinetic.Util.extend(KineticUI.Button, Kinetic.Group);

KineticUI.Input = function(config){
	this.____init(config);
};

KineticUI.Input.prototype = {
	____init : function(config){
		this._config = KineticUI.extend(KineticUI.Config.input, config, true);

		this.___init(this._config);

		this._background = new Kinetic.Rect({
			cornerRadius : this._config.cornerRadius,
			height : this._config.height,
			width : this._config.width,
			fillLinearGradientStartPoint : this._config.fill.normal.startPoint,
			fillLinearGradientEndPoint : this._config.fill.normal.endPoint,
			fillLinearGradientColorStops : this._config.fill.normal.colorStops,
			fillPriority : 'linear-gradient',
			strokeEnabled : this._config.stroke.enabled,
			stroke : this._config.stroke.color.normal,
			strokeSize : this._config.stroke.size
		});
		this.add(this._background);

		this._placeholder = new Kinetic.Text({
			text : this._config.placeholder,
			fontFamily : this._config.font.family,
			fontSize : this._config.font.size,
			fill : this._config.font.color.placeholder,
			x : this._config.padding,
			y : this._config.padding
		});
		this.add(this._placeholder);

		this.disabled = false;
		this.pressed = false;
		this.hovered = false;
		this.focused = false;

		this.on('mouseover',this.mouseOver);
		this.on('mouseout',this.mouseLeave);
		this.on('mousedown touchstart',this.mouseDown);
		this.on('mouseup touchend',this.mouseUp);
		this.on('click touchend',this.mouseClick);
	},
	batchDraw : function(){
		// this._text.position({
		// 	x:(this.width() - this._text.width()) / 2,
		// 	y:(this._background.height() - this._text.height()) / 2
		// });
		if (this.parent) if (this.parent.batchDraw) this.parent.batchDraw();
	},
	colorScheme : function(scheme){
		this._background.setAttrs({
			fillLinearGradientStartPoint : this._config.fill[scheme].startPoint,
			fillLinearGradientEndPoint : this._config.fill[scheme].endPoint,
			fillLinearGradientColorStops : this._config.fill[scheme].colorStops,
			stroke : this._config.stroke.color[scheme],
			strokeSize : this._config.stroke
		});
		// this._text.setAttrs({
		// 	fill : this._config.font.color[scheme]
		// });
		this.batchDraw();
	},
	mouseOver : function(e){
		if (this.disabled) return;
		if (this.focused)
			this.colorScheme('focus');
		else
			this.colorScheme('hover');
		this.hovered = true;
	},
	mouseLeave : function(e){
		if (this.disabled) return;
		if (this.focused)
			this.colorScheme('focus');
		else
			this.colorScheme('normal');
		this.hovered = false;
	},
	mouseDown : function(e){
		if (this.disabled) return;
		this.colorScheme('focus');
		this.pressed = true;
		this.focused = true;
	},
	mouseUp : function(e){
		if (this.disabled) return;
		if (this.hovered)
			this.colorScheme('hover');
		if (this.focused)
			this.colorScheme('focus');
		else
			this.colorScheme('normal');
		this.pressed = false;
	},
	mouseClick : function(e){
		if (this.disabled) return;
		if (this.click) this.click(e);
	},
	disable : function(){
		this.disabled = true;
		this.focused = false;
		this.colorScheme('disabled');
	},
	enable : function(){
		this.disabled = false;
		this.colorScheme('normal');
	},
	text : function(str){
		this._text.text(str);
		this.batchDraw();
	}
};

Kinetic.Util.extend(KineticUI.Input, Kinetic.Group);

