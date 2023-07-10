'use strict';

const documentReady = (callback) => {
	if (document.readyState != 'loading') {
		callback ();
	} else if (document.addEventListener) {
		document.addEventListener ('DOMContentLoaded', callback);
	} else {
		document.attachEvent ('onreadystatechange', () => {
			if (document.readyState == 'complete') {
				callback ();
			}
		});
	}
},
caramelldansen = () => {
	let	updateTime = 0,
		percentTime = .0001,
		invRate = 1,
		rateTimer = percentTime,
		looping = !1,
		loops = 0;

	const musmus = new Howl ({
		src: conf.assets.audio,
		preload: !0,
		sprite: {
			intro: [0, 2100],
			loop: [2100, 23322, !0]
		},
		onload: () => {
			document.querySelector ('x-gif').setAttribute ('src', conf.assets.img);
			musmus.once ('unlock', () => {
				run ();
			});
		}
	}),
	randomNumberInRange = (min, max) => {
		return Math.random () * (max - min) + min;
	},
	setSpeedInfo = (spd, prog) => {
		document.querySelector ('x-gif').setAttribute ('speed', spd);
		document.querySelector ('#speedNumber').innerHTML = prog + '%';
	},
	setVolumeOnScroll = (delta, bool) => {
		let currentVolume = musmus.volume (),
			allow = bool || conf.param.allowVolumeOnScroll;

		if (allow) {
			if (delta < 0) {
				musmus.volume (Number (currentVolume + conf.param.volumeStep));
			} else {
				musmus.volume (Number (currentVolume - conf.param.volumeStep));
			}
		}

		return currentVolume;
	},
	run = () => {
		updateTime = new Date ();
		window.addEventListener ('wheel', (e) => {
			setVolumeOnScroll (e.deltaY);
		});

		let caramelldansenIntro = musmus.play ('intro');

		Howler.volume (Number (conf.param.globalMaxAudioVolume / 100));
		requestAnimationFrame (update);
		musmus.on ('play', () => {
			document.querySelector ('x-gif').removeAttribute ('stopped');
			document.querySelector ('.mim').classList.add ('playing');
		}, caramelldansenIntro).on ('end', () => {
			let caramelldansenLoop = musmus.play ('loop');

			musmus.on ('play', () => {
				looping = !0;
			}, caramelldansenLoop).on ('end', () => {
				let loopsEl = document.querySelector ('#loopsNumber');

				loops++;
				loopsEl.innerHTML = loops;
				loopsEl.classList.add ('plusOne');
				setTimeout (() => { 
					loopsEl.classList.remove ('plusOne');
				}, 1500);
			}, caramelldansenLoop);
		}, caramelldansenIntro);
	},
	setFx = (spd, prog) => {
		let miles = conf.param.milestones,
			decimal = conf.param.decimalPrecision,
			satuLvl = ` saturate(${spd})`,
			blurLvl = ` blur(${randomNumberInRange (miles.fx.blurLevel.min, miles.fx.blurLevel.max).toFixed (decimal)}px)`,
			invLvl = ` invert(${randomNumberInRange (miles.fx.invertLevel.min, miles.fx.invertLevel.max).toFixed (decimal)}%)`,
			hueLvl = ` hue-rotate(${randomNumberInRange (miles.fx.hueShiftLevel.min, miles.fx.hueShiftLevel.max).toFixed (decimal)}deg)`;
		
		const check = () => {
			let fxLine = 'filter:';

			if (prog > miles.checks [0]) {
				fxLine += satuLvl;
			}
			if (prog > miles.checks [1]) {
				fxLine += hueLvl;
			} 
			if (prog > miles.checks [2]) {
				fxLine += invLvl;
			} 
			if (prog > miles.checks [3]) {
				document.querySelector ('.imgn').setAttribute ('style', 'filter:' + blurLvl);
			}
			if (prog >= miles.checks [1]) {
				fxLine += ' opacity(1); transition: filter 0s'
			}

			return fxLine
		};

		document.querySelector ('x-gif').setAttribute ('style', check ());
	},
	update = () => {
		let progress = (1 * invRate * 100).toFixed (conf.param.decimalPrecision),
			speed = (invRate * 1.75).toFixed (conf.param.decimalPrecision);

		setSpeedInfo (speed, progress);
		
		if (looping) {
			let newTime = new Date (),
				delta = newTime.getTime () - updateTime.getTime ();

			updateTime.setTime (newTime.getTime ());
			rateTimer -= (1 / invRate) * delta / 1000;

			if (rateTimer <= 0) {
				rateTimer += percentTime;
				invRate += conf.param.speedUpRate / 1000000;
			}

			musmus.rate (1 * invRate);
		}

		setFx (speed, progress);

		requestAnimationFrame (update);
	};

	let levelValue = 0.1;


	/* Howler.masterGain.disconnect();
	this.level = Howler.ctx.createGain();
	Howler.masterGain.connect(this.level);
	this.level.gain.setValueAtTime(levelValue, Howler.ctx.currentTime);
	this.level.connect(Howler.ctx.destination); */
},
conf = {
	param: {
		globalMaxAudioVolume: 10,
		volumeStep: 0.1,
		allowVolumeOnScroll: !1,
		speedUpRate: 69,
		decimalPrecision: 2,
		milestones: {
			checks: [100,300,550,777],
			fx: {
				blurLevel: {
					min: 0,
					max: 50
				},
				invertLevel: {
					min: 0,
					max: 100
				},
				hueShiftLevel: {
					min: 0,
					max: 359
				}
			}
		}
	},
	assets: {
		audio: ['https://res.cloudinary.com/msr-cdn-mn/video/upload/q_auto,f_auto/v1684767250/aylmao.wtf/assets/cd/audio/caramelldansen_jtiiot.webm',
				'https://res.cloudinary.com/msr-cdn-mn/video/upload/q_auto,f_auto/v1684756844/aylmao.wtf/assets/cd/audio/Caramelldansen_ptiltj.ogg',
				'https://res.cloudinary.com/msr-cdn-mn/video/upload/q_auto,f_auto/v1684767251/aylmao.wtf/assets/cd/audio/caramelldansen_wuaioa.mp3'],
		img: 'https://res.cloudinary.com/msr-cdn-mn/image/upload/v1684750093/aylmao.wtf/assets/cd/img/caramelldansen_e5corj.gif'
	}
};

documentReady (() => {
	caramelldansen ();
});