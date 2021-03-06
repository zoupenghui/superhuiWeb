﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Superhui.Web.Areas.Docs.Models;
using System;

namespace Superhui.Web.Migrations
{
    [DbContext(typeof(BlogDbContext))]
    [Migration("20180202074717_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Superhui.Web.Areas.Docs.Models.Blog", b =>
                {
                    b.Property<int>("BlogID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<string>("Content");

                    b.Property<DateTime>("CreateTime");

                    b.Property<bool>("IsPrivate");

                    b.Property<string>("Name");

                    b.HasKey("BlogID");

                    b.ToTable("Blogs");
                });
#pragma warning restore 612, 618
        }
    }
}
