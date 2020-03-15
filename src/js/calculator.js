export default function() {
    const calculator = document.querySelector('#calculator');

    if (!calculator) return;

    const costElement = calculator.querySelector('#cost');
    const objectsCountElement = calculator.querySelector('#objects-count');
    const contractTypeElement = calculator.querySelector('#contract-type');
    const subjectRadios = Array.from(calculator.querySelectorAll('input[name="subject"][type="radio"]'));
    const sidesElement = calculator.querySelector('#sides');
    const relationRadios = Array.from(calculator.querySelectorAll('input[name="relation"][type="radio"]'));
    const propertyTypeRadios = Array.from(calculator.querySelectorAll('input[name="property"][type="radio"]'));
    const priceElement = calculator.querySelector('.calculator__form-price');

    function shareSellCost(cost, side) {
        var c = -1;
        var z = 0;

        if (cost <= 1000000) {
            var s = cost * 0.005;
            c = s < 1500 ? 1500 : s;
        }
        if (cost > 1000000 && cost <= 10000000) {
            var s = 5000 + (cost - 1000000) * 0.003;
            c = s;
        }
        if (cost > 10000000) {
            var s = 32000 + (cost - 10000000) * 0.0015;
            c = s;
        }

        if (side === 'physical') z = 13500;
        if (side === 'company') z = 18500;
        if (side === 'nonresident') z = 26000;
        //корректиовка от 17.09.2018 15:28
        var mx = 150000;
        return (c > mx ? mx : c) + z;
    }

    function propertySellCost(cost, propertyType, relation) {
        if (propertyType === 'common') {
            var z = 5000;
            var c = cost * 0.005;
            if (c < 300) c = 300;
            if (c > 20000) c = 20000;
            return z + c;
        } else if (propertyType === 'individual') {
            var z = 8000;
            var c = -1;

            if (relation === 'close') {
                if (cost > 10000000) {
                    c = 23000 + (cost - 10000000) * 0.001 + z;
                    if (c > 50000 + z) c = 50000 + z;
                } else {
                    c = 3000 + cost * 0.002 + z;
                }
            } else if (relation === 'none') {
                if (cost <= 1000000) {
                    c = 3000 + cost * 0.004 + z;
                }
                if (cost > 1000000 && cost <= 10000000) {
                    c = 7000 + cost * 0.002 + z;
                }
                if (cost > 10000000) {
                    c = 25000 + (cost - 10000000) * 0.001 + z;
                    if (c > 100000) c = 100000 + z;
                }
            } else {
                console.error('No such relation type');
            }
            return c;
        } else {
            console.error('No such property type');
        }
    }

    function marryContractCost(objectsCount) {
        var z = 500;
        var b = 10000;
        var r = 0;
        if (objectsCount < 3) r = b;
        else r = b + objectsCount * 500;

        var mx = 14000;
        return r > mx ? mx + z : r + z;
    }

    function handleActivity() {
        const contractType = contractTypeElement.value;
        const subject = subjectRadios.find(element => element.checked).value;
        if (contractType === 'buy' || contractType === 'gift') {
            calculator.classList.remove('_marry-contract');
            if (subject === 'real-estate') {
                calculator.classList.remove('_share');
            } else if (subject === 'share') {
                calculator.classList.add('_share');
            }
        } else if (contractType === 'marry') {
            calculator.classList.add('_marry-contract');
        }
    }

    function calculate() {
        const cost = costElement.value;
        const contractType = contractTypeElement.value;
        const subject = subjectRadios.find(element => element.checked).value;
        const side = sidesElement.value;
        const relation = relationRadios.find(element => element.checked).value;
        const propertyType = propertyTypeRadios.find(element => element.checked).value;
        const objectsCount = objectsCountElement.value;
        // console.log('Cost value', cost);
        // console.log('Contract type', contractType);
        // console.log('Subject', subject);
        // console.log('Side', side);
        // console.log('Relation', relation);
        // console.log('Property type', propertyType);
        // console.log('Objects count', objectsCount);

        let total = 0;

        if (contractType === 'buy' || contractType === 'gift') {
            if (subject === 'real-estate') {
                // console.log('Calculating property cost');
                total = propertySellCost(cost, propertyType, relation);
            } else if (subject === 'share') {
                // console.log('Calculating share cost');
                total = shareSellCost(cost, side);
            }
        } else if (contractType === 'marry') {
            total = marryContractCost(objectsCount);
        }
        // console.log('Total', total);
        priceElement.textContent = total.toLocaleString('ru') + ' ₽';
    }

    costElement.addEventListener('rangeupdate', calculate);
    objectsCountElement.addEventListener('rangeupdate', calculate);
    contractTypeElement.addEventListener('choose', calculate);
    subjectRadios.forEach(radio => radio.addEventListener('change', calculate));
    subjectRadios.forEach(radio => radio.addEventListener('change', handleActivity));
    contractTypeElement.addEventListener('choose', handleActivity);
    relationRadios.forEach(radio => radio.addEventListener('change', calculate));
    propertyTypeRadios.forEach(radio => radio.addEventListener('change', calculate));
    sidesElement.addEventListener('choose', calculate);

    calculate();
    handleActivity();
}
