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

                // må slette og opprette databasen hver gang når den skalinitieres (seed`es)
                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                var poststed1 = new Ordre { Postnr = "0270", Poststed = "Oslo" };
                var poststed2 = new Ordre { Postnr = "1370", Poststed = "Asker" };

                var kunde1 = new Kunder { Fornavn = "Ole", Etternavn = "Hansen", Adresse = "Olsloveien 82", Email="Email1", Poststed = poststed1 };
                var kunde2 = new Kunder { Fornavn = "Line", Etternavn = "Jensen", Adresse = "Askerveien 72", Email = "Email2", Poststed = poststed2 };

                context.Kunder.Add(kunde1);
                context.Kunder.Add(kunde2);

                context.SaveChanges();
            }
        }
    }
}
