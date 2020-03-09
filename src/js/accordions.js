export default function() {
    function openAccordeon(element) {
        element.style.maxHeight = 'none';
        const computedStyle = getComputedStyle(element);
        const computedHeight = computedStyle.height;
        element.style.maxHeight = '';
        setTimeout(() => {
            const transitionEndHandler = () => {
                console.log('Tranisitionnd Initiated');
                element.style.maxHeight = 'none';
                element.removeEventListener('transitionend', transitionEndHandler);
            };
            element.addEventListener('transitionend', transitionEndHandler);
            element.style.maxHeight = `${computedHeight}`;
        }, 20);
    }

    function closeAccordeon(element) {
        const computedStyle = getComputedStyle(element);
        const computedHeight = computedStyle.height;
        element.style.maxHeight = `${computedHeight}`;
        setTimeout(() => {
            element.style.maxHeight = '';
        }, 20);
    }

    const accordionElements = Array.from(document.querySelectorAll('.js-accordion'));

    accordionElements.forEach(element => {
        const btn = element.querySelector('.faq__accordion-btn');
        const content = element.querySelector('.faq__accordion-content');

        btn.addEventListener('click', event => {
            event.preventDefault();
            if (!element.classList.contains('active')) {
                openAccordeon(content);
                element.classList.add('active');
            } else {
                closeAccordeon(content);
                element.classList.remove('active');
            }
        });
    });
}
