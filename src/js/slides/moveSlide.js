import * as utils from '../common/utils.js';
import { getOptions } from '../common/options.js';
import { getState, setState, state } from '../common/state.js';
import { FP } from '../common/constants.js';
import { SLIDES_WRAPPER_SEL } from '../common/selectors.js';
import { landscapeScroll } from './landscapeScroll.js';


FP.moveSlideLeft = moveSlideLeft;
FP.moveSlideRight = moveSlideRight;

/**
* Slides a slider to the given direction.
* Optional `section` param.
*/
export function moveSlide(direction, section){
    var activeSection = section == null ? getState().activeSection.item : section;
    var slides = utils.$(SLIDES_WRAPPER_SEL, activeSection)[0];

    // more than one slide needed and nothing should be sliding
    if (slides == null || state.slideMoving || getState().activeSection.slides.length < 2) {
        return;
    }

    var currentSlide = getState().activeSection.activeSlide;
    var destiny = direction === 'left' ? currentSlide.prev() : currentSlide.next();

    //isn't there a next slide in the secuence?
    if(!destiny){
        //respect loopHorizontal setting
        if (!getOptions().loopHorizontal) return;

        destiny = direction === 'left' ? utils.getLast(getState().activeSection.slides) : getState().activeSection.slides[0];
    }

    setState({slideMoving: true && !FP.test.isTesting});
    landscapeScroll(slides, destiny.item, direction);
}

/**
* Slides left the slider of the active section.
* Optional `section` param.
*/
export function moveSlideLeft(section){
    moveSlide('left', section);
}

/**
* Slides right the slider of the active section.
* Optional `section` param.
*/
export function moveSlideRight(section){
    moveSlide('right', section);
}