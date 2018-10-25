using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using joke.Models;
using System.Net.Http;

namespace joke.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokeController : ControllerBase
    {
        private const string API_URL = "http://api.icndb.com/jokes/random";

        // POST api/joke
        [HttpPost]
        public async Task<ActionResult<IntentResult>> Post([FromBody] NluResult nluResult)
        {
            JokeResult jokeResult = null;
            string responseText = "";

            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(API_URL);

            if (response.IsSuccessStatusCode) 
            {
                jokeResult = await response.Content.ReadAsAsync<JokeResult>();
                Console.WriteLine(jokeResult.ToString());
            }
            
            if (jokeResult != null) 
            {
                responseText = jokeResult.value.joke;
            }
            else 
            {
                responseText = "Sorry. Due to some error I was unable to think of a joke";
            }

            return new IntentResult() 
            {
                responseText = responseText
            };
        }
    }
}
