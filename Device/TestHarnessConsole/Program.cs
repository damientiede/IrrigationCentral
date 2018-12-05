using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using DeviceController.Data;
using Newtonsoft.Json;

namespace TestHarnessConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("TestHarnessConsole started...");
            
            string uri = "http://192.168.1.51:8000/api/devices/foo";

            CallWebClient(uri);
            //CallHttpClient(uri);            
        }
        public static async void CallHttpClient(string uri)
        {
            Device d = null;
            HttpClient client = new HttpClient();
            HttpResponseMessage response = await client.GetAsync(uri);
            if (response.IsSuccessStatusCode)
            {
                d = await response.Content.ReadAsAsync<Device>();
            }
            Console.WriteLine(d.ToString());
        }
        public static void CallWebClient(string uri)
        {
            WebClient client = new WebClient();            
            string response = client.DownloadString(uri);
            Console.WriteLine(response);
            Device d = JsonConvert.DeserializeObject<Device>(response);
            Console.WriteLine("response: "+response);
            Console.WriteLine(d.ToString());
        }
    }
}
