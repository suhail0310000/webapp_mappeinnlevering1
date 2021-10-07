$(function () {
    //hentAlleReiser();
    HentAlleSteder();
});
//console.log(hentAlleKunder());
//function hentAlleReiser() {
//    $.get("kunde/GetAlleReiser", function (Reiser) {
//        console.log(Reiser);
//        for (let reise of Reiser) {
//            console.log(reise.fraSted.stedsNavn);
//        }
//        //formaterKunder(kunder);
//        //console.log("Kunder" + kunder);
//    });
//}

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
    $.get(url, function (turer) {
        if (turer) {
            /*let ut = "<label>Velg tidspunkt</label>";*/
            /*let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";*/

            let ut = "<select class='form-control' id='selectDato' onchange='displayTid()'>";
            ut += "<option>Velg dato: </option>";
            for (let tur of turer) {
                //console.log(tur);
                //console.log(tur.tid);
                console.log("Inne i dato funksjon:");
                console.log("Avgang"+tur.fraSted.stedsNavn);
                console.log("Destinasjon"+tur.tilSted.stedsNavn);

               /* ut += "<option>" + tur.tid + "</option>";*/
 
                if (avgangVal === tur.fraSted.stedsNavn && destinasjonVal === tur.tilSted.stedsNavn) {

                    ut += "<option>" + tur.dato + "</option>";
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
    $.get(url, function (turer) {
        if (turer) {
            /*let ut = "<label>Velg tidspunkt</label>";*/
            /*let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";*/

            let ut = "<select class='form-control' id='selectTid' onchange='displayBiletter()'>";
            ut += "<option>Velg dato: </option>";
            for (let tur of turer) {
                //console.log(tur.tid);
                console.log("Avgang " + tur.fraSted.stedsNavn);
                console.log("Destinasjon: " + tur.tilSted.stedsNavn);
                console.log("Avreisedato: " + tur.dato);

                /* ut += "<option>" + tur.tid + "</option>";*/
                if (avgangVal === tur.fraSted.stedsNavn && destinasjonVal === tur.tilSted.stedsNavn && datoVal === tur.dato) {
                    ut += "<option>" + tur.tid + "</option>";
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
    $.get(url, function (turer) {
        if (turer) {
            /*let ut = "<label>Velg tidspunkt</label>";*/
            /*let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";*/

            let ut = "<select class='form-control' id='selectTid'>";
            ut += "<option>Velg dato: </option>";
            for (let tur of turer) {
                //console.log(tur.tid);
                console.log("Avgang " + tur.fraSted.stedsNavn);
                console.log("Destinasjon: " + tur.tilSted.stedsNavn);
                console.log("Avreisedato: " + tur.dato);
                console.log("AvreiseTid: " + tur.tid);
                /* ut += "<option>" + tur.tid + "</option>";*/
                if (avgangVal === tur.fraSted.stedsNavn && destinasjonVal === tur.tilSted.stedsNavn && datoVal === tur.dato) {
                    ut += "<option>" + tur.tid + "</option>";
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



//function displayDato() {
//    console.log("display dato");
//    let ut = "<input class='form-control' type='text' placeholder='(DD/MM/ÅÅÅÅ) -> 07.02.2021' onchange='listTidspunkt()' id='typeDato'>";
//    $("#typeDato").html(ut);
//}


//function listTidspunkt() {
//    console.log("starter tidspunkt");
//    let avgangVal = $('#selectAvgang option:selected').val();
//    let destinasjonVal = $('#selectDestinasjon option:selected').val();
//    let datoVal = $('#typeDato').val();
//    console.log("Avgangval: " + avgangVal);
//    console.log("destinasjonVal: " + destinasjonVal);
//    console.log("datoVal:"+datoVal);
//    const url = "kunde/GetAlleReiser";
//    $.get(url, function (turer) {
//        if (turer) {
//            /*let ut = "<label>Velg tidspunkt</label>";*/
//            /*let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";*/
            
//            let ut = "<select class='form-control' id='selectTid'>";
//            ut += "<option>Velg startstasjon</option>";
//            for (let tur of turer) {
//                console.log(tur);
//                console.log(tur.tid);

//                ut += "<option>" + tur.tid + "</option>";

//                //if (startstasjon === tur.startStasjon.stasjonsNavn && endestasjon === tur.endeStasjon.stasjonsNavn && dato === tur.dato) {
//                //    ut += "<option>" + tur.tid + "</option>";
//                //}
//            }
//            ut += "</select>";
//            $("#selectTid").html(ut);
//            if (document.getElementById('selectTid').options.length == 0) {
//                console.log("skriv ut feil tid");
//                $("#feilTid").html("Ingen tilgjengelige turer på valgt dato");
//            }
//            else {
//                $("#feilTid").html("");
//            }
//        }
//        else {
//            $("#feil").html("Feil i db");
//        }
//    });
//}











//function formaterKunder(kunder) {
//    let ut = "<table class='table table-striped'>" +
//        "<tr>" +
//        "<th>Fornavn</th><th>Etternavn</th><th>Email</th><th>Postnr</th><th>Poststed</th><th></th><th></th>" +
//        "</tr>";
//    for (let kunde of kunder) {
//        console.log(kunde.FraSted)
//        ut += "<tr>" +
//            "<td>" + kunde.fornavn + "</td>" +
//            "<td>" + kunde.etternavn + "</td>" +
//            "<td>" + kunde.email+ "</td>" +
//            "<td>" + kunde.postnr + "</td>" +
//            "<td>" + kunde.poststed + "</td>" +
//            "<td> <a class='btn btn-primary' href='endre.html?id=" + kunde.id + "'>Endre</a></td>" +
//            "<td> <button class='btn btn-danger' onclick='slettKunde(" + kunde.id + ")'>Slett</button></td>" +
//            "</tr>";
//    }
//    ut += "</table>";
//    $("#kundene").html(ut);
//}

//function slettKunde(id) {
//    const url = "Kunde/Slett?id=" + id;
//    $.get(url, function (OK) {
//        if (OK) {
//            window.location.href = 'index.html';
//        }
//        else {
//            $("#feil").html("Feil i db - prøv igjen senere");
//        }

//    });
//}