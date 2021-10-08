﻿using MappeInnlevering_1.Controllers;
using MappeInnlevering_1.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MappeInnlevering_1.DAL
{
    public class KundeOrdreRepository : IKundeOrdreRepository
    {
        private readonly DB _DB;
        private readonly ILogger<KundeController> _log;

        public KundeOrdreRepository(DB Db)
        {
            _DB = Db;
        }



        //public async Task<List<Reiser>> HentAlle()
        //{
        //    List<Reiser> alleTurer = await _DB.Reiser.ToListAsync();

        //    //No needed just for debugging
        //    foreach (var i in alleTurer)
        //    {
        //        System.Diagnostics.Debug.WriteLine(i.PrisBarn);
        //    }
        //    return alleTurer;

        //}

        public async Task<List<Sted>> GetAllSteder()
        {
            List<Sted> alleStasjoner = await _DB.Steder.ToListAsync();
            foreach (var i in alleStasjoner)
            {
                System.Diagnostics.Debug.WriteLine(i.StedsNavn);
            }
            return alleStasjoner;
        }



        public async Task<List<Reiser>> GetAlleReiser()
        {
            List<Reiser> alleTurer = await _DB.Reiser.ToListAsync();

            //No needed just for debugging
            foreach (var i in alleTurer)
            {
                System.Diagnostics.Debug.WriteLine(i.PrisBarn);
            }
            return alleTurer;

        }

        public async Task<List<Sted>> GetAllDestinasjoner(string avgang)
        {
            List<Reiser> alleReiser = await _DB.Reiser.ToListAsync();
            var endeStasjon = new List<Sted>();

            foreach (var reise in alleReiser)
            {
                if (avgang.Equals(reise.FraSted.StedsNavn))
                {
                    endeStasjon.Add(reise.TilSted);
                }
            }
            return endeStasjon;
        }


        public async Task<bool> Lagre(KundeOrdre innBussBestilling)
        {
            int turID = 0;
            List<Reiser> alleTurer = await _DB.Reiser.ToListAsync();
            foreach (var turen in alleTurer)
            {
                if (innBussBestilling.FraSted.Equals(turen.FraSted.StedsNavn) &&
                    innBussBestilling.TilSted.Equals(turen.TilSted.StedsNavn) &&
                    innBussBestilling.Tid.Equals(turen.Tid) && innBussBestilling.Dato.Equals(turen.Dato))
                {
                    turID = turen.RId;
                }
            }
            Reiser funnetTur = _DB.Reiser.Find(turID);

            double totalpris = (innBussBestilling.AntallBarn * funnetTur.PrisBarn) + (innBussBestilling.AntallVoksne * funnetTur.PrisVoksen);


            int kundeID = 0;
            List<Kunder> alleKunder = await _DB.Kunder.ToListAsync();

            foreach (var kunde in alleKunder)
            {
                if (innBussBestilling.Fornavn.Equals(kunde.Fornavn) &&
                    innBussBestilling.Etternavn.Equals(kunde.Etternavn))
                {
                    kundeID = kunde.KId;
                }
            }
            try
            {
                var nyBestillingRad = new Ordre();
                nyBestillingRad.AntallBarn = innBussBestilling.AntallBarn;
                nyBestillingRad.AntallVoksne = innBussBestilling.AntallVoksne;
                nyBestillingRad.TotalPris = totalpris;
                nyBestillingRad.Reiser = funnetTur;


                Kunder funnetKunde = await _DB.Kunder.FindAsync(kundeID);

                if (funnetKunde == null)
                {
                    var kundeRad = new Kunder();
                    kundeRad.Fornavn = innBussBestilling.Fornavn;
                    kundeRad.Etternavn = innBussBestilling.Etternavn;
                    _DB.Kunder.Add(kundeRad);
                    await _DB.SaveChangesAsync();
                    nyBestillingRad.Kunder = kundeRad;

                }
                else
                {
                    nyBestillingRad.Kunder = funnetKunde;
                }
                _DB.Ordre.Add(nyBestillingRad);
                await _DB.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }
        }

        public async Task<List<Reiser>> HentAlle()
        {
            List<Reiser> alleTurer = await _DB.Reiser.ToListAsync();


            return alleTurer;
        }


    }
}
