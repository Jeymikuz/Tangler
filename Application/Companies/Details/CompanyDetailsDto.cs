using Domain;

namespace Application.Companies.Detailes
{
    public record CompanyDetailsDto(string name, Address address, string nip);
}