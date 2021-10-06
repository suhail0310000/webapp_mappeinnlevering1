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


                //var datoAvgang1 = "05/11/2021";
                //var datoAvgang2 = "10/12/2021";
                //var dato3 = "01/01/2021";

                //var tid_1 = "10:00";
                //var tid_2 = "13:00";
                //var tid_3 = "21:00";

                //var land1 = "Tyskland";
                //var land2 = "Spania";

                //STEDER
                var Sted1 = new Sted { StedsNavn = "Oslo" };
                var Sted2 = new Sted { StedsNavn = "Kiel" };
                var Sted3 = new Sted { StedsNavn = "København" };

                context.Steder.Add(Sted1);
                context.Steder.Add(Sted2);
                context.Steder.Add(Sted3);


                //DATO
                string dato1 = "07.02.2021";
                string dato2 = "20.05.2021";
                //string dato3 = "31.09.2021";

                //TID
                string tid1 = "08:00";
                string tid2 = "12:00";
                //string tid3 = "18:00";

                //opprett reise
                var reise1 = new Reiser { FraSted = Sted1, TilSted = Sted2, Dato = dato1, Tid = tid1, PrisBarn = 100, PrisStudent = 120, PrisVoksen = 200 };
                var reise2 = new Reiser { FraSted = Sted2, TilSted = Sted3, Dato = dato2, Tid = tid2, PrisBarn = 100, PrisStudent = 120, PrisVoksen = 200 };
                //var Ordre1 = new Ordre { AntallBarn = 1, AntallStudent= 1, AntallVoksne = 1, TotalPris= 100 };
                //var Ordre2 = new Ordre { AntallBarn = 1, AntallStudent = 1, AntallVoksne = 1, TotalPris = 100 };




                //var kunde1 = new Kunder { Fornavn = "Ole", Etternavn = "Hansen",  Ordre = Ordre1 };
                //var kunde2 = new Kunder { Fornavn = "Line", Etternavn = "Jensen",  Email = "Email2", Poststed = poststed2 };

                context.Reiser.Add(reise1);
                context.Reiser.Add(reise2);

                //context.Kunder.Add(kunde2);

                context.SaveChanges();
            }
        }
    }
}
