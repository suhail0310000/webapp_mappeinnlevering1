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
    console.log("Startstasjon: "+avgang);
    const url = "kunde/GetAllDestinasjoner?startStasjonsNavn=" + avgang;
    $.get(url, function (steder) {
        console.log(steder);
        if (steder) {
            const mapUniq = new Set(steder.map(e => JSON.stringify(e)));
            const destinasjonUnik = Array.from(mapUniq).map(e => JSON.parse(e));
            console.log(destinasjonUnik);
            console.log("Unike destinasjoner:    " + destinasjonUnik);

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
    console.log("display dato");
    let ut = "<input class='form-control' type='text' placeholder='(DD/MM/ÅÅÅÅ) -> 07.02.2021' onchange='listTidspunkt()' id='typeDato'>";
    $("#typeDato").html(ut);
}


//function listTidspunkt() {
//    console.log("starter tidspunkt");
//    let dato = $('#datoValgt').val();
//    let startstasjon = $('#startstasjon option:selected').val();
//    let endestasjon = $('#endestasjon option:selected').val();
//    const url = "kunde/GetAlleReiser";
//    $.get(url, function (turer) {
//        if (turer) {
//            /*let ut = "<label>Velg tidspunkt</label>";*/
//            /*let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";*/
//            /*ut += "<option>Velg startstasjon</option>";*/
//            let ut = "<select class='form-control' id='selectTid'>";
//            for (let tur of turer) {
//                if (startstasjon === tur.startStasjon.stasjonsNavn && endestasjon === tur.endeStasjon.stasjonsNavn && dato === tur.dato) {
//                    ut += "<option>" + tur.tid + "</option>";
//                }
//            }
//            ut += "</select>";
//            $("#tid").html(ut);
//            if (document.getElementById('tidspunkt').options.length == 0) {
//                $("#ikkeTurDato").html("Ingen tilgjengelige turer på valgt dato");
//            }
//            else {
//                $("#ikkeTurDato").html("");
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