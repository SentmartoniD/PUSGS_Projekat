using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Models;
using WebApplicationPUSGS.Dto;
using WebApplicationPUSGS.Interfaces;
using WebApplicationPUSGS.Infrastucture;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace WebApplicationPUSGS.Services
{
    public class ArticleServis : IArticleService
    {
        private readonly IMapper _mapper;
        private readonly PUSGSWebAppDbContext _dbContext;

        public ArticleServis(IMapper mapper, PUSGSWebAppDbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public ArticleDto AddArticle(string email, ArticleDto articleDto)
        {
            User user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
            _dbContext.Entry(user).State = EntityState.Detached;
            
  

            Article article = _mapper.Map<Article>(articleDto);
            article.UserSellerId = user.UserId;

            _dbContext.Articles.Add(article);
            _dbContext.SaveChanges();
            return _mapper.Map<ArticleDto>(article);
        }

        public void DeleteArticleById(int id)
        {
            Article article = _dbContext.Articles.Find(id);

            _dbContext.Articles.Remove(article);

            _dbContext.SaveChanges();
        }

        public List<ArticleDto> GetArticlesByEmailForSeller(string email)
        {
            User user = _dbContext.Users.Include(u => u.Articles).FirstOrDefault(u => u.Email == email);

            return _mapper.Map<List<ArticleDto>>(user.Articles);
        }

        public List<ArticleDto> GettArticles()
        {
            return _mapper.Map<List<ArticleDto>>(_dbContext.Articles.ToList()); 
        }

        public ArticleDto UpdateArticle(ArticleDto articleDto)
        {
            Article article = _dbContext.Articles.Find(articleDto.ArticleId);

            if (articleDto.Name != null && articleDto.Name != string.Empty)
                article.Name = articleDto.Name;
            if (articleDto.Price != 0)
                article.Price = articleDto.Price;
            if (articleDto.Description != null && articleDto.Description != string.Empty)
                article.Description = articleDto.Description;
            if (articleDto.Quantity != 0)
                article.Quantity = articleDto.Quantity;
            if (articleDto.Image != null && articleDto.Image != string.Empty)
                article.Image = articleDto.Image;

            _dbContext.SaveChanges();

            return _mapper.Map<ArticleDto>(article);
        }
    }
}
