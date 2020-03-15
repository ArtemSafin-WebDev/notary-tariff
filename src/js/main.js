import polyfills from './polyfills';
import detectTouch from './detectTouch';
import customSelects from './customSelects';
import rangeSliders from './rangeSliders';
import accordions from './accordions';
import modals from './modals';
import forms from './forms';
import calculator from './calculator';

document.addEventListener('DOMContentLoaded', function() {
    if (window.matchMedia('(max-width: 768px)').matches) {
        const intro = document.querySelector('.intro');
        if (intro) {
            console.log('Setting min height');
            intro.style.minHeight = document.documentElement.clientHeight + 'px';
        }
    }

    polyfills();
    detectTouch();
    customSelects();
    rangeSliders();
    accordions();
    modals();
    forms();
    calculator();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
