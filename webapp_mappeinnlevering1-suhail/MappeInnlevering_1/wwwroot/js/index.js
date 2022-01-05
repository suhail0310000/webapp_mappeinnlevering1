$(function () {
    HentAlleSteder();
});


function HentAlleSteder() {
    $.get("kunde/GetAllSteder", function (Steder) {
        if (Steder) {
            formaterAvgang(Steder);
        }
        else {
            $("#feil").html("Feil i db, prøv igjen senere");
        }
    });
}



function formaterAvgang(Steder) {
    let ut = "<select class='form-control' onchange='GetAllDestinasjoner()' id='selectAvgang'> ";
    ut += "<option>Velg avgang</option>";
    for (let avgang of Steder) {
        ut += '<option>' + avgang.stedsNavn + '</option>';
        console.log("Alle avganger: " + avgang.stedsNavn);
    }
    ut += "</select>";
    $("#selectAvgang").html(ut);
}

function GetAllDestinasjoner() {
    let avgang = $('#selectAvgang option:selected').val();
    const url = "kunde/GetAllDestinasjoner?avgang=" + avgang;
    $.get(url, function (steder) {
        console.log(steder);
        if (steder) {
            const mapUniq = new Set(steder.map(e => JSON.stringify(e)));
            const destinasjonUnik = Array.from(mapUniq).map(e => JSON.parse(e));

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

            let ut = "<select class='form-control' id='selectDato' onchange='displayTid()'>";
            ut += "<option>Velg dato: </option>";
            for (let reise of reiser) {

                console.log("Inne i dato funksjon:");
                console.log("Avgang" + reise.fraSted.stedsNavn);
                console.log("Destinasjon" + reise.tilSted.stedsNavn);


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
            let ut = "<select class='form-control' id='selectTid' onchange='displayBiletter()'>";
            ut += "<option>Velg dato: </option>";
            for (let reise of reiser) {
                console.log("Avgang " + reise.fraSted.stedsNavn);
                console.log("Destinasjon: " + reise.tilSted.stedsNavn);
                console.log("Avreisedato: " + reise.dato);

                if (avgangVal === reise.fraSted.stedsNavn && destinasjonVal === reise.tilSted.stedsNavn && datoVal === reise.dato) {
                    ut += "<option>" + reise.tid + "</option>";
                }
            }
            ut += "</select>";
            $("#selectTid").html(ut);
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
            let ut = "<select class='form-control' id='selectTid'>";
            ut += "<option>Velg dato: </option>";
            for (let reise of reiser) {
                console.log("Avgang " + reise.fraSted.stedsNavn);
                console.log("Destinasjon: " + reise.tilSted.stedsNavn);
                console.log("Avreisedato: " + reise.dato);
                console.log("AvreiseTid: " + reise.tid);
                if (avgangVal === reise.fraSted.stedsNavn && destinasjonVal === reise.tilSted.stedsNavn && datoVal === reise.dato) {
                    ut += "<option>" + reise.tid + "</option>";
                }
            }
            ut += "</select>";
            $("#selectTid").html(ut);
        }
        else {
            $("#feil").html("Feil i db");
        }
    });
}

function beregnPris_HentInfo() {
    let avgangVal = $('#selectAvgang option:selected').val();
    let destinasjonVal = $('#selectDestinasjon option:selected').val();
    let datoVal = $('#selectDato option:selected').val();
    let tidVal = $('#selectTid option:selected').val();
    let antBarn = $("#antBarnBiletter").val();
    let antStudent = $("#antStudentBiletter").val();
    let antVoksne = $("#antVoksenBiletter").val();
    let ut = "";
    console.log("fungerer");
    let prisTotal;
    let prisBarn = 0;
    let prisStudent = 0;
    let prisVoksen = 0;
    console.log("inne i beregnpris");

    const url = "kunde/GetAlleReiser";
    $.get(url, function (reiser) {
        if (reiser) {
            console.log(reiser);
            for (let reise of reiser) {
                console.log("Reise:" + reise);

                console.log("sjekk om info stemmer:");
                console.log(avgangVal + " = " + reise.fraSted.stedsNavn);
                console.log(destinasjonVal + " = " + reise.tilSted.stedsNavn);
                console.log(datoVal + " = " + reise.dato);
                console.log(tidVal + " = " + reise.tid);


                if (avgangVal === reise.fraSted.stedsNavn && destinasjonVal === reise.tilSted.stedsNavn && datoVal === reise.dato && tidVal === reise.tid) {

                    console.log("Pris barn: " + reise.prisBarn);
                    console.log("Pris student: " + reise.prisStudent);
                    console.log("Pris voksen: " + reise.prisVoksen);

                    prisBarn = reise.prisBarn;
                    prisStudent = reise.prisStudent;
                    prisVoksen = reise.prisVoksen;


                }
                if (antBarn > 0 && antVoksne > 0 && antStudent > 0) {
                    prisTotal = (prisBarn * antBarn) + (prisVoksen * antVoksne) + (prisStudent * antStudent);
                    $("#feil").html(prisTotal);
                } else if (antBarn == 0 && antVoksne > 0 && antStudent > 0) {
                    prisTotal = (prisVoksen * antVoksne) + (prisStudent * antStudent);
                    console.log(totalPris);
                } else if (antBarn == 0 && antVoksne == 0 && antStudent > 0) {
                    prisTotal = (prisStudent * antStudent);
                    console.log(totalPris);
                } else if (antBarn > 0 && antVoksne > 0 && antStudent == 0) {
                    prisTotal = (prisBarn * antBarn) + (prisVoksen * antVoksne);
                    console.log(totalPris);
                } else if (antBarn == 0 && antVoksne > 0 && antStudent == 0) {
                    prisTotal = (prisVoksen * antVoksne);
                    console.log(totalPris);
                } else if (antBarn > 0 && antVoksne == 0 && antStudent == 0) {
                    prisTotal = (prisBarn * antbarn);
                    console.log(totalPris);
                } else {
                    totalPris = 0;
                }
            }
            ut += '< tr ><td>' + $('#selectAvgang option:selected').val() + '</td><td class="text-center">' + $('#selectDestinasjon option:selected').val() + '</td><td class="text-center">' + $('#selectDato option:selected').val() + "  " + '</td><td class="text-center">' + $('#selectTid option:selected').val() + '</td> ' + '<td class="text-center">' + $("#antBarnBiletter").val() + '</td>' + '<td class="text-center">' + $("#antStudentBiletter").val() + '</td><td class="text-center">' + $("#antVoksenBiletter").val() + '</td> <td class="text-center">' + prisTotal + '</td></tr >'
            //ut+= '< tr ><td>' + $('#selectAvgang option:selected').val() + '</td><td class="text-center">' + $('#selectDestinasjon option:selected').val() + '</td><td class="text-center">' + $('#selectDato option:selected').val() + "  " + '</td><td class="text-center">' + $('#selectTid option:selected').val() + '</td><td class="text-center">' + $("#antStudentBiletter").val() + '</td><td class="text-center">' + $("#antVoksenBiletter").val() + '</td><td class="text-center">' + $("#antStudentBiletter").val() + '</td><td class="text-right">' + $("#antVoksenBiletter").val() + '</td> <td class="text-center">' + prisTotal + '</td></tr >'

            $("#bilettTabell").html(ut);

        }


    });
}


function fullførOrdre() {
    const ordre = {
        FraSted: $('#selectAvgang option:selected').val(),
        TilSted: $('#selectDestinasjon option:selected').val(),
        dato: $('#selectDato option:selected').val(),
        tid: $('#selectTid option:selected').val(),
        Fornavn: $("#inpFornavn").val(),
        Etternavn: $("#inpEtternavn").val(),
        AntallBarn: $("#antBarnBiletter").val(),
        AntallStudent: $("#antStudentBiletter").val(),
        AntallVoksne: $("#antVoksenBiletter").val()
    }

   
    const url = "Kunde/Lagre";
    $.post(url, ordre, function () {
        window.location.href = 'index.html';
        /formaterAlertSucsess();/
        alert("Takk for din bestilling, " + $("#inpFornavn").val() + " Vi gleder oss til å ha med deg på tur hos oss på Line");
    })
        .fail(function () {
            $("#feil").html("Feil på server - prøv igjen senere");
        });
}













