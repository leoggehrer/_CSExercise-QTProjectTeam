//@CodeCopy
//MdStart
#if ACCOUNT_ON && ACCESSRULES_ON
namespace QTProjectTeam.Logic.Contracts.Access
{
    using QTProjectTeam.Logic.Contracts.Account;
    public partial interface IAccessRulesAccess<T>
    {
        Task<bool> CanBeCreatedAsync(Type type, IIdentity identity);
        Task<bool> CanBeReadAsync(IIdentifyable item, IIdentity identity);
        Task<bool> CanBeChangedAsync(IIdentifyable item, IIdentity identity);
        Task<bool> CanBeDeletedAsync(IIdentifyable item, IIdentity identity);
    }
}
#endif
//MdEnd
