using System;

namespace Backend.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public string SatisfactionLevel { get; set; }
        public string Category { get; set; }
        public string Comments { get; set; }
        public bool WantUpdates { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 