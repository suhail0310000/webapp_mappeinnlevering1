using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MappeInnlevering_1.Models
{
    public class DBInit
    {
        public static void Initialize(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DB>();

                // Oppretter og sletter databasen hver gang den skal seedes
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                //var sted = new Sted { StedsNavn= "Suhail " };

               
                var datoAvgang1 = "05/11/2021";
                //var datoAvgang2 = "10/12/2021";
                //var dato3 = "01/01/2021";

                var tid_1 = "10:00";
                //var tid_2 = "13:00";
                //var tid_3 = "21:00";

                var land1 = "Tyskland";
                var land2 = "Spania";

                var reise1 = new Reise { FraSted = land1, TilSted = land2, Dato = datoAvgang1, avreiseTid= tid_1,  PrisBarn = 100, PrisStudent = 120, PrisVoksen = 200 };

                //var Ordre1 = new Ordre { AntallBarn = 1, AntallStudent= 1, AntallVoksne = 1, TotalPris= 100 };
                //var Ordre2 = new Ordre { AntallBarn = 1, AntallStudent = 1, AntallVoksne = 1, TotalPris = 100 };




                //var kunde1 = new Kunder { Fornavn = "Ole", Etternavn = "Hansen",  Ordre = Ordre1 };
                //var kunde2 = new Kunder { Fornavn = "Line", Etternavn = "Jensen",  Email = "Email2", Poststed = poststed2 };

                //context.Reiser.Add(reise1);
                //context.Kunder.Add(kunde2);

                context.SaveChanges();
            }
        }
    }
}
