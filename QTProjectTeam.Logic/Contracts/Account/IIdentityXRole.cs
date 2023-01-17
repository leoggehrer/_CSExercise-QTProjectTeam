//@CodeCopy
//MdStart
#if ACCOUNT_ON
namespace QTProjectTeam.Logic.Contracts.Account
{
    using QTProjectTeam.Logic.Entities.Account;
    public partial interface IIdentityXRole
    {
        IdType IdentityId { get; set; }
        IdType RoleId { get; set; }
        Role? Role { get; set; }
    }
}
#endif
//MdEnd
