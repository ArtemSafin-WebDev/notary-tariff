import noUiSlider from 'noUiSlider';

export default function() {
    const rangeSliders = Array.from(document.querySelectorAll('.js-range-slider'));

    rangeSliders.forEach(rangeSlider => {
        const input = rangeSlider.querySelector('input[type="range"]');
        const sliderElement = rangeSlider.querySelector('.calculator__range-slider');
        const priceElement = rangeSlider.querySelector('.calculator__range-slider-price');

        const min = input.hasAttribute('min') ? input.getAttribute('min') : 0;
        const max = input.hasAttribute('max') ? input.getAttribute('max') : 15000000;
        const step = input.hasAttribute('step') ? input.getAttribute('step') : 1;
        const initialValue = input.value;
        console.log('initial', initialValue)

        noUiSlider.create(sliderElement, {
            start: [initialValue ? parseInt(initialValue, 10) : 1],
            connect: 'lower',
            orientation: 'horizontal',
            step: +step,
            range: {
                min: +min,
                max: +max
            }
        });

        sliderElement.noUiSlider.on('update', function() {
            const value = parseInt(sliderElement.noUiSlider.get(), 10);
            input.value = value;
            priceElement.textContent = value.toLocaleString();
        });
    });
}
