using MappeInnlevering_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MappeInnlevering_1.DAL
{
    public interface IKundeOrdreRepository
    {
        //Task<List<Reise>> HentAlle();

        Task<List<Reiser>> GetAlleReiser();
        Task<List<Sted>> GetAllSteder();

        Task<List<Sted>> GetAllDestinasjoner(string avgang);
        Task<bool> Lagre(KundeOrdre innOrdre);
    }
}
