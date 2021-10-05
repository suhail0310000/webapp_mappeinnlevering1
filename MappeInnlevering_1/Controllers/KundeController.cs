using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MappeInnlevering_1.Models;
using Microsoft.EntityFrameworkCore;

namespace MappeInnlevering_1.Controllers
{
    [Route("[controller]/[action]")]
    public class KundeController : ControllerBase
    {
        private readonly DB _DB;

        public KundeController(DB Db)
        {
            _DB = Db;
        }

        public async Task<bool> Lagre(Kunde innKunde)
        {
            try
            {
                var nyKundeRad = new Kunder();
                nyKundeRad.Fornavn = innKunde.Fornavn;
                nyKundeRad.Etternavn = innKunde.Etternavn;
                nyKundeRad.Adresse = innKunde.Adresse;

                var sjekkPoststed = await _DB.Poststeder.FindAsync(innKunde.Postnr);
                if (sjekkPoststed == null)
                {
                    var poststedsRad = new Poststeder();
                    poststedsRad.Postnr = innKunde.Postnr;
                    poststedsRad.Poststed = innKunde.Poststed;
                    nyKundeRad.Poststed = poststedsRad;
                }
                else
                {
                    nyKundeRad.Poststed = sjekkPoststed;
                }
                _DB.Kunder.Add(nyKundeRad);
                await _DB.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public async Task<List<Kunde>> HentAlle()
        {
            try
            {
                List<Kunde> alleKunder = await _DB.Kunder.Select(k => new Kunde
                {
                    Id = k.Id,
                    Fornavn = k.Fornavn,
                    Etternavn = k.Etternavn,
                    Adresse = k.Adresse,
                    Postnr = k.Poststed.Postnr,
                    Poststed = k.Poststed.Poststed
                }).ToListAsync();
                return alleKunder;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Slett(int id)
        {
            try
            {
                Kunder enKunde = await _DB.Kunder.FindAsync(id);
                _DB.Kunder.Remove(enKunde);
                await _DB.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }


        public async Task<Kunde> HentEn(int id)
        {
            try
            {
                Kunder enKunde = await _DB.Kunder.FindAsync(id);
                var hentetKunde = new Kunde()
                {
                    Id = enKunde.Id,
                    Fornavn = enKunde.Fornavn,
                    Etternavn = enKunde.Etternavn,
                    Adresse = enKunde.Adresse,
                    Postnr = enKunde.Poststed.Postnr,
                    Poststed = enKunde.Poststed.Poststed
                };
                return hentetKunde;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> Endre(Kunde endreKunde)
        {
            try
            {
                var endreObjekt = await _DB.Kunder.FindAsync(endreKunde.Id);
                if (endreObjekt.Poststed.Postnr != endreKunde.Postnr)
                {
                    var sjekkPostnr = _DB.Poststeder.Find(endreKunde.Postnr);
                    if (sjekkPostnr == null)
                    {
                        var poststedsRad = new Poststeder();
                        poststedsRad.Postnr = endreKunde.Postnr;
                        poststedsRad.Poststed = endreKunde.Poststed;
                        endreObjekt.Poststed = poststedsRad;
                    }
                    else
                    {
                        endreObjekt.Poststed.Postnr = endreKunde.Postnr;
                    }
                }
                endreObjekt.Fornavn = endreKunde.Fornavn;
                endreObjekt.Etternavn = endreKunde.Etternavn;
                endreObjekt.Adresse = endreKunde.Adresse;
                await _DB.SaveChangesAsync();
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
