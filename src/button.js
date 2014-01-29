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
		KineticUI.Event.blur(this);
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
