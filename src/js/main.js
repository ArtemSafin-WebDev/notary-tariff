import polyfills from './polyfills';
import detectTouch from './detectTouch';
import customSelects from './customSelects';
import rangeSliders from './rangeSliders';
import accordions from './accordions';
import modals from './modals';
import forms from './forms';

document.addEventListener('DOMContentLoaded', function() {
    polyfills();
    detectTouch();
    customSelects();
    rangeSliders();
    accordions();
    modals();
    forms();
});

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
})
