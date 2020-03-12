import 'select2';

export default function() {


    $('.js-custom-select').each(function () {
        let currentSelect = $(this);

        currentSelect.select2({
            minimumResultsForSearch: -1,
            dropdownParent: currentSelect.parent()
        });
    });
    
}