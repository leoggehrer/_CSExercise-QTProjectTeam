using System;
namespace QTProjectTeam.Logic.Entities.App
{
	[Table("Members")]
	public class Member : VersionEntity
	{
		[MaxLength(64)]
		public string Name { get; set; } = string.Empty;
		[MaxLength(512)]
		public string Responsibilities { get; set; } = string.Empty;

		#region Navigation properties
		public List<Project> Projects { get; set; } = new();
        #endregion Navigation properties
    }
}

