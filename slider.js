function DataItem(params) {

	this.img = params.img || null;
	this.txt = params.txt || 'default';
}

function Slider(params) {

	/// This assigns "passed items" to this.items
	///	if it exists (i.e is passed) otherwise
	///	it'll assign it to be an empty array
	this.items = params.items || Array();

	this.interval = params.interval || 2000;
	this.timerId = undefined;

	this.currentIdx = null;

	this.where = params.where || 'target';
	this.whereEl = document.getElementById(this.where) || null;
}

Slider.prototype.addItem = function(img, txt) {
	this.items.push(new DataItem({
		img: img,
		txt: txt
	}));
}

Slider.prototype.display = function() {
	if (null == this.whereEl) {
		console.log("Target element does not exist!");
		return;
	}

	this.whereEl.innerHTML = '<img src="'
		+ this.items[this.currentIdx].img
		+ '" title="'
		+ this.items[this.currentIdx].txt
		+ '" width="'
		+ this.whereEl.clientWidth
		+ '" height="'
		+	this.whereEl.clientHeight
		+ '" />';
}

Slider.prototype.next = function() {
	++this.currentIdx;

	if (this.items.length <= this.currentIdx) {
		this.currentIdx = 0;
	}

	this.display();
}

Slider.prototype.prev = function() {
	--this.currentIdx;

	if (0 > this.currentIdx) {
		this.currentIdx = this.items.length - 1;
	}

	this.display();
}

Slider.prototype.start = function() {
	// Checks if it has already started
	if (this.timerId) {
		return;
	}

	if (null == this.currentIdx
			|| this.items.length <= this.currentIdx)
	{

		this.currentIdx = 0;
	}

	this.display();

	var self = this;
	this.timerId = window.setInterval(function() {
		self.next();
	}, this.interval);
}

Slider.prototype.stop = function() {
	if (this.timerId) {
		window.clearInterval(this.timerId);
		this.timerId = null;
	}
}

/// Instantiating the slider

window.onload = function() {
	var slider = new Slider({
		items: [
			new DataItem({
				img: 'images/1.jpg',
				txt: 'Coldplay #1'
			}),
			new DataItem({
				img: 'images/2.jpg',
				txt: 'Coldplay #2'
			}),
			new DataItem({
				img: 'images/3.jpg',
				txt: 'Coldplay #3'
			})
		]
	});

	// Set up event-listeners
	var nextBtn = document.getElementById('nextBtn'),
			prevBtn = document.getElementById('prevBtn'),
			startBtn = document.getElementById('startBtn'),
			pauseBtn = document.getElementById('pauseBtn');

	nextBtn.addEventListener('click', function() {
		slider.next();
	});
	prevBtn.addEventListener('click', function() {
		slider.prev();
	});
	startBtn.addEventListener('click', function() {
		slider.start();
	});
	pauseBtn.addEventListener('click', function() {
		slider.stop();
	});
};




