$(function () {
    //hentAlleReiser();
    beregnPris_HentInfo();
});

////$(function () {
////    // hent kunden med kunde-id fra url og vis denne i skjemaet

////    const id = window.location.search.substring(1);
////    const url = "Kunde/HentEn?" + id;
////    $.get(url, function (kunde) {
////        $("#id").val(kunde.id); // må ha med id inn skjemaet, hidden i html
////        $("#fornavn").val(kunde.fornavn);
////        $("#etternavn").val(kunde.etternavn);
////        $("#email").val(kunde.email);
////        $("#postnr").val(kunde.postnr);
////        $("#poststed").val(kunde.poststed);
////    });
////});

////function endreKunde() {
////    const kunde = {
////        id: $("#id").val(), // må ha med denne som ikke har blitt endret for å vite hvilken kunde som skal endres
////        fornavn: $("#fornavn").val(),
////        etternavn: $("#etternavn").val(),
////        email: $("#email").val(),
////        postnr: $("#postnr").val(),
////        poststed: $("#poststed").val()
////    };
////    $.post("Kunde/Endre", kunde, function (OK) {
////        if (OK) {
////            window.location.href = 'index.html';
////        }
////        else {
////            $("#feil").html("Feil i db - prøv igjen senere");
////        }
////    });
////}

function beregnPris_HentInfo() {
    let avgangVal = $('#selectAvgang option:selected').val();
    let destinasjonVal = $('#selectDestinasjon option:selected').val();
    let datoVal = $('#selectDato option:selected').val();
    let tidVal = $('#selectTid option:selected').val();
    let antallBarn = $("#antBarnBiletter").val();
    let antallStudent = $("#antStudentBiletter").val();
    let antallVoksne = $("#antVoksenBiletter").val();
    console.log(avgangVal);
    console.log(destinasjonVal);
    console.log(datoVal);
    console.log(tidVal);
    console.log(antallBarn);
    console.log(antallStudent);
    console.log(antallVoksne);
    
    let ut = "";

    let prisTotal;
    let prisBarn = 0;
    let prisStudent = 0;
    let prisVoksen = 0;

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
            document.getElementById("form_1").style.display = "none";
            /*$("#bilettTabell").html(ut);*/
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