KineticUI.Input = function(config){
	this.____init(config);
};

KineticUI.Input.prototype = {
	____init : function(config){
		var self = this;
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
			strokeWidth : this._config.stroke.size
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

		if (!this._config.text) this._config.text = '';
		this._text = new Kinetic.Text({
			text : this._config.text,
			fontFamily : this._config.font.family,
			fontSize : this._config.font.size,
			fill : this._config.font.color.normal,
			x : this._config.padding,
			y : this._config.padding
		});
		this.add(this._text);

		this.disabled = false;
		this.pressed = false;
		this.hovered = false;
		this.focused = false;

		this.on('mouseover',this.mouseOver);
		this.on('mouseout',this.mouseLeave);
		this.on('mousedown touchstart',this.mouseDown);
		this.on('mouseup touchend',this.mouseUp);
		this.on('click touchend',this.mouseClick);

		window.addEventListener(KineticUI.Event.blur(), function(e){
			if(e.target != self) self.blur();
		});
	},
	batchDraw : function(){
		if (this.parent) if (this.parent.batchDraw) this.parent.batchDraw();
	},
	colorScheme : function(scheme){
		this._background.setAttrs({
			fillLinearGradientStartPoint : this._config.fill[scheme].startPoint,
			fillLinearGradientEndPoint : this._config.fill[scheme].endPoint,
			fillLinearGradientColorStops : this._config.fill[scheme].colorStops,
			stroke : this._config.stroke.color[scheme],
			strokeWidth : this._config.stroke.size
		});
		this._text.setAttrs({
			fill : this._config.font.color[scheme]
		});
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
		this.pressed = true;
		this.focus();
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
		if (str) {
			this._text.text(str);
			this.batchDraw();
		} else  {
			return this._text.text();
		}
	},
	focus : function(){
		this.colorScheme('focus');
		this._placeholder.hide();
		this.focused = true;
	},
	blur : function(){
		if (this.hovered)
			this.colorScheme('hover');
		else
			if (this.disabled)
				this.colorScheme('disabled');
			else
				this.colorScheme('normal');
		if (this.text() === '') this._placeholder.show();
		this.focused = false;
	}
};

Kinetic.Util.extend(KineticUI.Input, Kinetic.Group);
