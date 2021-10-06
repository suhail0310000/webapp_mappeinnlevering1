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



        public async Task<List<Reiser>> HentAlle()
        {
            List<Reiser> alleTurer = await _DB.Reiser.ToListAsync();

            //No needed just for debugging
            foreach (var i in alleTurer)
            {
                System.Diagnostics.Debug.WriteLine(i.FraSted);
            }
            return alleTurer;

        }

        //public async Task<List<Reiser>> HentAlle()
        //{
        //    List<Reiser> alleTurer = await _DB.Reiser.ToListAsync();


        //    return alleTurer;
        //}


    }
}
