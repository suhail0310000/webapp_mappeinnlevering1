function validerAvgang() {
    const nullAvgang = $('#selectAvgang option:selected').val();
    if (nullAvgang === "Velg startstasjon") {
        $("#feilAvgang").html("Du er nødt til å velge en avgang");
        return false;
    }
    else {
        $("#feilAvgang").html("");
        return true;
    }
}

function validerDestinasjon() {
    const nullDestinasjon = $('#selectDestinasjon option:selected').val();
    if (nullDestinasjon === "Velg destinasjon") {
        $("#feilDestinasjon").html("Du er nødt til å velge en destinasjon");
        return false;
    }
    else {
        $("#feilDestinasjon").html("");
        return true;
    }
}

function validerDato(selectDato) {
    const nullDato = $('#selectDato option:selected').val();
    if (nullDato === "Velg dato:") {
        $("#feilDato").html("Du er nødt til å velge en dato");
        return false;
    }
    else {
        $("#feilDato").html("");
        return true;
    }
}

function validerTid(selectTid) {
    const feilTid = $('#selectTid option:selected').val();
    if (feilTid === "Velg tid:") {
        $("#feilTid").html("Du er nødt til å velge en tid");
        return false;
    }
    else {
        $("#feilTid").html("");
        return true;
    }
}

function validerFornavn(inpFornavn) {
    const regexp = /^[a-zA-ZæøåÆØÅ\.\-]{2,20}$/;
    const ok =regexp.test(inpFornavn)
    if (!ok) {
        $("#feilFornavn").html("Fornavnet må bestå av 2 til 20 bokstaver");
        return false;
    }
    else {
        $("#feilFornavn").html("");
        return true;
    }
}

function validerEtternavn(inpEtternavn) {
    const regexp = /^[a-zA-ZæøåÆØÅ\.\-]{2,20}$/;
    const ok = regexp.test(inpEtternavn)
    if (!ok) {
        $("#feilEtternavn").html("Etternavnet må bestå av 2 til 20 bokstaver");
        return false;
    }
    else {
        $("#feilEtternavn").html("");
        return true;
    }


}

function validerAntBarn(antBarnBiletter) {
    const feilAntBarn = $('#antBarnBiletter option:selected').val();
    if (feilAntBarn === "Velg antall") {
        $("#feilAntBarn").html("Du er nødt til å velge antall barn");
        return false;
    }
    else {
        $("#feilAntBarn").html("");
        return true;
    }
}

function validerAntVoksne(antVoksenBiletter) {
    const feilAntVoksne = $('#antVoksenBiletter option:selected').val();
    if (feilAntVoksne === "Velg antall") {
        $("#feilAntVoksne").html("Du er nødt til å velge antall voksne");
        return false;
    }
    else {
        $("#feilAntVoksne").html("");
        return true;
    }
}

function validerAntStudent(antStudentBiletter) {
    const feilAntStudent = $('#antStudentBiletter option:selected').val();
    if (feilAntStudent === "Velg antall") {
        $("#feilAntStudent").html("Du er nødt til å velge antall studenter");
        return false;
    }
    else {
        $("#feilAntStudent").html("");
        return true;
    }
}