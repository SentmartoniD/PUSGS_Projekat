using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Dto;

namespace WebApplicationPUSGS.Interfaces
{
    public interface IArticleService
    {
        ArticleDto AddArticle(string email, ArticleDto articleDto);

        List<ArticleDto> GettArticles();

        List<ArticleDto> GetArticlesByEmailForSeller(string email);

        void DeleteArticleById(int id);

        ArticleDto UpdateArticle(ArticleDto articleDto);
    }
}
