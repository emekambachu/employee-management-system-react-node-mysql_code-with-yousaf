let dateService = {

    getTimeStamp(){
        const currentdate = new Date();

        return `${currentdate.getFullYear()}-${(currentdate.getMonth() + 1).toString().padStart(2, '0')}-` +
            `${currentdate.getDate().toString().padStart(2, '0')} ` +
            `${currentdate.getHours().toString().padStart(2, '0')}:` +
            `${currentdate.getMinutes().toString().padStart(2, '0')}:` +
            `${currentdate.getSeconds().toString().padStart(2, '0')}`;
    }

}

export default dateService;