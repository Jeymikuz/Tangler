﻿using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly DataContext _context;
        private IAuthorizationService _authorization;

        public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, TokenService tokenService, DataContext context, IAuthorizationService authorizationService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
            _authorization = authorizationService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username);
            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            var claims = await _userManager.GetClaimsAsync(user);
            if (result.Succeeded) return CreateUserObject(user);
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if(await _userManager.Users.AnyAsync(x=>x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem(ModelState);
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Email))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem(ModelState);
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var company = new Company
            {
                Name = registerDto.Name,
                NIP = registerDto.NIP
            };
            
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded) return BadRequest("Problem registering user");
            var claim = new Claim("IsMain","true");
            await _userManager.AddClaimAsync(user,claim);

            company.Users.Add(user);
            await _context.Companies.AddAsync(company);
            var companyResult = await _context.SaveChangesAsync() > 0;
            if (!companyResult) return BadRequest("Problem creating company");

            return CreateUserObject(user);
        }

        [Authorize(Policy ="IsMainAccountPolicy")]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }
    }
}
