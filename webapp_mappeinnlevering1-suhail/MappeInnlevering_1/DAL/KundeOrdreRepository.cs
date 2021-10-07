using MappeInnlevering_1.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MappeInnlevering_1.DAL
{
    public class KundeOrdreRepository : IKundeOrdreRepository
    {
        private readonly DB _DB;

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

        public async Task<List<Sted>> GetAllDestinasjoner(string startStasjonsNavn)
        {
            List<Reiser> alleReiser = await _DB.Reiser.ToListAsync();
            var endeStasjon = new List<Sted>();

            foreach (var reise in alleReiser)
            {
                if (startStasjonsNavn.Equals(reise.FraSted.StedsNavn))
                {
                    endeStasjon.Add(reise.TilSted);
                }
            }
            return endeStasjon;
        }

        //public async Task<List<Reiser>> HentAlle()
        //{
        //    List<Reiser> alleTurer = await _DB.Reiser.ToListAsync();


        //    return alleTurer;
        //}


    }
}
