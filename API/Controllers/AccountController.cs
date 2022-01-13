using API.DTOs;
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
using Application.Interfaces;

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
        private readonly IUserAccessor _userAccessor;

        public AccountController(SignInManager<AppUser> signInManager, UserManager<AppUser> userManager, TokenService tokenService, DataContext context, IAuthorizationService authorizationService, IUserAccessor userAccessor)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = tokenService;
            _context = context;
            _authorization = authorizationService;
            _userAccessor = userAccessor;
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

        [AllowAnonymous]
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

        [HttpGet("getCompanyUsers")]
        public async Task<IActionResult> GetCompanyUser()
        {
            var company = await _context.Companies.Include(x=>x.Users).FirstOrDefaultAsync(x => x.Users.Any(y=>y.UserName == _userAccessor.GetUsername()));
            if (company is null) return BadRequest("Company not found");

            var users = company.Users;

            var usersDto = new List<UserSettingsDto>();

            foreach (var user in users)
            {
                usersDto.Add(new UserSettingsDto()
                {
                    UserName = user.UserName,
                    DisplayName = user.DisplayName,
                    Id = user.Id
                });
            }

            return Ok(usersDto);
        }

        [HttpPost("addWorker")]
        public async Task<IActionResult> AddNewUser(NewCompanyUserDto dto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == dto.userName))
            {
                ModelState.AddModelError("username", "Username taken");
                return ValidationProblem(ModelState);
            }

            var user = new AppUser()
            {
                UserName = dto.userName,
                Email = dto.userName + "@tangler.com",
                DisplayName = dto.displayName
            };

            var company = await _context.Companies.FirstOrDefaultAsync(x => x.Users.Any(y=>y.UserName == _userAccessor.GetUsername()));

            if (company is null) return BadRequest("Company not found");
            
            var result = await _userManager.CreateAsync(user, dto.password);
            if (!result.Succeeded) return BadRequest("Problem registering user");

            var claim = new Claim("IsMain", "false");
            await _userManager.AddClaimAsync(user, claim);

            company.Users.Add(user);
            var companyResult = await _context.SaveChangesAsync() > 0;
            if (!companyResult) return BadRequest("Problem creating company");

            return Ok(CreateUserObject(user));
        }

        [Authorize(Policy = "IsMainAccountPolicy")]
        [HttpDelete("deleteWorker/{userName}")]
        public async Task<IActionResult> AddNewUser(string userName)
        {
            var company = await _context.Companies.Include(x=>x.Users).FirstOrDefaultAsync(x => x.Users.Any(y=>y.UserName == _userAccessor.GetUsername()));

            if (company is null) return BadRequest("Company not found");

            var userToDelete = await _userManager.FindByNameAsync(userName);

            var gotClaim = await _userManager.GetClaimsAsync(userToDelete);

            var claim = gotClaim.FirstOrDefault(x => x.Type == "IsMain");

            if (claim is not null)
            {
                if (claim.Value == "true") return BadRequest("User cannot be deleted");
            }

            var result = await _userManager.DeleteAsync(userToDelete);
            if (!result.Succeeded) return BadRequest("Problem deleting user");

            return Ok();
        }


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
