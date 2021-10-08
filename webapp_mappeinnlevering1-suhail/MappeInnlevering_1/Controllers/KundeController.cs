using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MappeInnlevering_1.Models;
using Microsoft.EntityFrameworkCore;
using MappeInnlevering_1.DAL;
using Microsoft.Extensions.Logging;

namespace MappeInnlevering_1.Controllers
{
    [Route("[controller]/[action]")]
    public class KundeController : ControllerBase
    {
        private readonly IKundeOrdreRepository _DB;
        private readonly ILogger<KundeController> _log;

        public KundeController(IKundeOrdreRepository Db, ILogger<KundeController> log)
        {
            _DB = Db;
            _log = log;
        }

        public async Task<List<Reiser>> GetAlleReiser()
        {
            return await _DB.GetAlleReiser();
        }

        public async Task<List<Sted>> GetAllSteder()
        {
            List<Sted> alleSteder = await _DB.GetAllSteder();
            foreach (var i in alleSteder)
            {
                System.Diagnostics.Debug.WriteLine(i.StedsNavn);
            }
            return alleSteder;
            //return await _DB.GetAllSteder();
        }

        public async Task<List<Sted>> GetAllDestinasjoner(string avgang)
        {
            List<Sted> destinasjon = await _DB.GetAllDestinasjoner(avgang);
            return destinasjon;
        }


        public async Task<ActionResult> Lagre(KundeOrdre innBussBestilling)
        {
            if (ModelState.IsValid)
            {

                bool returOk = await _DB.Lagre(innBussBestilling);
                if (!returOk)
                {
                    _log.LogInformation("Bestilling ble ikke registrert");
                    return BadRequest("Bestilling ble ikke registrert");
                }
                return Ok("Bestilling registrert");
            }
            _log.LogInformation("Feil i inputvalidering");
            return BadRequest("Feil i inputvalidering på server");
        }


        //public async Task<bool> Lagre(KundeOrdre innKunde)
        //{
        //    try
        //    {
        //        var nyKundeRad = new Kunder();
        //        nyKundeRad.Fornavn = innKunde.Fornavn;
        //        nyKundeRad.Etternavn = innKunde.Etternavn;
        //        nyKundeRad.Adresse = innKunde.Adresse;
        //        nyKundeRad.Email = innKunde.Adresse;

        //        var sjekkPoststed = await _DB.Poststeder.FindAsync(innKunde.Postnr);
        //        if (sjekkPoststed == null)
        //        {
        //            var poststedsRad = new Ordre();
        //            poststedsRad.Postnr = innKunde.Postnr;
        //            poststedsRad.Poststed = innKunde.Poststed;
        //            nyKundeRad.Poststed = poststedsRad;
        //        }
        //        else
        //        {
        //            nyKundeRad.Poststed = sjekkPoststed;
        //        }
        //        _DB.Kunder.Add(nyKundeRad);
        //        await _DB.SaveChangesAsync();
        //        return true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}


        //Versjon1 -> orig
        //public async Task<List<KundeOrdre>> HentAlle()
        //{
        //    try
        //    {
        //        List<KundeOrdre> alleKunder = await _DB.Kunder.Select(k => new KundeOrdre
        //        {
        //            Id = k.Id,
        //            Fornavn = k.Fornavn,
        //            Etternavn = k.Etternavn,
        //            Adresse = k.Adresse,
        //            Email = k.Email,
        //            Postnr = k.Poststed.Postnr,
        //            Poststed = k.Poststed.Poststed
        //        }).ToListAsync();
        //        //foreach (var i in alleKunder)
        //        //{
        //        //    System.Diagnostics.Debug.WriteLine(i.Fornavn);
        //        //}
        //        return alleKunder;
        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}

        //Versjon2-> test
        //public async Task<List<Reise>> HentAlle()
        //{
        //    List<Reise> alleTurer = await _DB.Reiser.ToListAsync();
        //    foreach (var i in alleTurer)
        //    {
        //        System.Diagnostics.Debug.WriteLine(i.FraSted);
        //    }
        //    return alleTurer;
        //}

        //public async Task<bool> Slett(int id)
        //{
        //    try
        //    {
        //        Kunder enKunde = await _DB.Kunder.FindAsync(id);
        //        _DB.Kunder.Remove(enKunde);
        //        await _DB.SaveChangesAsync();
        //        return true;
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //}


        //public async Task<KundeOrdre> HentEn(int id)
        //{
        //    try
        //    {
        //        Kunder enKunde = await _DB.Kunder.FindAsync(id);
        //        var hentetKunde = new KundeOrdre()
        //        {
        //            Id = enKunde.Id,
        //            Fornavn = enKunde.Fornavn,
        //            Etternavn = enKunde.Etternavn,
        //            Adresse = enKunde.Adresse,
        //            Email = enKunde.Email,
        //            Postnr = enKunde.Poststed.Postnr,
        //            Poststed = enKunde.Poststed.Poststed
        //        };
        //        return hentetKunde;
        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}

        //public async Task<bool> Endre(KundeOrdre endreKunde)
        //{
        //    try
        //    {
        //        var endreObjekt = await _DB.Kunder.FindAsync(endreKunde.Id);
        //        if (endreObjekt.Poststed.Postnr != endreKunde.Postnr)
        //        {
        //            var sjekkPostnr = _DB.Poststeder.Find(endreKunde.Postnr);
        //            if (sjekkPostnr == null)
        //            {
        //                var poststedsRad = new Ordre();
        //                poststedsRad.Postnr = endreKunde.Postnr;
        //                poststedsRad.Poststed = endreKunde.Poststed;
        //                endreObjekt.Poststed = poststedsRad;
        //            }
        //            else
        //            {
        //                endreObjekt.Poststed.Postnr = endreKunde.Postnr;
        //            }
        //        }
        //        endreObjekt.Fornavn = endreKunde.Fornavn;
        //        endreObjekt.Etternavn = endreKunde.Etternavn;
        //        endreObjekt.Adresse = endreKunde.Adresse;
        //        endreObjekt.Email = endreKunde.Email;
        //        await _DB.SaveChangesAsync();
        //    }
        //    catch
        //    {
        //        return false;
        //    }
        //    return true;
        //}
    }
}
