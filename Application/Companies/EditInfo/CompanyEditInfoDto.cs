using Domain;

namespace Application.Companies.EditInfo
{
    public record CompanyEditInfoDto(string name, Address address, string nip);
}