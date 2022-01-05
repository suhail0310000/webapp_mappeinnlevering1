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



        public async Task<ActionResult<Reiser>> GetAlleReiser()
        {
            //_log.LogInformation("Hallo Loggen!");
            List<Reiser> alleReiser = await _DB.GetAlleReiser();
            return Ok(alleReiser);
        }

        public async Task<ActionResult<Sted>> GetAllSteder()
        {
            List<Sted> alleSteder = await _DB.GetAllSteder();
            //return await _DB.GetAllSteder();
            return Ok(alleSteder);
        }

        public async Task<ActionResult<Sted>> GetAllDestinasjoner(string avgang)
        {
            List<Sted> destinasjon = await _DB.GetAllDestinasjoner(avgang);
            return Ok(destinasjon); 
        }

        public async Task<ActionResult> Lagre(KundeOrdre innOrdre)
        {
            if (ModelState.IsValid)
            {

                bool returOk = await _DB.Lagre(innOrdre);
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

    }
}
