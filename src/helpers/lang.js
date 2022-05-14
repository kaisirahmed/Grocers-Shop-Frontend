export function localLang() {
    const localLang = localStorage.getItem("localLang");
	//
    if(!localLang) {
        return {
        	lang: 'en'
        };
    }
    if(localLang) {
    	return JSON.parse(localLang);
    }//console.log(JSON.parse(localLang.lang))
}