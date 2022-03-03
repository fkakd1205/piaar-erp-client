function numberWithCommas(number){
    // let formatedNumber = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    let formatedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formatedNumber;
}

export {
    numberWithCommas
};