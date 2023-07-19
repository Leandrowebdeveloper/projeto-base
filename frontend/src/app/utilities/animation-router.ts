import { Animation, createAnimation } from '@ionic/angular';
const DURATION = 500;
const EASING = 'cubic-bezier(0.36,0.66,0.04,1)';

export const animationRouter = (baseEl: HTMLElement, opts?: any): Animation => {
	const rootTransition: Animation = createAnimation('');
	if (opts.direction === 'forward') {

		const squareA: Animation = createAnimation('')
			.addElement(opts.enteringEl)
			.duration(DURATION)
			.easing(EASING)
			.beforeStyles({ opacity: 1 })
            .fromTo('transform', 'translateX(99.5%)', 'translateX(0%)')
            .fromTo('opacity', '0.8', '1');

		const squareB: Animation = createAnimation('')
			.addElement(opts.enteringEl)
			.duration(DURATION)
			.easing(EASING)
            .fromTo('transform', 'translateX(0%)', 'translateX(-20%)')
			.fromTo('opacity', '1', '0.8');

		rootTransition.addAnimation([squareB, squareA]);
	}
	else if (opts.direction === 'back') {

		const squareA: Animation = createAnimation('')
			.addElement(opts.leavingEl)
			.duration(DURATION)
			.easing(EASING)
            .fromTo('transform', 'translateX(0%)', 'translateX(99.5%)')
            .fromTo('opacity', '1', '0.8');


		const squareB: Animation = createAnimation('')
			.addElement(opts.enteringEl)
			.duration(DURATION)
			.easing(EASING)
            .fromTo('opacity', '0.8', '1')
            .fromTo('transform', 'translateX(-20%)', 'translateX(0%)');

		rootTransition.addAnimation([squareA, squareB]);

	}

    return rootTransition;

};


