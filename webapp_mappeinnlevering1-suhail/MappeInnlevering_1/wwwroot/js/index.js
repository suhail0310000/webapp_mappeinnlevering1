$(function () {
    //hentAlleReiser();
    HentAlleSteder();
    TotalPrisBilett()
});


function HentAlleSteder() {
    $.get("kunde/GetAllSteder", function (Steder) {
        if (Steder) {
            formaterAvgang(Steder);
        }
        else {
            $("#feil").html("Feil i db, prøv igjen senere");
        }
        //console.log("Kunder" + steder);
    });
}



function formaterAvgang(Steder) {
    let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";
    ut += "<option>Velg startstasjon</option>";
    for (let avgang of Steder) {
        ut += '<option>' + avgang.stedsNavn + '</option>';
        console.log("Alle avganger: " + avgang.stedsNavn);
    }
    ut += "</select>";
    $("#selectAvgang").html(ut);
}


//Fungerer
function GetAllDestinasjoner() {
    let avgang = $('#selectAvgang option:selected').val();
    //console.log("Startstasjon: "+avgang);
    const url = "kunde/GetAllDestinasjoner?startStasjonsNavn=" + avgang;
    $.get(url, function (steder) {
        console.log(steder);
        if (steder) {
            const mapUniq = new Set(steder.map(e => JSON.stringify(e)));
            const destinasjonUnik = Array.from(mapUniq).map(e => JSON.parse(e));
            //console.log(destinasjonUnik);
            //console.log("Unike destinasjoner:    " + destinasjonUnik);

            /*let ut = "<label>Jeg skal reise til</label>";*/
            /*onchange = 'listEndeStasjoner()'*/
            let ut = "<select class='form-control' onchange='displayDato()' id='selectDestinasjon'> ";
            ut += "<option>Velg destinasjon</option>";

            for (let sted of destinasjonUnik) {
                console.log(sted.stedsNavn);
                ut += "<option>" + sted.stedsNavn + "</option>";
            }

            ut += "</select>";
            $("#selectDestinasjon").html(ut);
        } else {
            $("#feil").html("Feil i db");
        }
    });
}


function displayDato() {
    let avgangVal = $('#selectAvgang option:selected').val();
    let destinasjonVal = $('#selectDestinasjon option:selected').val();
    console.log("Avgangval: " + avgangVal);
    console.log("destinasjonVal: " + destinasjonVal);
    const url = "kunde/GetAlleReiser";
    $.get(url, function (reiser) {
        if (reiser) {
            /*let ut = "<label>Velg tidspunkt</label>";*/
            /*let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";*/

            let ut = "<select class='form-control' id='selectDato' onchange='displayTid()'>";
            ut += "<option>Velg dato: </option>";
            for (let reise of reiser) {
                //console.log(tur);
                //console.log(tur.tid);
                console.log("Inne i dato funksjon:");
                console.log("Avgang"+reise.fraSted.stedsNavn);
                console.log("Destinasjon"+reise.tilSted.stedsNavn);

               /* ut += "<option>" + tur.tid + "</option>";*/
 
                if (avgangVal === reise.fraSted.stedsNavn && destinasjonVal === reise.tilSted.stedsNavn) {

                    ut += "<option>" + reise.dato + "</option>";
                }
            }
            ut += "</select>";
            $("#selectDato").html(ut);
            if (document.getElementById('selectDato').options.length == 0) {
                $("#feilDato").html("Ingen tilgjengelige turer denne ruten");
            }
            else {
                $("#feilDato").html("");
            }
        }
        else {
            $("#feil").html("Feil i db");
        }
    });
}




