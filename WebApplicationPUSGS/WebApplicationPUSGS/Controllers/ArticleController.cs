using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Dto;
using Microsoft.AspNetCore.Authorization;
using WebApplicationPUSGS.Interfaces;

namespace WebApplicationPUSGS.Controllers
{
    [Route("api/articles")]
    [ApiController]
    public class ArticleController : ControllerBase
    {
        private readonly IArticleService _articleService;

        public ArticleController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpPost("add")]
        [Authorize(Roles = "seller")]
        public ActionResult CreateArticle([FromBody] ArticleDto articleDto) {
            try
            {
                return Ok(_articleService.AddArticle(articleDto));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message + "Internal server error!");
            }
        }

        [HttpGet]
        [Authorize(Roles = "seller, buyer")]
        public ActionResult GetArticles() {
            try
            {
                return Ok(_articleService.GettArticles());
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error!");
            }
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "seller")]
        public ActionResult DeleteArticle(int id) {
            try
            {
                _articleService.DeleteArticleById(id);
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error!");
            }
        }

        [HttpPatch("update")]
        [Authorize(Roles = "seller")]
        public ActionResult UpdateArticle([FromBody] ArticleDto articleDto) {
            try
            {
                return Ok(_articleService.UpdateArticle(articleDto));
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error!");
            }
        }
    }
}
