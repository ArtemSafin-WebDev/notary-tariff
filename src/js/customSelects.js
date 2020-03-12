import 'select2';

export default function() {
    $('.js-custom-select').select2({
        minimumResultsForSearch: -1,
        dropdownParent: $('.page-content')
    });
}