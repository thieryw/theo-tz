export const fetchTextData = async (url: any)=>{
    return (await (await fetch(url)).text()).split("£££");
};