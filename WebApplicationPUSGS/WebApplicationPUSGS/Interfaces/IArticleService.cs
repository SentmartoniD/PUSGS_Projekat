using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Dto;

namespace WebApplicationPUSGS.Interfaces
{
    public interface IArticleService
    {
        ArticleDto AddArticle(ArticleDto articleDto);

        List<ArticleDto> GettArticles();

        void DeleteArticleById(int id);

        ArticleDto UpdateArticle(ArticleDto articleDto);
    }
}
