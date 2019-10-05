namespace joke.Models
{
    public class NluResult
    {
        public string input { get; set; }
        public Intent intent { get; set; }
        public Slot[] slots { get; set; }
    }
}
