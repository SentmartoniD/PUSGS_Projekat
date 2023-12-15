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
using Microsoft.AspNetCore.Http;
using System.IO;

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

            if (user == null)
                throw new Exception();

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
            /*
            if (article == null)
                throw new Exception();*/

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

        public List<ArticleDto> GettArticlesForCart(List<int> articleIds)
        {
            List<Article> Articles = _dbContext.Articles.Include(a => a.UserSeller).Where(x => articleIds.Contains(x.ArticleId)).ToList();

            return _mapper.Map<List<ArticleDto>>(Articles);
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
            if (articleDto.ImageFile != null)
                article.ImageFile = articleDto.ImageFile;

            _dbContext.SaveChanges();

            return _mapper.Map<ArticleDto>(article);
        }

        public bool UploadImage(IFormFile file, int id)
        {
            bool rez = true;

            Article article = _dbContext.Articles.FirstOrDefault(u => u.ArticleId == id);

            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                article.ImageFile = memoryStream.ToArray();
            }

            _dbContext.SaveChanges();

            return rez;
        }
    }
}
