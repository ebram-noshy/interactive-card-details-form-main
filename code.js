var lastInput = "";

function handleInputChange(element) {
    const fieldName = element.dataset.field;
    var fieldValue = element.value;
    
    if (fieldName == 'CardNumber')
    {
        var isDeleting = false;
        var newFieldValue = "";

        fieldValue = fieldValue.replace(/\s/g, '');
        if (fieldValue.length == 16)
            document.querySelector('*[data-field="Month"]').focus();

        if (fieldValue.length > 16)
            fieldValue = fieldValue.substring(0, 16);
        if (fieldValue.length < lastInput.length)
            isDeleting = true;
        lastInput = fieldValue;

        for (let i = 0; i < fieldValue.length; i++) {
            newFieldValue += fieldValue[i];
            if (i % 4 == 3 && i != 15 && i != fieldValue.length - 1)
                newFieldValue += " ";
        }

        if (isDeleting && newFieldValue.lastIndexOf(" ") == (newFieldValue.length - 1))
            newFieldValue = newFieldValue.substring(0, newFieldValue.length - 1);

        fieldValue = newFieldValue;
        
        document.querySelector('*[data-field="' + fieldName + '"]').value = fieldValue;
    }

    if (fieldName == 'Month' || fieldName == 'Year')
    {
        if (fieldValue.length == 2)
        {
            if (fieldName == 'Month')
                document.querySelector('*[data-field="Year"]').focus();
            
            if (fieldName == 'Year')
                document.querySelector('*[data-field="CVC"]').focus();
        }
        if (fieldValue.length > 2)
            fieldValue = fieldValue.substring(0, 2);

        document.querySelector('*[data-field="' + fieldName + '"]').value = fieldValue;
    }

    if (fieldName == 'CVC')
    {
        if (fieldValue.length > 3)
            fieldValue = fieldValue.substring(0, 3);

        document.querySelector('*[data-field="' + fieldName + '"]').value = fieldValue;
    }
    
    if (fieldValue == '')
    {
        if (fieldName == 'CardNumber')
            fieldValue = '0000 0000 0000 0000';
        else if (fieldName == 'Month' || fieldName == 'Year')
            fieldValue = '00';
        else if (fieldName == 'CVC')
            fieldValue = '000';
    }
    document.querySelector('*[data-display="' + fieldName + '"]').innerText = fieldValue;
    validateInputs();
}

function validateInputs()
{
    var fieldName;
    var fieldValue;
    var OnlyNumbersError = "";

    document.querySelectorAll('input').forEach(element => {
        fieldName = element.dataset.field;
        fieldValue = element.value;

        if (fieldName != 'Name')
        {
            OnlyNumbersError = "";
            fieldValue = fieldValue.replace(/\s/g, '');
            if (/^\d*$/.test(fieldValue) == false)
                OnlyNumbersError = 'Wrong format, numbers only';

            element.setCustomValidity(OnlyNumbersError);
            if (fieldName == 'Year' && OnlyNumbersError != "")
                fieldName = 'Month';
                
            if (document.querySelector('*[data-error-field="' + fieldName + '"]') != null)
                document.querySelector('*[data-error-field="' + fieldName + '"]').innerText = OnlyNumbersError;
        }
    });
}

function validateBlankInputs()
{
    var fieldName;
    var fieldValue;
    var error = "";

    document.querySelectorAll('input').forEach(element => {
        error = "";
        fieldName = element.dataset.field;
        fieldValue = element.value;

        if (fieldValue == null || fieldValue == '')
            error = 'Can\'t be blank';

        element.setCustomValidity(error);
        if (fieldName == 'Year' && error != "")
            fieldName = 'Month';
        if (document.querySelector('*[data-error-field="' + fieldName + '"]') != null)
                document.querySelector('*[data-error-field="' + fieldName + '"]').innerText = error;
    });
}

function validateBlankInput(element)
{
    var error = "";
    var fieldName = element.dataset.field;
    var fieldValue = element.value;
    console.log('onchange - fieldName: ', fieldName);

    if (fieldValue == null || fieldValue == '')
        error = 'Can\'t be blank';

    element.setCustomValidity(error);
    if (fieldName == 'Year' && error != "")
        fieldName = 'Month';
    
    console.log('onchange - document.querySelector: ', document.querySelector('*[data-error-field="' + fieldName + '"]'));
    if (document.querySelector('*[data-error-field="' + fieldName + '"]') != null)
            document.querySelector('*[data-error-field="' + fieldName + '"]').innerText = error;
}

function submitForm()
{
    validateBlankInputs();

    var allValid = true;
    document.querySelectorAll('input').forEach(element => {
        if (!element.checkValidity())
            allValid &= false;
    });

    if (!allValid)
        return;

    document.getElementById('form-inputs').style.display = 'none';
    document.getElementById('form-complete').style.display = 'flex';
}