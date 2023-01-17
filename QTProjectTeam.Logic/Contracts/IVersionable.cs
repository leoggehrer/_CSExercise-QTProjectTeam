//@CodeCopy
//MdStart
namespace QTProjectTeam.Logic.Contracts
{
    public partial interface IVersionable : IIdentifyable
    {
#if ROWVERSION_ON
        byte[]? RowVersion { get; }
#endif
    }
}
//MdEnd
