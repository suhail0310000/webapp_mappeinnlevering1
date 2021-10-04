console.log("hei");


$(function () {
    hentAlleKunder();
});


function hentAlleKunder() {
    $.get("kunde/hentAlle", function (kunder) {
        console.log(kunder);
        formaterKunder(kunder);
    });
}


function formaterKunder(kunder) {
    let ut = "<table class='table table-striped'>" +
        "<tr>" +
        "<th>Navn</th><th>Adresse</th><th>Telefon</th><th>Antall</th>" +
        "</tr>";
    for (let kunde of kunder) {
        ut += "<tr>" +
            "<td>" + kunde.navn + "</td>" +
            "<td>" + kunde.adresse + "</td>" +
            //"<td>" + kunde.tlf + "</td>" +
            //"<td>" + kunde.antall + "</td>" +
            "<td> <a class='btn btn-primary' href='endre.html?id=" + kunde.id + "'>Endre</a></td>" +
            "<td> <button class='btn btn-danger' onclick='slettKunde(" + kunde.id + ")'>Slett</button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#kundene").html(ut);
}

function slettKunde(id) {
    const url = "Kunde/Slett?id=" + id;
    $.get(url, function (OK) {
        if (OK) {
            window.location.href = 'index.html';
        }
        else {
            $("#feil").html("Feil i db - prøv igjen senere");
        }

    });
};