using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MappeInnlevering_1.Models
{
    public class KundeOrdre
    {
        public int Id { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }

        public string Email { get; set; }
        public string Adresse { get; set; }
        public string Postnr { get; set; }
        public string Poststed { get; set; }
    }
}
