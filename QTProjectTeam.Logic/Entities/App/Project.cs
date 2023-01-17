using System;
namespace QTProjectTeam.Logic.Entities.App
{
	[Table("Projects")]
	[Index(nameof(Designation), IsUnique = true)]
	public class Project : VersionEntity
	{
		[MaxLength(128)]
		public string Designation { get; set; } = string.Empty;
		[MaxLength(1024)]
		public string? Description { get; set; }

		#region Navigation properties
		public List<Member> Members { get; set; } = new();
        #endregion Navigation properties
    }
}

