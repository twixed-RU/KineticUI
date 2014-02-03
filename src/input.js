KineticUI.Input = function(config){
	this.____init(config);
};

KineticUI.Input.prototype = {
	____init : function(config){
		var self = this;
		this._config = KineticUI.extend(KineticUI.Config.input, config, true);

		this.___init(this._config);

		this.clip({x:0, y:0, width:this._config.width, height : this._config.height});

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

		this._cursor = new Kinetic.Rect({
			height : 1,
			fill : KineticUI.Config.input.cursor.color,
			width : KineticUI.Config.input.cursor.width
		});
		this.add(this._cursor);
		this._cursor.time = 0;
		this._cursor.hide();

		var anim = new Kinetic.Animation(function(frame){
			if (!this.target.focused) return;
			if (frame.lastTime - this.target._cursor.time >= this.target._config.cursor.interval) {
				this.target._cursor.time = frame.lastTime;
				if (this.target._cursor.isVisible()) {
					this.target._cursor.hide();
				} else {
					this.target._cursor.show();
				}
				// this.target.update();
				this.target.batchDraw();
			}
		});
		anim.target = this;
		anim.start();


		this.disabled = false;
		this.pressed = false;
		this.hovered = false;
		this.focused = false;

		this.on('mouseover',this.mouseOver);
		this.on('mouseout',this.mouseLeave);
		this.on('mousedown touchstart',this.mouseDown);
		this.on('mouseup touchend',this.mouseUp);

		window.addEventListener(KineticUI.Event.blur(), function(e){
			if(e.target != self) self.blur();
		});
		// window.addEventListener('keydown',function(e){
		// 	self.keyDown(e);
		// });
		// window.addEventListener('keypress',function(e){
		// 	self.keyPress(e);
		// });

		this._input = document.createElement('input');
		this._input.id = KineticUI.uniqid();
		this._input.style.position = 'absolute';
		this._input.style.top = '-666px';
		this._input.addEventListener('keydown',function(e){
			self.keyDown(e);
		});
		this._input.addEventListener('keypress',function(e){
			self.keyPress(e);
		});
		document.getElementsByTagName('body')[0].appendChild(this._input);
	},
	batchDraw : function(){
		if (this.parent && this.parent.batchDraw) {
			this._cursor.position({x:this._text.position().x + this._text.width(),y:this._text.position().y});
			this._cursor.height(this._text.height());
			this.parent.batchDraw();
		}
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
	keyDown : function(e){
		if (!this.focused) return;
		e = e || window.event;
		var key = e.keyCode || e.which;
		var charStr = String.fromCharCode(key);
		var letter = (e.charCode && !e.altKey && !e.ctrlKey);
		var str = this.text();
		switch(key) {
			case 8 : // backspace
				str = str.substring(0, str.length - 1);
				KineticUI.preventEvent(e);
				break;
		}
		this.text(str);
		this._input.value = '';
	},
	keyPress : function(e){
		if (!this.focused) return;
		e = e || window.event;
		var key = e.keyCode || e.which;
		var charStr = String.fromCharCode(key);
		var letter = (e.charCode && !e.altKey && !e.ctrlKey);
		var str = this.text();
		switch(key) { // somehow we need a separate event handler here
			case 8 : // backspace
				str = str.substring(0, str.length - 1);
				KineticUI.preventEvent(e);
				break;
		}
		if (letter) {
			str += charStr;
			this.text(str);
			this._input.value = '';
		}
	},
	disable : function(){
		this.disabled = true;
		this.focused = false;
		this._input.disabled = true;
		this.colorScheme('disabled');
	},
	enable : function(){
		this.disabled = false;
		this._input.disabled = false;
		this.colorScheme('normal');
	},
	text : function(str){
		if (str !== undefined) {
			if (str === '' && !this.focused)
				this._placeholder.show();
			else
				this._placeholder.hide();
			this._text.text(str);
			this.batchDraw();
		} else  {
			return this._text.text();
		}
	},
	focus : function(){
		KineticUI.Event.blur(this);
		this.colorScheme('focus');
		this._placeholder.hide();
		this.focused = true;
		this._input.focus();
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
		this._cursor.hide();
		this._input.blur();
		this.focused = false;
	}
};

Kinetic.Util.extend(KineticUI.Input, Kinetic.Group);
