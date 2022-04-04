class Darbuotojas{
    constructor (
        private _vardas:string,
        private _pavarde:string,
        private _atlyginimas:number
    ){

    }

    get atlyginimas(){
        return this._atlyginimas;
    }
    get vardas(){
        return this._vardas;
    }
    get pavarde(){
        return this._pavarde;
    }

    public gpm(){
        return this._atlyginimas*0.2;
    }
    public psd(){
        return this._atlyginimas*0.0698;
    }
    public vsd(){
        return this._atlyginimas*0.1252;
    }
}

const btnPrideti=document.getElementById("prideti");
const btnIstrinti=document.getElementById("istrinti");

const inpVardas=<HTMLInputElement>document.getElementById("vardas");
const inpPavarde=<HTMLInputElement>document.getElementById("pavarde");
const inpAtlyginimas=<HTMLInputElement>document.getElementById("atlyginimas");
const output=document.getElementById("output");
const outMokesciai=document.getElementById("mokesciai");


const darbuotojaiPvz:Darbuotojas[] = [];
darbuotojaiPvz.push(new Darbuotojas("Jonas", "Jonaitis", 1000));
darbuotojaiPvz.push(new Darbuotojas("Petras", "Petraitis", 900));
darbuotojaiPvz.push(new Darbuotojas("Jonas", "Petraitis", 800));
console.log(darbuotojaiPvz);

let darbuotojai:Darbuotojas[] = [];

let jsonString=localStorage.getItem("darbuotojai");
if (jsonString!=null){
    let data=JSON.parse(jsonString);

    interface dataDarbuotojas{
        _vardas: string; 
        _pavarde: string; 
        _atlyginimas: number; 
    }
    
    data.forEach((obj:dataDarbuotojas) => {
        let darb=new Darbuotojas(obj._vardas, obj._pavarde, obj._atlyginimas);
        darbuotojai.push(darb);
    });
}

let outputDarbuotojai=()=>{
    if (output!=null && outMokesciai!=null){
        output.innerHTML="";
        let gpm=0;
        let psd=0;
        let vsd=0;
        darbuotojai.forEach((darbuotojas, indeksas)=>{
            gpm+=darbuotojas.gpm();
            psd+=darbuotojas.psd();
            vsd+=darbuotojas.vsd();

            const li=document.createElement("li");
            li.className = "list-group-item";
            li.textContent = darbuotojas.vardas + " " + darbuotojas.pavarde + ", atlyginimas: " + darbuotojas.atlyginimas + " EUR";
            
            const btn=document.createElement("button");
            btn.textContent="Ištrinti";
            btn.className="btn btn-danger float-end";
            btn.onclick=()=>{
                deletePreke(indeksas);
                console.log("Ištrynėme: " + darbuotojas.vardas + " " + darbuotojas.pavarde + " " + indeksas);
                
            };
            li.appendChild(btn);

            output.appendChild(li);
        });

        outMokesciai.textContent = "už visus darbuotojus įmonė sumokėjo " + gpm.toFixed(2) + " EUR GPM, " + vsd.toFixed(2) + " EUR VSD ir " + psd.toFixed(2) + " EUR PSD mokesčių";
    }  
};

let deletePreke=(indeksas:number)=>{
    darbuotojai.splice(indeksas,1);
    outputDarbuotojai();
    localStorage.setItem("darbuotojai",JSON.stringify(darbuotojai));
}

if (btnPrideti!=null){
    btnPrideti.onclick=()=>{
        darbuotojai.push(new Darbuotojas(inpVardas.value, inpPavarde.value, inpAtlyginimas.valueAsNumber));
        outputDarbuotojai(); 
        localStorage.setItem("darbuotojai",JSON.stringify(darbuotojai));
    };
}

if (btnIstrinti!=null){
    btnIstrinti.onclick=()=>{
        localStorage.removeItem("darbuotojai");
        darbuotojai=[];
        outputDarbuotojai();
    }
}

outputDarbuotojai();