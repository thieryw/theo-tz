

export const getCount = (()=>{

    let counter = 0;

    return ()=> counter++;

})();