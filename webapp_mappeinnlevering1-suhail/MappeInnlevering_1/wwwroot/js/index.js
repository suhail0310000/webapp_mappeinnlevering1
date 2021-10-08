$(function () {
    //hentAlleReiser();
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







function beregnPris_HentInfo() {
    let avgangVal = $('#selectAvgang option:selected').val();
    let destinasjonVal = $('#selectDestinasjon option:selected').val();
    let datoVal = $('#selectDato option:selected').val();
    let tidVal = $('#selectTid option:selected').val();
    let antallBarn = $("#antBarnBiletter").val();
    let antallStudent = $("#antStudentBiletter").val();
    let antallVoksne = $("#antVoksenBiletter").val();
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
                console.log("Reise:" +reise);
              
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
                //FIKS PÅ DENNE
                if (antallBarn > 0 && antallVoksne > 0 && antallStudent > 0) {
                    prisTotal = (prisBarn * antallBarn) + (prisVoksen * antallVoksne) + (prisStudent * antallStudent);
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

            let ut = '< tr ><td>' + $('#selectAvgang option:selected').val() + '</td><td class="text-center">' + $('#selectDestinasjon option:selected').val() + '</td><td class="text-center">' + $('#selectDato option:selected').val() + "  " + '</td><td class="text-center">' + $('#selectTid option:selected').val() + '</td><td class="text-center">' + $("#antStudentBiletter").val() + '</td><td class="text-center">' + $("#antVoksenBiletter").val() + '</td><td class="text-center">' + $("#antStudentBiletter").val() + '</td><td class="text-right">' + $("#antVoksenBiletter").val() + '</td> <td class="text-center">' + prisTotal + '</td></tr >'

    //        ut += `<div class="container mt-5 mb-5 d-flex justify-content-center">
    //    <div class="card px-1 py-4">
    //        <div class="card-body">
    //           <h3>Skriv informasjon!</h3>
    //            <div class="row">
    //                <div class="col-sm-12">
    //                    <div class="form-group">
    //                        <!-- <label for="name">Name</label> --> <input class="form-control" type="text" placeholder="Fornavn">
    //                    </div>
    //                </div>
    //                <div class="col-sm-12">
    //                    <div class="form-group">
    //                        <!-- <label for="name">Name</label> --> <input class="form-control" type="text" placeholder="Etternavn">
    //                    </div>
    //                </div>
    //            </div>

    //            <div class=" d-flex flex-column text-center px-5 mt-3 mb-3"> <small class="agree-text">By Booking this appointment you agree to the</small> <a href="#" class="terms">Terms & Conditions</a> </div> <button class="btn btn-primary btn-block confirm-button">Confirm</button>
    //        </div>
    //    </div>
    //</div>`;
           /* document.getElementById("form_1").style.display = "none";*/
            $("#bilettTabell").html(ut);
            console.log("passerer");    
            /*ut += "tester denne";*/
           /* ut += ' <tr> < td > avgangVal</td ><td class="text-center">$10.99</td><td class="text-center">1</td><td class="text-center">1</td><td class="text-center">1</td><td class="text-center">$10.99</td><td class="text-center">1</td><td class="text-right">$10.99</td></tr >'*/
            /*window.location.href = "kvittering.html";*/
            /*formaterTabell();*/
            
            

            //if (antallBarn > 0 && antallVoksne > 0) {
            //    pris = (barnepris * antallBarn) + (voksenpris * antallVoksne);
            //}
            //else if (antallBarn <= 0 && antallVoksne > 0) {
            //    pris = voksenpris * antallVoksne;
            //}
            //else if (antallVoksne <= 0 && antallBarn > 0) {
            //    pris = barnepris * antallBarn;
            //}
            //else {
            //    pris = 0;
            //}
        }

        //let ut = "<table class='table table-striped'><tr>" +
        //    "<tr>Fornavn : </tr>" + $("#fornavn").val() + "<br>" +
        //    "<tr>Etternav : </tr>" + $("#etternavn").val() + "<br>" +
        //    "<tr>Telefonnummer : </tr>" + $("#telefonnr").val() + "<br>" +
        //    "<tr>Epost : </tr>" + $("#epost").val() + "<br>" +
        //    "<tr>Kortnummer : </tr>" + $("#kortnummer").val() + "<br>" +
        //    "<tr><br>" +
        //    "<tr>Antall barn : </tr>" + $("#antallBarn").val() + "<br>" +
        //    "<tr>Antall voksne : </tr>" + $("#antallVoksne").val() + "<br>" +
        //    "<tr>Totalpris : </tr>" + pris + "<br>" +
        //    "<tr>Startstasjon : </tr>" + $("#startstasjon option:selected").val() + "<br>" +
        //    "<tr>Endestasjon : </tr>" + $("#endestasjon option:selected").val() + "<br>" +
        //    "<tr>Dato : </tr>" + $("#datoValgt").val() + "<br>" +
        //    "<tr>Tid : </tr>" + $("#tid option:selected").val() +
        //    "</tr>";
        //ut += "</table>";
        
    });
}

//function formaterTabell(reiser) {
//    console.log("blir kalt på")
//    for (let reise of reiser) {
//        console.log("Ny reise"+reise);
//    }
//}