function displayTid() {
    console.log("starter");
    let avgangVal = $('#selectAvgang option:selected').val();
    let destinasjonVal = $('#selectDestinasjon option:selected').val();
    let datoVal = $('#selectDato option:selected').val();
    console.log("INNE I TID FUNKSJON:");
    console.log("Avgangval: " + avgangVal);
    console.log("destinasjonVal: " + destinasjonVal);
    console.log("DatoVal: " + datoVal);
    const url = "kunde/GetAlleReiser";
    $.get(url, function (reiser) {
        if (reiser) {
            /*let ut = "<label>Velg tidspunkt</label>";*/
            /*let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";*/

            let ut = "<select class='form-control' id='selectTid' onchange='displayBiletter()'>";
            ut += "<option>Velg dato: </option>";
            for (let reise of reiser) {
                //console.log(tur.tid);
                console.log("Avgang " + reise.fraSted.stedsNavn);
                console.log("Destinasjon: " + reise.tilSted.stedsNavn);
                console.log("Avreisedato: " + reise.dato);

                /* ut += "<option>" + tur.tid + "</option>";*/
                if (avgangVal === reise.fraSted.stedsNavn && destinasjonVal === reise.tilSted.stedsNavn && datoVal === reise.dato) {
                    ut += "<option>" + reise.tid + "</option>";
                }
            }
            ut += "</select>";
            $("#selectTid").html(ut);
            //if (document.getElementById('selectDato').options.length == 0) {
            //    console.log("skriv ut feil tid");
            //    $("#feilDato").html("Ingen tilgjengelige turer denne ruten");
            //}
            //else {
            //    $("#feilDato").html("");
            //}
        }
        else {
            $("#feil").html("Feil i db");
        }
    });
}

function displayBiletter() {
    console.log("starter bilett funksjon");
    let avgangVal = $('#selectAvgang option:selected').val();
    let destinasjonVal = $('#selectDestinasjon option:selected').val();
    let datoVal = $('#selectDato option:selected').val();
    let tidVal = $('#selectTid option:selected').val();
    console.log("Avgangval: " + avgangVal);
    console.log("destinasjonVal: " + destinasjonVal);
    console.log("DatoVal: " + datoVal);
    console.log("Tid: " + tidVal);
    const url = "kunde/GetAlleReiser";
    $.get(url, function (reiser) {
        if (reiser) {
            /*let ut = "<label>Velg tidspunkt</label>";*/
            /*let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";*/

            let ut = "<select class='form-control' id='selectTid'>";
            ut += "<option>Velg dato: </option>";
            for (let reise of reiser) {
                //console.log(tur.tid);
                console.log("Avgang " + reise.fraSted.stedsNavn);
                console.log("Destinasjon: " + reise.tilSted.stedsNavn);
                console.log("Avreisedato: " + reise.dato);
                console.log("AvreiseTid: " + reise.tid);
                /* ut += "<option>" + tur.tid + "</option>";*/
                if (avgangVal === reise.fraSted.stedsNavn && destinasjonVal === reise.tilSted.stedsNavn && datoVal === reise.dato) {
                    ut += "<option>" + reise.tid + "</option>";
                }
            }
            ut += "</select>";
            $("#selectTid").html(ut);
            //if (document.getElementById('selectDato').options.length == 0) {
            //    console.log("skriv ut feil tid");
            //    $("#feilDato").html("Ingen tilgjengelige turer denne ruten");
            //}
            //else {
            //    $("#feilDato").html("");
            //}
        }
        else {
            $("#feil").html("Feil i db");
        }
    });
}


function TotalPrisBilett() {
    let avgangVal = $('#selectAvgang option:selected').val();
    let destinasjonVal = $('#selectDestinasjon option:selected').val();
    let datoVal = $('#selectDato option:selected').val();
    let tidVal = $('#selectTid option:selected').val();
    let antBarn = $('#antBarnBiletter').val();
    let antVoksne = $('#antStudentBiletter').val();
    let antStudent = $('#antVoksenBiletter').val();

    console.log("Antbarn"+antBarn);
    console.log("Ant voksen"+antVoksne);
    console.log("Ant student"+antStudent);

}








