using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Superhui.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowSepecificOrigins")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value3" };
        }

        // GET api/values/5
        [HttpGet("{id}/{*catchall}")]
        public string Get(int id, string catchall)
        {
            return $"id: {id}; param1: {catchall??"<no param1>"}";
        }

        // POST api/values
        [HttpPost]
        public IEnumerable<string> Post([FromBody]string value)
        {
            return new string[] { "value3", "value2" };
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
