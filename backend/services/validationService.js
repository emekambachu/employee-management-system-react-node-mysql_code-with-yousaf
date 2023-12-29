let validationService = {

    missingInputFields(res, inputs, requiredFields){
        const emptyFields = [];
        // Iterate inputs and check if all required fields
        Object.keys(inputs).forEach(key => {
            if(requiredFields.includes(key) && inputs[key].length === 0){
                emptyFields.push(key);
            }
        });

        if(emptyFields.length > 0){
            return {
                success: false,
                message: `Missing fields: ${emptyFields.join(', ')}`
            };
        }
        return true;
    }

}

export default validationService;