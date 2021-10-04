function lagreKunde() {
    console.log("startet");
    const kunde = {
        navn: $("#navn").val(),
        adresse: $("#adresse").val(),
        //tlf: $("#tlf").val(),
        //antall: $("#antall").val()
    }
    console.log(kunde);
    const url = "Kunde/Lagre";
    $.post(url, kunde, function (OK) {
        console.log("startet nåååå");
        if (OK) {
            console.log("lagret");
            window.location.href = 'index.html';
        }
        else {
            console.log("noe feil");
            $("#feil").html("Feil i db - prøv igjen senere");
        }
    });
};