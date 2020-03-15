window.widgetController = function(element) {
    var currentStep = 0;
    var steps = Array.prototype.slice.call(
        element.querySelectorAll(".application-widget__content-block")
    );
    var stepsCount = steps.length;
    var stepsInfo = [
        {
            name: "Выберите станцию метро"
        },
        {
            name: "Выберите нотариуса"
        },
        {
            name: "Выберите сеанс"
        },
        {
            name: "Контактная информация"
        }
    ];
    var closeBtn = element.querySelector(".application-widget__close");
    var mainBtn = element.querySelector(".application-widget__main-btn");
    var mainBtnText = element.querySelector(
        ".application-widget__main-btn-text"
    );
    var navAction = element.querySelector(".application-widget__nav-action");
    var pagination = element.querySelector(
        ".application-widget__nav-pagination"
    );
    var backBtn = element.querySelector(".application-widget__nav-back");
    var scrollContainers = Array.prototype.slice.call(
        element.querySelectorAll(".application-widget__scroll-container")
    );

    var phoneNumbers = Array.prototype.slice.call(
        element.querySelectorAll('input[type="tel"]')
    );
    var locale = "ru";
    var form = element.querySelector("form");

    var submitCallback = null;

    function onSubmit(callback) {
        submitCallback = callback;
    }

    function initialize() {
        closeBtn.addEventListener("click", closeWidget);
        mainBtn.addEventListener("click", pressMainButton);
        backBtn.addEventListener("click", goBackward);
        _setActiveStep(currentStep);
        _setScrollbars();
        _setPhoneMasks();
        _addValidators();
    }

    function destroy() {
        closeBtn.removeEventListener("click", closeWidget);
        mainBtn.removeEventListener("click", pressMainButton);
        currentStep = 0;
        closeWidget();
    }

    function _setScrollbars() {
        scrollContainers.forEach(function(container) {
            new PerfectScrollbar(container, {
                wheelSpeed: 2,
                wheelPropagation: false,
                minScrollbarLength: 58,
                maxScrollbarLength: 58
            });
        });
    }

    function _setPhoneMasks() {
        phoneNumbers.forEach(function(input) {
            Inputmask({ mask: "+7 (999) 999-99-99" }).mask(input);
        });
    }

    function _addValidators() {
        window.Parsley.addValidator("phone", {
            requirementType: "string",
            validateString: function(value) {
                return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
                    value
                );
            },
            messages: {
                en: "This value should be a mobile number",
                ru: "Введите правильный номер мобильного телефона"
            }
        });

        Parsley.addMessages("ru", {
            defaultMessage: "Некорректное значение.",
            type: {
                email: "В данном поле может быть только E-mail",
                url: "Адрес сайта введен неверно.",
                number: "Введите число.",
                integer: "Введите целое число.",
                digits: "Введите только цифры.",
                alphanum: "Введите буквенно-цифровое значение."
            },
            notblank: "Это поле должно быть заполнено.",
            required: "Обязательное поле",
            pattern: "Это значение некорректно.",
            min: "Это значение должно быть не менее чем %s.",
            max: "Это значение должно быть не более чем %s.",
            range: "Это значение должно быть от %s до %s.",
            minlength: "Это значение должно содержать не менее %s символов.",
            maxlength: "Это значение должно содержать не более %s символов.",
            length: "Это значение должно содержать от %s до %s символов.",
            mincheck: "Выберите не менее %s значений.",
            maxcheck: "Выберите не более %s значений.",
            check: "Выберите от %s до %s значений.",
            equalto: "Это значение должно совпадать."
        });

        Parsley.setLocale(locale);

        var parsleyConfig = {
            errorsContainer: function(pEle) {
                var $err = pEle.$element.closest(
                    ".application-widget__contacts-row"
                );
                return $err;
            }
        };

        $(form).parsley(parsleyConfig);
    }

    function _setActiveStep(index) {
        steps.forEach(function(step, stepIndex) {
            if (stepIndex !== index) {
                step.classList.remove("active");
            } else {
                step.classList.add("active");
            }
        });

        currentStep = index;

        if (currentStep + 1 === stepsCount) {
            element.classList.add("last-step");
        } else {
            element.classList.remove("last-step");
        }

        if (currentStep === 0) {
            element.classList.add("first-step");
        } else {
            element.classList.remove("first-step");
        }

        navAction.textContent = stepsInfo[currentStep].name;

        pagination.textContent = currentStep + 1 + "/" + stepsCount;
    }

    function pressMainButton(event) {
        if (currentStep < stepsCount - 1) {
            event.preventDefault();
            goForward();
        } else {
            if (submitCallback) {
                event.preventDefault();
                if (
                    $(form)
                        .parsley()
                        .isValid()
                ) {
                    submitCallback(new FormData(form));
                }
            }
        }
    }

    function _handleMainButtonText() {
        if (currentStep === stepsCount - 1) {
            mainBtnText.textContent = "Записаться";
        } else {
            mainBtnText.textContent = "Следующий шаг";
        }
    }

    function goBackward(event) {
        if (typeof event !== "undefined") {
            event.preventDefault();
        }
        if (currentStep >= 1) {
            _setActiveStep(currentStep - 1);
        }

        _handleMainButtonText();
    }

    function goForward() {
        if (currentStep < stepsCount - 1) {
            _setActiveStep(currentStep + 1);
        }

        _handleMainButtonText();
    }

    function openWidget() {
        element.classList.add("visible");
    }

    function closeWidget() {
        element.classList.remove("visible");
    }

    function getCurrentStepIndex() {
        return currentStep;
    }

    return {
        init: initialize,
        destroy: destroy,
        close: closeWidget,
        open: openWidget,
        getCurrentStep: getCurrentStepIndex,
        clickCentralButton: pressMainButton,
        goBackward: goBackward,
        goForward: goForward,
        onSubmit: onSubmit
    };
};
