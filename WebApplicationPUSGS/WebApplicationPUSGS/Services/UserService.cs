﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplicationPUSGS.Dto;
using WebApplicationPUSGS.Interfaces;
using WebApplicationPUSGS.Models;
using WebApplicationPUSGS.Infrastucture;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Cryptography;

namespace WebApplicationPUSGS.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly PUSGSWebAppDbContext _dbContext;
        private readonly IConfigurationSection _secretKey;

        public UserService(IMapper mapper, PUSGSWebAppDbContext dbContext, IConfiguration config)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = config.GetSection("SecretKey");
        }

        public UserDtoRegistration AddUser(UserDtoRegistration newUser) {
            if (_dbContext.Users.Any(u => u.Email == newUser.Email))
                throw new Exception("Email already in use!");
            if (_dbContext.Users.Any(u => u.Username == newUser.Username))
                throw new Exception("Username already in use!");

            User user = _mapper.Map<User>(newUser);
            user.Password = GetHashValueInString(newUser.Password);
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();


            //VISSAKULDI(AZ INFORMACIOT A FRONTNAK A UJON KESZULT HASZNALOROL) A DTUUSERREGISTRATION AHOL AZ ID 0, DE BAZISBAN NEM AZ VAN
            //ki kell hogy huzzam a bazisbol ez az uj hasznalot az id miatt
            return _mapper.Map<UserDtoRegistration>(user); 
        }

        public string LoginUser(UserDtoLogin userDto)
        {
            if(!_dbContext.Users.Any(u => u.Email == userDto.Email))
                throw new Exception("There is no user with that email!");
            
            IQueryable<User> query = _dbContext.Users;
            query = query.Where(e => e.Email.Contains(userDto.Email));
            User user = query.ToList<User>()[0];

            //if (BCrypt.Net.BCrypt.Verify(userDto.Password, user.Password, false, BCrypt.Net.HashType.SHA256 ))//Uporedjujemo hes pasvorda iz baze i unetog pasvorda
            if(GetHashValueInString(userDto.Password) == user.Password)
            {
                List<Claim> claims = new List<Claim>();
                //Mozemo dodati Claimove u token, oni ce biti vidljivi u tokenu i mozemo ih koristiti za autorizaciju
                if (user.UserType == "Admin")
                    claims.Add(new Claim(ClaimTypes.Role, "admin")); //Add user type to claim
                if (user.UserType == "Buyer")
                    claims.Add(new Claim(ClaimTypes.Role, "buyer")); //Add user type to claim
                if (user.UserType == "Seller")
                    claims.Add(new Claim(ClaimTypes.Role, "seller")); //Add user type to claim
                //mozemo izmisliti i mi neki nas claim
                //claims.Add(new Claim("Neki_moj_claim", "imam_ga"));

                //Kreiramo kredencijale za potpisivanje tokena. Token mora biti potpisan privatnim kljucem
                //kako bi se sprecile njegove neovlascene izmene
                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                var tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:44368", //url servera koji je izdao token
                    claims: claims, //claimovi
                    expires: DateTime.Now.AddMinutes(30), //vazenje tokena u minutama
                    signingCredentials: signinCredentials //kredencijali za potpis
                );
                string tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                return tokenString;
            }
            else {
                throw new Exception("There is no user with that password!");
            }

        }

        public void DeleteUserById(int id)
        {
            //KELL MEG DOBALNI AZ EXCEPTIONOKAT
            User user = _dbContext.Users.Find(id); //Ucitavamo objekat u db context (ako postoji naravno)

            _dbContext.Users.Remove(user);

            _dbContext.SaveChanges(); 
        }

        public UserDtoRegistration GetUserById(int id)
        {
            //KELL MEG DOBALNI AZ EXCEPTIONOKAT
            return _mapper.Map<UserDtoRegistration>(_dbContext.Users.Find(id));
        }

        public List<UserDtoRegistration> GetUsers()
        {
            return _mapper.Map<List<UserDtoRegistration>>(_dbContext.Users.ToList());
        }

        private string GetHashValueInString(string inputPassword) {
            string hashString;
            byte[] bytes = Encoding.UTF8.GetBytes(inputPassword);

            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] hashBytes = sha256Hash.ComputeHash(bytes);
                hashString = BitConverter.ToString(hashBytes).Replace("-", String.Empty);
            }

            return hashString;
        }
    }
}
