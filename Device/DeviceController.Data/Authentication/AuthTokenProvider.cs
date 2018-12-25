using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace DeviceController.Data.Authentication
{
    public static class AuthTokenProvider
    {
        public static string GetAuthToken(string authServerUri, AuthClientSecret secret)
        {
            string authPayload = JsonConvert.SerializeObject(secret);


            //string.Format("{\"client_id\":\"{0}\",\"client_secret\":\"{1}\",\"audience\":\"{2}\",\"grant_type\":\"client_credentials\"}", authClientId, authClientSecret, restApiUri);


            var client = new RestClient(authServerUri);
            var request = new RestRequest(Method.POST);
            request.AddHeader("content-type", "application/json");
            request.AddParameter("application/json", authPayload, ParameterType.RequestBody);

            IRestResponse response = client.Execute(request);
            JObject payload = JObject.Parse(response.Content);

            JToken token = payload.SelectToken("access_token");
            return (string)token;
        }
    }
}
