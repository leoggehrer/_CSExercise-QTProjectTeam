namespace QTProjectTeam.ConApp
{
    partial class Program
    {
        static partial void AfterRun()
        {
            Task.Run(async () =>
            {
                using var projCtrl = new Logic.Controllers.App.ProjectsController();
                List<Logic.Models.App.Project> projects = new();

                for (int i = 0; i < 5; i++)
                {
                    var project = new Logic.Models.App.Project
                    {
                        Designation = $"Bezeichnung{i + 1}",
                        Description = $"Beschreibung{i + 1}",
                    };
                    for (int j = 0; j < 10; j++)
                    {
                        project.Members.Add(new Logic.Models.App.Member
                        {
                            Name = $"Name{i + 1}-{j + 1}",
                            Responsibilities = $"Programmierer",
                        });
                    }
                    projects.Add(project);
                }
                await projCtrl.InsertAsync(projects);
                await projCtrl.SaveChangesAsync();
            }).Wait();
            // Query Project and Members
            using var projCtrl = new Logic.Controllers.App.ProjectsController();
            var members = Task.Run(async () => await projCtrl.GetAllAsync()).Result;

            foreach (var project in members)
            {
                Console.WriteLine($"{project.Designation}");
                Console.WriteLine("Members:");
                foreach (var member in project.Members)
                {
                    Console.WriteLine($"  {member.Name}");
                }
            }
            // Query Member and Projects
            using var memberCtrl = new Logic.Controllers.App.MembersController();
            var members1 = Task.Run(async () => await memberCtrl.GetAllAsync()).Result;

            foreach (var member in members1)
            {
                Console.WriteLine($"{member.Name}");
                Console.WriteLine("Projects:");
                foreach (var project in member.Projects)
                {
                    Console.WriteLine($"  {project.Designation}");
                }
            }
            Console.ReadLine();
        }
    }
}
