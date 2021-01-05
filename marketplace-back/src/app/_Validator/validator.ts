export class Validator {

    
    public AlphabetOnly(value):Boolean{
        let pattern: RegExp = /^[a-zA-Zé ]*$/;
        return pattern.test(value);
    }
    public NumberDoubleOnly(value):Boolean{
        let pattern: RegExp = /^[0-9.]*$/;
        return pattern.test(value);
    }
    public ListValidation(list:[{name:'',value:''}]):boolean{
        let valid=true;
        list.forEach(element => {
            if(!this.AlphabetOnly(element.name) || element.name==null || !this.AlphabetOnly(element.value) || element.value==null){
                valid=false;
            }
        });
        return valid;
    }
}