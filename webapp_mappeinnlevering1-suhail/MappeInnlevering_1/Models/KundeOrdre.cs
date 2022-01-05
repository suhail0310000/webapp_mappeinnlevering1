using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MappeInnlevering_1.Models
{
    public class KundeOrdre
    {

        [Key]
        [RegularExpression(@"a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public string Fornavn { get; set; }
        [RegularExpression(@"a-zA-ZæøåÆØÅ. \-]{2,20}$")]
        public string Etternavn { get; set; }
        [RegularExpression(@"^[0-9]{4}$")]
        public int AntallBarn { get; set; }
        [RegularExpression(@"^[0-9]{4}$")]
        public int AntallStudent { get; set; }
        [RegularExpression(@"^[0-9]{4}$")]
        public int AntallVoksne { get; set; }
        [RegularExpression(@"^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$")]
        public string Dato { get; set; }
        public string Tid { get; set; }
        public string FraSted { get; set; }

        public string TilSted { get; set; }


    }
}
