using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;
using WebApplicationPUSGS.Dto;
using AutoMapper;

namespace WebApplicationPUSGS.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDtoRegistration>().ReverseMap();
            CreateMap<User, UserDtoLogin>().ReverseMap();
            CreateMap<User, UserDtoApprovedVerified>().ReverseMap();
            CreateMap<Article, ArticleDto>().ReverseMap();
        }
    }
}
