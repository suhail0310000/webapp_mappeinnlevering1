﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MappeInnlevering_1.Models
{
    public class Kunder
    {
        public int Id { get; set; }
        public string Fornavn { get; set; }
        public string Etternavn { get; set; }
        virtual public Ordre Ordre { get; set; } //skriver virtual for å få med Poststeder klassen
    }

    public class Ordre
    {
        [Key] //generert en autoinkrement automatisk
        [DatabaseGenerated(DatabaseGeneratedOption.None)] //Sikrer at vi ike får autoinkrement på den
        public int AntallBarn { get; set; }
        public int AntallStudent { get; set; }
        public int AntallVoksne { get; set; }
        public double TotalPris { get; set; }

        //virtual public Kunder Kunde { get; set; }

    }

    //public class Reise
    //{
    //    [Key] //generert en autoinkrement automatisk
    //    [DatabaseGenerated(DatabaseGeneratedOption.None)] //Sikrer at vi ike får autoinkrement på den
    //    public string FraSted { get; set; }
    //    public string TilSted { get; set; }
    //    public string Dato { get; set; }

    //    public string Tid { get; set; }
    //    public double PrisBarn { get; set; }
    //    public double PrisVoksen { get; set; }
    //    public double PrisStudent { get; set; }

    //}

    public class DB : DbContext
    {
        public DB(DbContextOptions<DB> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Kunder> Kunder { get; set; }
        public DbSet<Ordre> Poststeder { get; set; }

        public DbSet<Reise> Reiser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // må importere pakken Microsoft.EntityFrameworkCore.Proxies
            // og legge til"viritual" på de attriuttene som ønskes å lastes automatisk (LazyLoading)
            optionsBuilder.UseLazyLoadingProxies();
        }
    }


}
