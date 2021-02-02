using System;

namespace ExampleApp.Users.Models
{
    public class PingResponse
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string UserName { get; set; }
    }
}
